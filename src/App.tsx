import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Problem, 
  PersonalDataStore, 
  ProblemStatus, 
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
import { StepAccordion } from './components/StepAccordion';
import { NotesModal } from './components/NotesModal';
import { BackupModal } from './components/BackupModal';

const masterProblems: Problem[] = masterProblemsData as Problem[];

export const App: React.FC = () => {
  // Authentication state
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

  // Track expanded steps (by default Step 1 is open)
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>(() => {
    return { 'Step 1': true };
  });

  // Modals state
  const [activeNotesProblem, setActiveNotesProblem] = useState<Problem | null>(null);
  const [isBackupOpen, setIsBackupOpen] = useState<boolean>(false);

  // Logout handler
  const handleLogout = useCallback(() => {
    destroySession();
    setIsAuthenticated(false);
  }, []);

  // Personal data update handlers
  const handleUpdateStatus = useCallback((problemId: string, status: ProblemStatus) => {
    const updated = updateProblemPersonalData(problemId, { status });
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

  const handleImportSuccess = (newData: PersonalDataStore) => {
    setPersonalData(newData);
  };

  // Group master problems by Step
  const stepGroups = useMemo(() => {
    const map = new Map<string, { step: string; stepTitle: string; problems: Problem[] }>();
    const order: string[] = [];

    masterProblems.forEach((p) => {
      if (!map.has(p.step)) {
        map.set(p.step, {
          step: p.step,
          stepTitle: p.stepTitle,
          problems: []
        });
        order.push(p.step);
      }
      map.get(p.step)!.problems.push(p);
    });

    return order.map(stepKey => map.get(stepKey)!);
  }, []);

  // Overall Statistics computation
  const totalProblemsCount = masterProblems.length;
  const solvedCount = useMemo(() => {
    return Object.values(personalData).filter(p => p.status === 'Solved').length;
  }, [personalData]);

  const toggleStepExpand = (stepName: string) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepName]: !prev[stepName]
    }));
  };

  // If not authenticated, render Login Page
  if (!isAuthenticated) {
    return <LoginPage darkMode={darkMode} onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors ${
      darkMode ? 'bg-[#0b0f17] text-[#e6edf3]' : 'bg-[#f6f8fa] text-[#1f2328]'
    }`}>
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenBackup={() => setIsBackupOpen(true)}
        onLogout={handleLogout}
        totalProblems={totalProblemsCount}
        solvedProblems={solvedCount}
      />

      {/* Main Page: Clean Step Accordion List */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {stepGroups.map((group) => (
            <StepAccordion
              key={group.step}
              step={group.step}
              stepTitle={group.stepTitle}
              problems={group.problems}
              personalData={personalData}
              isExpanded={expandedSteps[group.step] ?? false}
              onToggleExpand={() => toggleStepExpand(group.step)}
              onUpdateStatus={handleUpdateStatus}
              onUpdateTimeComplexity={handleUpdateTimeComplexity}
              onUpdateSpaceComplexity={handleUpdateSpaceComplexity}
              onOpenNotes={(prob) => setActiveNotesProblem(prob)}
              darkMode={darkMode}
            />
          ))}
        </div>
      </main>

      {/* Notes Modal */}
      <NotesModal
        isOpen={Boolean(activeNotesProblem)}
        problem={activeNotesProblem}
        initialNotes={activeNotesProblem ? personalData[activeNotesProblem.id]?.notes || '' : ''}
        onSave={handleSaveNotes}
        onClose={() => setActiveNotesProblem(null)}
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
