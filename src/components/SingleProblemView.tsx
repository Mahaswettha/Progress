import React from 'react';
import { 
  Problem, 
  PersonalProblemData, 
  ProblemStatus, 
  RevisionStatus 
} from '../types/tracker';
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  BookOpen,
  Copy,
  Check
} from 'lucide-react';

interface SingleProblemViewProps {
  problem: Problem;
  personalData?: PersonalProblemData;
  onUpdateStatus: (status: ProblemStatus) => void;
  onUpdateRevision: (revision: RevisionStatus) => void;
  onUpdateTimeComplexity: (tc: string) => void;
  onUpdateSpaceComplexity: (sc: string) => void;
  onOpenNotes: () => void;
  onOpenCode: () => void;
  onPrevProblem?: () => void;
  onNextProblem?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const SingleProblemView: React.FC<SingleProblemViewProps> = ({
  problem,
  personalData,
  onUpdateStatus,
  onUpdateRevision,
  onUpdateTimeComplexity,
  onUpdateSpaceComplexity,
  onOpenNotes,
  onOpenCode,
  onPrevProblem,
  onNextProblem,
  hasPrev = false,
  hasNext = false,
}) => {
  const [copiedCode, setCopiedCode] = React.useState(false);
  const currentStatus = personalData?.status || 'Not Started';
  const currentRevision = personalData?.revision || 'No Revision';
  const timeComplexity = personalData?.timeComplexity || '';
  const spaceComplexity = personalData?.spaceComplexity || '';
  const notes = personalData?.notes || '';
  const code = personalData?.code || '';
  const language = personalData?.language || 'java';

  const hasNotes = Boolean(notes && notes.trim().length > 0);
  const hasCode = Boolean(code && code.trim().length > 0);

  const wordCount = hasNotes ? notes.trim().split(/\s+/).length : 0;

  const diffBadgeColor = {
    Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  }[problem.difficulty];

  const statusBorderColor = {
    'Not Started': 'border-[#30363d]',
    'Solved': 'border-emerald-500/40 shadow-emerald-950/20',
    'Revision': 'border-amber-500/40 shadow-amber-950/20',
    'Important': 'border-rose-500/40 shadow-rose-950/20',
  }[currentStatus];

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-4">
      {/* Top Breadcrumb & Next/Prev Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-dark-muted px-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-brand-400 font-semibold">{problem.step}: {problem.stepTitle}</span>
          <span className="text-dark-muted/60">/</span>
          <span className="text-[#c9d1d9]">{problem.subtopic}</span>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={onPrevProblem}
            disabled={!hasPrev}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs transition-colors ${
              hasPrev
                ? 'bg-[#161b22] border-[#30363d] text-[#e6edf3] hover:bg-[#21262d] hover:border-brand-500/50'
                : 'bg-[#161b22]/40 border-[#30363d]/40 text-dark-muted/40 cursor-not-allowed'
            }`}
            title="Previous Problem"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={onNextProblem}
            disabled={!hasNext}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs transition-colors ${
              hasNext
                ? 'bg-[#161b22] border-[#30363d] text-[#e6edf3] hover:bg-[#21262d] hover:border-brand-500/50'
                : 'bg-[#161b22]/40 border-[#30363d]/40 text-dark-muted/40 cursor-not-allowed'
            }`}
            title="Next Problem"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Single Problem Card */}
      <div className={`bg-[#161b22] border ${statusBorderColor} rounded-xl p-5 sm:p-6 shadow-xl space-y-6 transition-all`}>
        {/* Header: Number, Name, Difficulty, and Resource Links */}
        <div className="space-y-3 pb-4 border-b border-[#21262d]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-baseline gap-2.5 flex-1 min-w-[240px]">
              <span className="text-base sm:text-lg font-mono font-bold text-brand-400 shrink-0">
                #{problem.number}
              </span>
              <h2 className="text-base sm:text-xl font-bold text-[#e6edf3] tracking-tight leading-snug">
                {problem.name}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${diffBadgeColor}`}>
                {problem.difficulty}
              </span>
            </div>
          </div>

          {/* Links: Only display buttons for links that actually exist */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {problem.tufUrl && (
              <a
                href={problem.tufUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] hover:border-[#8b949e] transition-colors"
              >
                <span>TUF</span>
                <ExternalLink className="w-3 h-3 text-dark-muted" />
              </a>
            )}

            {problem.gfgUrl && (
              <a
                href={problem.gfgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#0d2818]/60 hover:bg-[#0d2818] text-emerald-300 border border-emerald-800/60 hover:border-emerald-500 transition-colors"
              >
                <span>GFG</span>
                <ExternalLink className="w-3 h-3 text-emerald-400/70" />
              </a>
            )}

            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#2a1b08]/80 hover:bg-[#3d270c] text-amber-300 border border-amber-800/60 hover:border-amber-500 transition-colors"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3 h-3 text-amber-400/70" />
              </a>
            )}

            {problem.youtubeUrl && (
              <a
                href={problem.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#2a0e12]/80 hover:bg-[#3d141a] text-rose-300 border border-rose-900/60 hover:border-rose-500 transition-colors"
              >
                <span>Video</span>
                <ExternalLink className="w-3 h-3 text-rose-400/70" />
              </a>
            )}
          </div>
        </div>

        {/* Controls Section: Status, Revision, Time, Space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Status Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-dark-muted block">Status</label>
            <select
              value={currentStatus}
              onChange={(e) => onUpdateStatus(e.target.value as ProblemStatus)}
              className="w-full text-xs font-medium rounded-lg px-2.5 py-2 bg-[#0d1117] border border-[#30363d] text-[#e6edf3] focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="Not Started">Not Started</option>
              <option value="Solved">Solved</option>
              <option value="Revision">Revision</option>
              <option value="Important">Important</option>
            </select>
          </div>

          {/* Revision Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-dark-muted block">Revision</label>
            <select
              value={currentRevision}
              onChange={(e) => onUpdateRevision(e.target.value as RevisionStatus)}
              className="w-full text-xs font-medium rounded-lg px-2.5 py-2 bg-[#0d1117] border border-[#30363d] text-[#e6edf3] focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="No Revision">No Revision</option>
              <option value="Revision 1">Revision 1</option>
              <option value="Revision 2">Revision 2</option>
              <option value="Revision 3">Revision 3</option>
              <option value="Mastered">Mastered</option>
            </select>
          </div>

          {/* Time Complexity */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-dark-muted block">Time Complexity</label>
            <div className="flex items-center bg-[#0d1117] px-2.5 py-1.5 rounded-lg border border-[#30363d] focus-within:border-brand-500">
              <span className="text-dark-muted/70 font-mono mr-1.5 select-none text-xs">Time:</span>
              <input
                type="text"
                value={timeComplexity}
                onChange={(e) => onUpdateTimeComplexity(e.target.value)}
                placeholder="O(n)"
                className="w-full bg-transparent text-[#e6edf3] placeholder:text-dark-muted/40 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          {/* Space Complexity */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-dark-muted block">Space Complexity</label>
            <div className="flex items-center bg-[#0d1117] px-2.5 py-1.5 rounded-lg border border-[#30363d] focus-within:border-brand-500">
              <span className="text-dark-muted/70 font-mono mr-1.5 select-none text-xs">Space:</span>
              <input
                type="text"
                value={spaceComplexity}
                onChange={(e) => onUpdateSpaceComplexity(e.target.value)}
                placeholder="O(1)"
                className="w-full bg-transparent text-[#e6edf3] placeholder:text-dark-muted/40 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons: Notes & My Code */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={onOpenNotes}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-semibold border transition-all ${
              hasNotes
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/25 shadow-sm'
                : 'bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border-[#30363d]'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>📝 Notes</span>
            {hasNotes && (
              <span className="px-1.5 py-0.2 text-[10px] rounded bg-cyan-900/60 text-cyan-300 font-mono">
                {wordCount} words
              </span>
            )}
          </button>

          <button
            onClick={onOpenCode}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-semibold border transition-all ${
              hasCode
                ? 'bg-brand-500/15 text-brand-300 border-brand-500/40 hover:bg-brand-500/25 shadow-sm'
                : 'bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border-[#30363d]'
            }`}
          >
            <Code2 className="w-4 h-4 text-brand-400" />
            <span>&lt;/&gt; My Code</span>
            {hasCode && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono uppercase bg-brand-900/60 text-brand-300 font-bold rounded">
                {language}
              </span>
            )}
          </button>
        </div>

        {/* Existing Content Previews (if notes or code exist) */}
        {(hasNotes || hasCode) && (
          <div className="pt-3 border-t border-[#21262d] space-y-3">
            {/* Notes Preview */}
            {hasNotes && (
              <div className="bg-[#0d1117] rounded-lg border border-[#30363d]/80 p-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Saved Notes ({wordCount} words)
                  </span>
                  <button
                    onClick={onOpenNotes}
                    className="text-[11px] text-dark-muted hover:text-cyan-300 font-medium underline transition-colors"
                  >
                    Edit in Modal
                  </button>
                </div>
                <p className="text-xs text-[#c9d1d9] leading-relaxed whitespace-pre-wrap line-clamp-4 font-sans pl-1">
                  {notes}
                </p>
              </div>
            )}

            {/* Code Preview */}
            {hasCode && (
              <div className="bg-[#0d1117] rounded-lg border border-[#30363d]/80 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-[#30363d]/60 text-xs">
                  <span className="font-semibold text-brand-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    Saved Solution ({language.toUpperCase()})
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 text-[11px] text-dark-muted hover:text-[#e6edf3] transition-colors"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={onOpenCode}
                      className="text-[11px] text-brand-400 hover:text-brand-300 font-medium underline transition-colors"
                    >
                      Open in Editor
                    </button>
                  </div>
                </div>
                <pre className="p-3 text-xs font-mono text-[#c9d1d9] overflow-x-auto max-h-48 leading-relaxed">
                  <code>{code}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
