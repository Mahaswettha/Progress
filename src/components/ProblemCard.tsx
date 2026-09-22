import React from 'react';
import { 
  Problem, 
  PersonalProblemData, 
  ProblemStatus, 
  RevisionStatus 
} from '../types/tracker';

interface ProblemCardProps {
  problem: Problem;
  personalData?: PersonalProblemData;
  onUpdateStatus: (status: ProblemStatus) => void;
  onUpdateRevision: (revision: RevisionStatus) => void;
  onUpdateTimeComplexity: (tc: string) => void;
  onUpdateSpaceComplexity: (sc: string) => void;
  onOpenNotes: () => void;
  onOpenCode: () => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  personalData,
  onUpdateStatus,
  onUpdateRevision,
  onUpdateTimeComplexity,
  onUpdateSpaceComplexity,
  onOpenNotes,
  onOpenCode,
}) => {
  const currentStatus = personalData?.status || 'Not Started';
  const currentRevision = personalData?.revision || 'No Revision';
  const hasNotes = Boolean(personalData?.notes && personalData.notes.trim().length > 0);
  const hasCode = Boolean(personalData?.code && personalData.code.trim().length > 0);
  const codeLang = personalData?.language || 'java';

  // Subtle clean border/bg highlight based on status
  const cardBorder = 
    currentStatus === 'Solved' 
      ? 'border-emerald-500/50 bg-[#121915] dark:bg-[#121915]' 
      : currentStatus === 'Revision' 
        ? 'border-amber-500/40 bg-[#1c1810] dark:bg-[#1c1810]' 
        : currentStatus === 'Important' 
          ? 'border-rose-500/40 bg-[#1c1214] dark:bg-[#1c1214]' 
          : 'border-[#2d333b] bg-[#161b22] dark:bg-[#161b22]';

  const diffColor = {
    Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  }[problem.difficulty];

  return (
    <div className={`p-4 rounded-xl border ${cardBorder} flex flex-col justify-between gap-3 text-sm shadow-sm transition-colors`}>
      {/* 1. Header: #Number, Name, Difficulty */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-xs font-mono font-bold text-dark-muted shrink-0">
            #{problem.number}
          </span>
          <h3 className="font-semibold text-[#e6edf3] dark:text-[#e6edf3] leading-snug line-clamp-2">
            {problem.name}
          </h3>
        </div>

        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${diffColor}`}>
          {problem.difficulty}
        </span>
      </div>

      {/* 2. Links: Only display links if they actually exist */}
      <div className="flex flex-wrap items-center gap-1.5">
        {problem.tufUrl && (
          <a
            href={problem.tufUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors"
          >
            TUF
          </a>
        )}

        {problem.gfgUrl && (
          <a
            href={problem.gfgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors"
          >
            GFG
          </a>
        )}

        {problem.leetcodeUrl && (
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors"
          >
            LeetCode
          </a>
        )}

        {problem.youtubeUrl && (
          <a
            href={problem.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors"
          >
            Video
          </a>
        )}
      </div>

      {/* 3. Status & Revision dropdowns */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-dark-muted shrink-0">Status:</span>
          <select
            value={currentStatus}
            onChange={(e) => onUpdateStatus(e.target.value as ProblemStatus)}
            className="w-full text-xs font-medium rounded-md px-2 py-1 bg-[#21262d] border border-[#30363d] text-[#e6edf3] focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="Not Started">Not Started</option>
            <option value="Solved">Solved</option>
            <option value="Revision">Revision</option>
            <option value="Important">Important</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-dark-muted shrink-0">Revision:</span>
          <select
            value={currentRevision}
            onChange={(e) => onUpdateRevision(e.target.value as RevisionStatus)}
            className="w-full text-xs font-medium rounded-md px-2 py-1 bg-[#21262d] border border-[#30363d] text-[#e6edf3] focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="No Revision">No Revision</option>
            <option value="Revision 1">Revision 1</option>
            <option value="Revision 2">Revision 2</option>
            <option value="Revision 3">Revision 3</option>
            <option value="Mastered">Mastered</option>
          </select>
        </div>
      </div>

      {/* 4. Time & Space Complexity */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 bg-[#0d1117] px-2 py-1 rounded-md border border-[#21262d]">
          <span className="text-dark-muted shrink-0 font-medium">Time:</span>
          <input
            type="text"
            value={personalData?.timeComplexity || ''}
            onChange={(e) => onUpdateTimeComplexity(e.target.value)}
            placeholder="O(n)"
            className="w-full bg-transparent text-[#e6edf3] placeholder:text-dark-muted/50 focus:outline-none font-mono text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-[#0d1117] px-2 py-1 rounded-md border border-[#21262d]">
          <span className="text-dark-muted shrink-0 font-medium">Space:</span>
          <input
            type="text"
            value={personalData?.spaceComplexity || ''}
            onChange={(e) => onUpdateSpaceComplexity(e.target.value)}
            placeholder="O(1)"
            className="w-full bg-transparent text-[#e6edf3] placeholder:text-dark-muted/50 focus:outline-none font-mono text-xs"
          />
        </div>
      </div>

      {/* 5. Notes & My Code buttons */}
      <div className="grid grid-cols-2 gap-2 pt-0.5">
        <button
          onClick={onOpenNotes}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-semibold border transition-colors ${
            hasNotes 
              ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/20' 
              : 'bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border-[#30363d]'
          }`}
        >
          <span>📝 Notes</span>
          {hasNotes && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
        </button>

        <button
          onClick={onOpenCode}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-semibold border transition-colors ${
            hasCode 
              ? 'bg-brand-500/10 text-brand-300 border-brand-500/40 hover:bg-brand-500/20' 
              : 'bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border-[#30363d]'
          }`}
        >
          <span>&lt;/&gt; My Code</span>
          {hasCode && (
            <span className="text-[10px] font-mono uppercase text-brand-400 font-bold">
              {codeLang}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
