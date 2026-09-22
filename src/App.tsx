import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Problem, 
  PersonalDataStore, 
  ProblemStatus, 
  RevisionStatus, 
  CodeLanguage 
} from './types/tracker';
import masterProblemsData from './data/striverA2ZProblems.json';
import { 
  loadPersonalData, 
  updateProblemPersonalData 
} from './utils/storage';
import { 
  isAuthenticatedSession, 
  destroySession 
} from './utils/auth';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SingleProblemView } from './components/SingleProblemView';
import { NotesModal } from './components/NotesModal';
import { CodeModal } from './components/CodeModal';
import { BackupModal } from './components/BackupModal';
import { BookOpen } from 'lucide-react';

const masterProblems: Problem[] = masterProblemsData as Problem[];

export const App: React.FC = () => {
  // Authentication state (persisted across refreshes during current session)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAuthenticatedSession());

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('striver_tracker_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('striver_tracker_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('striver_tracker_theme', 'light');
    }
  }, [darkMode]);

  // Personal data store (persisted in localStorage)
  const [personalData, setPersonalData] = useState<PersonalDataStore>(() => loadPersonalData());

  // Currently selected problem ID (remembered in localStorage)
  const [selectedProblemId, setSelectedProblemId] = useState<string>(() => {
    const saved = localStorage.getItem('striver_last_selected_problem');
    if (saved && masterProblems.some(p => p.id === saved)) {
      return saved;
    }
    return masterProblems[0]?.id || 'p-001';
  });

  // Track active Step & Subtopic for sidebar highlight
  const selectedProblem = useMemo(() => {
    return masterProblems.find(p => p.id === selectedProblemId) || masterProblems[0];
  }, [selectedProblemId]);

  const [selectedStep, setSelectedStep] = useState<string>(selectedProblem.step);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>(selectedProblem.subtopicId);

  // Sync selectedStep & selectedSubtopic when selectedProblem changes
  useEffect(() => {
    if (selectedProblem) {
      setSelectedStep(selectedProblem.step);
      setSelectedSubtopic(selectedProblem.subtopicId);
      localStorage.setItem('striver_last_selected_problem', selectedProblem.id);
    }
  }, [selectedProblem]);

  // Search Query state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Modals state
  const [activeNotesProblem, setActiveNotesProblem] = useState<Problem | null>(null);
  const [activeCodeProblem, setActiveCodeProblem] = useState<Problem | null>(null);
  const [isBackupOpen, setIsBackupOpen] = useState<boolean>(false);

  // Logout handler
  const handleLogout = useCallback(() => {
    destroySession();
    setIsAuthenticated(false);
  }, []);

  // Personal data updates - immediately saves to localStorage and updates state
  const handleUpdateStatus = useCallback((problemId: string, status: ProblemStatus) => {
    const updated = updateProblemPersonalData(problemId, { status });
    setPersonalData(updated);
  }, []);

  const handleUpdateRevision = useCallback((problemId: string, revision: RevisionStatus) => {
    const updated = updateProblemPersonalData(problemId, { revision });
    setPersonalData(updated);
  }, []);

  const handleUpdateTimeComplexity = useCallback((problemId: string, timeComplexity: string) => {
    const updated = updateProblemPersonalData(problemId, { timeComplexity });
    setPersonalData(updated);
  }, []);

  const handleUpdateSpaceComplexity = useCallback((problemId: string, spaceComplexity: string) => {
    const updated = updateProblemPersonalData(problemId, { spaceComplexity });
    setPersonalData(updated);
  }, []);

  const handleSaveNotes = useCallback((problemId: string, notes: string) => {
    const updated = updateProblemPersonalData(problemId, { notes });
    setPersonalData(updated);
  }, []);

  const handleSaveCode = useCallback((problemId: string, code: string, language: CodeLanguage) => {
    const updated = updateProblemPersonalData(problemId, { code, language });
    setPersonalData(updated);
  }, []);

  const handleImportSuccess = (newData: PersonalDataStore) => {
    setPersonalData(newData);
  };

  const handleSelectProblem = useCallback((problem: Problem) => {
    setSelectedProblemId(problem.id);
    setSelectedStep(problem.step);
    setSelectedSubtopic(problem.subtopicId);
  }, []);

  const handleSelectSubtopic = useCallback((step: string, subtopicId: string) => {
    setSelectedStep(step);
    setSelectedSubtopic(subtopicId);
  }, []);

  // Previous & Next Problem Navigation
  const currentIndex = useMemo(() => {
    return masterProblems.findIndex(p => p.id === selectedProblemId);
  }, [selectedProblemId]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < masterProblems.length - 1;

  const handlePrevProblem = useCallback(() => {
    if (hasPrev) {
      handleSelectProblem(masterProblems[currentIndex - 1]);
    }
  }, [currentIndex, hasPrev, handleSelectProblem]);

  const handleNextProblem = useCallback(() => {
    if (hasNext) {
      handleSelectProblem(masterProblems[currentIndex + 1]);
    }
  }, [currentIndex, hasNext, handleSelectProblem]);

  // Keyboard navigation: Alt+Left / Alt+Right to step through problems
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevProblem();
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextProblem();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevProblem, handleNextProblem]);

  // Guard: If not authenticated, render Login Page only
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-[#e6edf3] flex flex-col font-sans antialiased">
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenBackup={() => setIsBackupOpen(true)}
        onLogout={handleLogout}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        {/* Left: 3-Level Expandable DSA Problem Tree */}
        <Sidebar
          problems={masterProblems}
          personalData={personalData}
          selectedProblemId={selectedProblemId}
          selectedStep={selectedStep}
          selectedSubtopic={selectedSubtopic}
          onSelectProblem={handleSelectProblem}
          onSelectSubtopic={handleSelectSubtopic}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          searchQuery={searchQuery}
        />

        {/* Right: Dedicated Single Problem View */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start overflow-y-auto">
          {selectedProblem ? (
            <SingleProblemView
              problem={selectedProblem}
              personalData={personalData[selectedProblem.id]}
              onUpdateStatus={(status) => handleUpdateStatus(selectedProblem.id, status)}
              onUpdateRevision={(revision) => handleUpdateRevision(selectedProblem.id, revision)}
              onUpdateTimeComplexity={(tc) => handleUpdateTimeComplexity(selectedProblem.id, tc)}
              onUpdateSpaceComplexity={(sc) => handleUpdateSpaceComplexity(selectedProblem.id, sc)}
              onOpenNotes={() => setActiveNotesProblem(selectedProblem)}
              onOpenCode={() => setActiveCodeProblem(selectedProblem)}
              onPrevProblem={handlePrevProblem}
              onNextProblem={handleNextProblem}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
          ) : (
            <div className="p-12 text-center rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 max-w-md my-auto">
              <BookOpen className="w-12 h-12 mx-auto text-brand-400 opacity-60" />
              <h3 className="text-base font-semibold text-[#e6edf3]">Select a problem from the tree</h3>
              <p className="text-xs text-dark-muted">
                Navigate the DSA problem tree on the left to start solving.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Notes Modal */}
      <NotesModal
        isOpen={Boolean(activeNotesProblem)}
        problem={activeNotesProblem}
        initialNotes={activeNotesProblem ? personalData[activeNotesProblem.id]?.notes || '' : ''}
        onSave={handleSaveNotes}
        onClose={() => setActiveNotesProblem(null)}
      />

      {/* Code Modal */}
      <CodeModal
        isOpen={Boolean(activeCodeProblem)}
        problem={activeCodeProblem}
        initialCode={activeCodeProblem ? personalData[activeCodeProblem.id]?.code || '' : ''}
        initialLanguage={activeCodeProblem ? personalData[activeCodeProblem.id]?.language || 'java' : 'java'}
        onSave={handleSaveCode}
        onClose={() => setActiveCodeProblem(null)}
        darkMode={darkMode}
      />

      {/* Backup Modal */}
      <BackupModal
        isOpen={isBackupOpen}
        personalData={personalData}
        onImportSuccess={handleImportSuccess}
        onClose={() => setIsBackupOpen(false)}
      />
    </div>
  );
};

export default App;
