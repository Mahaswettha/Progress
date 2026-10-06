import React, { useState, useMemo } from 'react';
import { 
  Problem, 
  PersonalDataStore, 
  ProblemStatus 
} from '../types/tracker';
import { ProblemRow } from './ProblemRow';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';

interface StepAccordionProps {
  step: string;
  stepTitle: string;
  problems: Problem[];
  personalData: PersonalDataStore;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdateStatus: (problemId: string, status: ProblemStatus) => void;
  onUpdateTimeComplexity: (problemId: string, tc: string) => void;
  onUpdateSpaceComplexity: (problemId: string, sc: string) => void;
  onOpenNotes: (problem: Problem) => void;
  darkMode: boolean;
}

export const StepAccordion: React.FC<StepAccordionProps> = ({
  step,
  stepTitle,
  problems,
  personalData,
  isExpanded,
  onToggleExpand,
  onUpdateStatus,
  onUpdateTimeComplexity,
  onUpdateSpaceComplexity,
  onOpenNotes,
  darkMode,
}) => {
  // Group problems by subtopic
  const subtopicGroups = useMemo(() => {
    const groups: { subtopicId: string; subtopicTitle: string; items: Problem[] }[] = [];
    const map = new Map<string, { subtopicId: string; subtopicTitle: string; items: Problem[] }>();

    problems.forEach((p) => {
      const key = p.subtopicId || 'other';
      if (!map.has(key)) {
        const entry = {
          subtopicId: p.subtopicId,
          subtopicTitle: p.subtopic,
          items: []
        };
        map.set(key, entry);
        groups.push(entry);
      }
      map.get(key)!.items.push(p);
    });

    return groups;
  }, [problems]);

  // Track expanded subtopics (collapsed by default so only subheadings appear on step open)
  const [expandedSubtopics, setExpandedSubtopics] = useState<Record<string, boolean>>({});

  const toggleSubtopic = (subtopicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSubtopics(prev => ({
      ...prev,
      [subtopicId]: !prev[subtopicId]
    }));
  };

  // Calculate step progress
  const totalStepProblems = problems.length;
  const solvedStepProblems = problems.filter(p => personalData[p.id]?.status === 'Solved').length;
  const stepPercent = totalStepProblems > 0 ? Math.round((solvedStepProblems / totalStepProblems) * 100) : 0;
  const isAllSolved = totalStepProblems > 0 && solvedStepProblems === totalStepProblems;

  return (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden shadow-sm ${
      darkMode 
        ? 'bg-[#161b22] border-[#30363d]' 
        : 'bg-white border-slate-200'
    }`}>
      {/* Step Header Accordion Button */}
      <button
        type="button"
        onClick={onToggleExpand}
        className={`w-full px-4 sm:px-6 py-4 flex items-center justify-between gap-4 text-left transition-colors select-none ${
          isExpanded
            ? darkMode
              ? 'bg-[#1f242c] border-b border-[#30363d]'
              : 'bg-slate-50 border-b border-slate-200'
            : darkMode
              ? 'hover:bg-[#1c2128]'
              : 'hover:bg-slate-50'
        }`}
      >
        {/* Left: Chevron + Step Number & Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`p-1.5 rounded-lg transition-transform ${
            isExpanded ? 'rotate-0' : '-rotate-90'
          } ${
            darkMode ? 'bg-[#2d333b] text-brand-400' : 'bg-slate-200 text-brand-600'
          }`}>
            <ChevronDown className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono tracking-wider uppercase text-brand-500">
                {step}
              </span>
              {isAllSolved && (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              )}
            </div>
            <h3 className={`text-sm sm:text-base font-bold truncate mt-0.5 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {stepTitle}
            </h3>
          </div>
        </div>

        {/* Right: Progress Meter & Solved count */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-300 dark:text-slate-300">
              {solvedStepProblems} / {totalStepProblems}
            </span>
            <span className="text-[11px] text-slate-400 ml-1.5 font-medium">
              ({stepPercent}%)
            </span>
          </div>

          <div className="w-24 sm:w-32 bg-slate-700/30 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden border border-slate-700/40">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                stepPercent === 100 
                  ? 'bg-emerald-500' 
                  : 'bg-gradient-to-r from-brand-500 to-amber-500'
              }`}
              style={{ width: `${stepPercent}%` }}
            />
          </div>
        </div>
      </button>

      {/* Accordion Content: Subtopics List */}
      {isExpanded && (
        <div className="divide-y divide-slate-800/40 dark:divide-slate-800/60">
          {subtopicGroups.map((group) => {
            const isSubOpen = expandedSubtopics[group.subtopicId] === true;
            const totalSub = group.items.length;
            const solvedSub = group.items.filter(p => personalData[p.id]?.status === 'Solved').length;
            const subPercent = totalSub > 0 ? Math.round((solvedSub / totalSub) * 100) : 0;

            return (
              <div key={group.subtopicId} className="transition-colors">
                {/* Subtopic Header */}
                <button
                  type="button"
                  onClick={(e) => toggleSubtopic(group.subtopicId, e)}
                  className={`w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-3 text-left transition-colors select-none ${
                    isSubOpen
                      ? darkMode 
                        ? 'bg-[#202630] border-b border-[#2d333b] text-white' 
                        : 'bg-slate-200/80 border-b border-slate-300 text-slate-900'
                      : darkMode 
                        ? 'bg-[#1a1f26] hover:bg-[#202630] text-slate-200' 
                        : 'bg-slate-100/70 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isSubOpen ? (
                      <ChevronDown className="w-4 h-4 text-brand-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm font-semibold truncate">
                      {group.subtopicTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
                    <span className={solvedSub === totalSub && totalSub > 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {solvedSub}/{totalSub}
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      ({subPercent}%)
                    </span>
                  </div>
                </button>

                {/* Problems Table: Only shown when subheading is clicked */}
                {isSubOpen && (
                  <div>
                    {/* Desktop Table Header (12 cols) */}
                    <div className={`hidden lg:grid grid-cols-12 gap-3 px-4 py-2 text-[11px] font-bold uppercase tracking-wider border-b ${
                      darkMode 
                        ? 'bg-[#12161c] text-slate-400 border-[#21262d]' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-6">Problem Name</div>
                      <div className="col-span-2">Resource</div>
                      <div className="col-span-2">Practice</div>
                      <div className="col-span-1 text-right">Notes</div>
                    </div>

                    {/* Problem Rows */}
                    <div>
                      {group.items.map((problem) => (
                        <ProblemRow
                          key={problem.id}
                          problem={problem}
                          personalData={personalData[problem.id]}
                          onUpdateStatus={(status) => onUpdateStatus(problem.id, status)}
                          onUpdateTimeComplexity={(tc) => onUpdateTimeComplexity(problem.id, tc)}
                          onUpdateSpaceComplexity={(sc) => onUpdateSpaceComplexity(problem.id, sc)}
                          onOpenNotes={() => onOpenNotes(problem)}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
