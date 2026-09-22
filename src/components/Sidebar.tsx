import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  X
} from 'lucide-react';
import { Problem, PersonalDataStore } from '../types/tracker';

interface SubtopicGroup {
  subtopicId: string;
  subtopicTitle: string;
  problems: Problem[];
}

interface StepGroup {
  step: string;
  stepTitle: string;
  subtopics: SubtopicGroup[];
}

interface SidebarProps {
  problems: Problem[];
  personalData: PersonalDataStore;
  selectedProblemId: string;
  selectedStep: string;
  selectedSubtopic: string;
  onSelectProblem: (problem: Problem) => void;
  onSelectSubtopic: (step: string, subtopicId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  problems,
  personalData,
  selectedProblemId,
  selectedStep,
  selectedSubtopic,
  onSelectProblem,
  onSelectSubtopic,
  isOpen,
  onClose,
  searchQuery = '',
}) => {
  // Build structured hierarchy: Step -> Subtopics -> Problems
  const stepGroups: StepGroup[] = useMemo(() => {
    const map = new Map<string, {
      step: string;
      stepTitle: string;
      subtopics: Map<string, SubtopicGroup>;
    }>();

    for (const p of problems) {
      if (!map.has(p.step)) {
        map.set(p.step, {
          step: p.step,
          stepTitle: p.stepTitle,
          subtopics: new Map()
        });
      }
      const stepEntry = map.get(p.step)!;
      if (!stepEntry.subtopics.has(p.subtopicId)) {
        stepEntry.subtopics.set(p.subtopicId, {
          subtopicId: p.subtopicId,
          subtopicTitle: p.subtopic,
          problems: []
        });
      }
      stepEntry.subtopics.get(p.subtopicId)!.problems.push(p);
    }

    return Array.from(map.values()).map(s => ({
      step: s.step,
      stepTitle: s.stepTitle,
      subtopics: Array.from(s.subtopics.values())
    }));
  }, [problems]);

  // Expansion states
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    'Step 1': true,
    'Step 2': false,
    'Step 3': false
  });

  const [expandedSubtopics, setExpandedSubtopics] = useState<Record<string, boolean>>({
    'Step 1.1': true
  });

  // Automatically expand the step & subtopic containing the currently selected problem
  useEffect(() => {
    if (!selectedProblemId) return;
    const current = problems.find(p => p.id === selectedProblemId);
    if (current) {
      setExpandedSteps(prev => ({ ...prev, [current.step]: true }));
      setExpandedSubtopics(prev => ({ ...prev, [current.subtopicId]: true }));
    }
  }, [selectedProblemId, problems]);

  // If search query is entered, auto-expand all matching steps & subtopics
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();
    const newSteps: Record<string, boolean> = {};
    const newSubtopics: Record<string, boolean> = {};

    problems.forEach(p => {
      const match = 
        p.name.toLowerCase().includes(q) ||
        p.number.toString() === q.replace(/^#/, '') ||
        p.step.toLowerCase().includes(q) ||
        p.subtopic.toLowerCase().includes(q);

      if (match) {
        newSteps[p.step] = true;
        newSubtopics[p.subtopicId] = true;
      }
    });

    setExpandedSteps(prev => ({ ...prev, ...newSteps }));
    setExpandedSubtopics(prev => ({ ...prev, ...newSubtopics }));
  }, [searchQuery, problems]);

  const toggleStep = (step: string) => {
    setExpandedSteps(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const handleSubtopicClick = (step: string, subtopicId: string, subProblems: Problem[]) => {
    const isCurrentlyExpanded = Boolean(expandedSubtopics[subtopicId]);

    if (!isCurrentlyExpanded) {
      // Expand subtopic
      setExpandedSubtopics(prev => ({ ...prev, [subtopicId]: true }));
      // Automatically select first problem in subtopic
      if (subProblems.length > 0) {
        onSelectProblem(subProblems[0]);
      }
    } else {
      // Toggle collapse
      setExpandedSubtopics(prev => ({ ...prev, [subtopicId]: false }));
    }

    onSelectSubtopic(step, subtopicId);
  };

  const toggleSubtopicExpandOnly = (e: React.MouseEvent, subtopicId: string) => {
    e.stopPropagation();
    setExpandedSubtopics(prev => ({ ...prev, [subtopicId]: !prev[subtopicId] }));
  };

  const handleProblemClick = (problem: Problem) => {
    onSelectProblem(problem);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Navigation Drawer / Column */}
      <aside 
        className={`fixed lg:sticky top-0 lg:top-[53px] left-0 z-50 lg:z-30 w-80 h-screen lg:h-[calc(100vh-53px)] bg-[#161b22] border-r border-[#30363d] flex flex-col transition-transform duration-300 ease-in-out select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#e6edf3]">Progress Tracker</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-dark-muted bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d]">
              {problems.length} total
            </span>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded hover:bg-[#21262d] text-dark-muted hover:text-[#e6edf3]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tree List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-[#30363d]">
          {stepGroups.map((stepData: StepGroup) => {
            const isStepExpanded = !!expandedSteps[stepData.step];
            const isStepActive = selectedStep === stepData.step;
            
            // Total problems in this step
            const stepTotal = stepData.subtopics.reduce((acc, sub) => acc + sub.problems.length, 0);

            // Check if search matches any problem in this step
            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase().trim();
              const hasMatchingProblem = stepData.subtopics.some(sub => 
                sub.problems.some(p => 
                  p.name.toLowerCase().includes(q) || 
                  p.number.toString() === q.replace(/^#/, '') ||
                  sub.subtopicTitle.toLowerCase().includes(q) ||
                  stepData.stepTitle.toLowerCase().includes(q)
                )
              );
              if (!hasMatchingProblem) return null;
            }

            return (
              <div key={stepData.step} className="rounded-lg overflow-hidden border border-transparent">
                {/* 1. Step Header (e.g. Step 6: LinkedList 31) */}
                <div 
                  onClick={() => toggleStep(stepData.step)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                    isStepActive 
                      ? 'bg-brand-500/10 text-brand-300 font-semibold' 
                      : 'hover:bg-[#21262d] text-[#e6edf3]'
                  }`}
                >
                  <div className="flex items-center min-w-0 mr-2">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStep(stepData.step);
                      }}
                      className="p-0.5 rounded hover:bg-[#30363d] mr-1.5 text-dark-muted shrink-0"
                    >
                      {isStepExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div className="truncate">
                      <span className="font-bold text-brand-400 mr-1.5">{stepData.step}:</span>
                      <span className="truncate text-[12px]">{stepData.stepTitle}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-dark-muted shrink-0 font-mono font-medium bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d]/50">
                    {stepTotal}
                  </span>
                </div>

                {/* 2. Subtopics List */}
                {isStepExpanded && (
                  <div className="ml-3 pl-2 border-l border-[#30363d]/70 py-1 space-y-1">
                    {stepData.subtopics.map((sub: SubtopicGroup) => {
                      const isSubExpanded = !!expandedSubtopics[sub.subtopicId];
                      const isSubActive = selectedSubtopic === sub.subtopicId;
                      
                      // Filter problems by search if search is active
                      const visibleProblems = searchQuery.trim() 
                        ? sub.problems.filter(p => {
                            const q = searchQuery.toLowerCase().trim();
                            return p.name.toLowerCase().includes(q) || 
                                   p.number.toString() === q.replace(/^#/, '') ||
                                   sub.subtopicTitle.toLowerCase().includes(q);
                          })
                        : sub.problems;

                      if (searchQuery.trim() && visibleProblems.length === 0) return null;

                      return (
                        <div key={sub.subtopicId} className="space-y-0.5">
                          {/* Subtopic Item (e.g. ▼ Learn 1D LinkedList (5)) */}
                          <div
                            onClick={() => handleSubtopicClick(stepData.step, sub.subtopicId, sub.problems)}
                            className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs text-left cursor-pointer transition-colors ${
                              isSubActive && !selectedProblemId
                                ? 'bg-brand-500/20 text-brand-300 font-semibold' 
                                : 'hover:bg-[#21262d] text-[#c9d1d9] hover:text-white'
                            }`}
                          >
                            <div className="flex items-center min-w-0 mr-1.5">
                              <button
                                type="button"
                                onClick={(e) => toggleSubtopicExpandOnly(e, sub.subtopicId)}
                                className="p-0.5 rounded hover:bg-[#30363d] mr-1 text-dark-muted shrink-0"
                              >
                                {isSubExpanded ? (
                                  <ChevronDown className="w-3 h-3 text-brand-400" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-dark-muted" />
                                )}
                              </button>

                              <span className="truncate text-[11.5px] font-medium">
                                {sub.subtopicTitle}
                              </span>
                            </div>

                            {/* Problem Count in Parentheses: e.g. (5) */}
                            <span className="text-[10px] text-dark-muted shrink-0 font-mono">
                              ({sub.problems.length})
                            </span>
                          </div>

                          {/* 3. Individual Problems List */}
                          {isSubExpanded && (
                            <div className="ml-3 pl-2 border-l border-[#30363d]/50 py-0.5 space-y-0.5">
                              {visibleProblems.map((prob: Problem) => {
                                const isProbSelected = selectedProblemId === prob.id;
                                const pData = personalData[prob.id];
                                const status = pData?.status || 'Not Started';
                                const hasNotes = Boolean(pData?.notes && pData.notes.trim().length > 0);
                                const hasCode = Boolean(pData?.code && pData.code.trim().length > 0);

                                return (
                                  <button
                                    key={prob.id}
                                    onClick={() => handleProblemClick(prob)}
                                    title={`#${prob.number} ${prob.name}`}
                                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] text-left transition-all ${
                                      isProbSelected
                                        ? 'bg-brand-500/20 text-brand-300 font-semibold border-l-2 border-brand-500 pl-1.5'
                                        : 'hover:bg-[#21262d]/80 text-[#8b949e] hover:text-[#e6edf3]'
                                    }`}
                                  >
                                    <div className="flex items-center min-w-0 mr-1 truncate">
                                      <span className="font-mono text-[10.5px] font-semibold text-dark-muted shrink-0 mr-1.5">
                                        #{prob.number}
                                      </span>
                                      <span className="truncate leading-tight">
                                        {prob.name}
                                      </span>
                                    </div>

                                    {/* Indicators: Status Dot, Notes/Code */}
                                    <div className="flex items-center gap-1 shrink-0 ml-1">
                                      {hasNotes && (
                                        <span title="Has Notes" className="text-cyan-400 text-[10px]">
                                          📝
                                        </span>
                                      )}
                                      {hasCode && (
                                        <span title="Has Code" className="text-brand-400 text-[9px] font-mono font-bold">
                                          &lt;/&gt;
                                        </span>
                                      )}
                                      {status === 'Solved' && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Solved" />
                                      )}
                                      {status === 'Revision' && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Revision" />
                                      )}
                                      {status === 'Important' && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" title="Important" />
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
