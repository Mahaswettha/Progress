import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Star, 
  Trophy, 
  FileText, 
  Code2, 
  CheckCheck
} from 'lucide-react';
import { StepSummary } from '../types/tracker';

interface DashboardProps {
  totalProblems: number;
  solvedCount: number;
  notStartedCount: number;
  revisionCount: number;
  importantCount: number;
  masteredCount: number;
  notesCount: number;
  codeCount: number;
  stepSummaries: StepSummary[];
  selectedStep: string;
  onSelectStep: (step: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  totalProblems,
  solvedCount,
  notStartedCount,
  revisionCount,
  importantCount,
  masteredCount,
  notesCount,
  codeCount,
  stepSummaries,
  selectedStep,
  onSelectStep,
}) => {
  const solvedPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  const statCards = [
    {
      title: 'Total Problems',
      value: totalProblems,
      sub: 'Master Old A2Z Sheet',
      icon: CheckCheck,
      color: 'from-blue-500/10 to-indigo-500/10 text-blue-400 border-blue-500/20'
    },
    {
      title: 'Solved',
      value: solvedCount,
      sub: `${solvedPercentage}% Completed`,
      icon: CheckCircle2,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Not Started',
      value: notStartedCount,
      sub: `${totalProblems > 0 ? Math.round((notStartedCount / totalProblems) * 100) : 0}% Pending`,
      icon: Circle,
      color: 'from-slate-500/10 to-zinc-500/10 text-slate-400 border-slate-500/20'
    },
    {
      title: 'Needs Revision',
      value: revisionCount,
      sub: 'Marked for Review',
      icon: RotateCcw,
      color: 'from-amber-500/10 to-yellow-500/10 text-amber-400 border-amber-500/20'
    },
    {
      title: 'Important',
      value: importantCount,
      sub: 'Star Problems',
      icon: Star,
      color: 'from-rose-500/10 to-pink-500/10 text-rose-400 border-rose-500/20'
    },
    {
      title: 'Mastered',
      value: masteredCount,
      sub: 'Interview Ready',
      icon: Trophy,
      color: 'from-purple-500/10 to-violet-500/10 text-purple-400 border-purple-500/20'
    },
    {
      title: 'Problems with Notes',
      value: notesCount,
      sub: 'Personal Summaries',
      icon: FileText,
      color: 'from-cyan-500/10 to-sky-500/10 text-cyan-400 border-cyan-500/20'
    },
    {
      title: 'Problems with Code',
      value: codeCount,
      sub: 'Saved Solutions',
      icon: Code2,
      color: 'from-orange-500/10 to-brand-500/10 text-orange-400 border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6 mb-8 animate-modal-in">
      {/* Overview Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border bg-gradient-to-br ${card.color} backdrop-blur-sm flex flex-col justify-between transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-dark-muted line-clamp-1">{card.title}</span>
                <Icon className="w-4 h-4 opacity-80" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white dark:text-white">
                  {card.value}
                </span>
                <p className="text-[10px] text-dark-muted font-medium mt-0.5 truncate">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step by Step Breakdown */}
      <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-white">Step Progress Tracker</h2>
            <p className="text-xs text-dark-muted">Click any step to filter problems directly</p>
          </div>
          {selectedStep && (
            <button
              onClick={() => onSelectStep('')}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-dark-card hover:bg-dark-hover text-brand-400 border border-dark-border transition-colors"
            >
              Clear Step Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stepSummaries.map((step) => {
            const stepPercent = step.total > 0 ? Math.round((step.solved / step.total) * 100) : 0;
            const isSelected = selectedStep === step.step;

            return (
              <button
                key={step.step}
                onClick={() => onSelectStep(isSelected ? '' : step.step)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'bg-brand-500/10 border-brand-500 shadow-glow-brand ring-1 ring-brand-500' 
                    : 'bg-dark-card hover:bg-dark-hover border-dark-border'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-brand-400">{step.step}</span>
                  <span className="text-xs font-bold text-dark-text">
                    {step.solved} / {step.total} <span className="text-dark-muted font-normal">({stepPercent}%)</span>
                  </span>
                </div>
                <p className="text-xs font-medium text-dark-text line-clamp-1 mb-2">
                  {step.stepTitle}
                </p>
                {/* Progress bar */}
                <div className="w-full bg-dark-border rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      stepPercent === 100 
                        ? 'bg-emerald-500' 
                        : stepPercent > 0 
                          ? 'bg-gradient-to-r from-brand-500 to-amber-500' 
                          : 'bg-transparent'
                    }`}
                    style={{ width: `${stepPercent}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
