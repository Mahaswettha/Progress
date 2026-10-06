import React from 'react';
import { 
  Problem, 
  PersonalProblemData, 
  ProblemStatus 
} from '../types/tracker';
import { 
  CheckCircle2, 
  Circle, 
  FileText, 
  Youtube, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';

const DEFAULT_ARTICLE_URL = 'https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet?page=sheet&open=2085,2009,2084';

interface ProblemRowProps {
  problem: Problem;
  personalData?: PersonalProblemData;
  onUpdateStatus: (status: ProblemStatus) => void;
  onUpdateTimeComplexity: (tc: string) => void;
  onUpdateSpaceComplexity: (sc: string) => void;
  onOpenNotes: () => void;
  darkMode: boolean;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  personalData,
  onUpdateStatus,
  onOpenNotes,
  darkMode,
}) => {
  const currentStatus = personalData?.status || 'Not Started';
  const isSolved = currentStatus === 'Solved';
  const hasNotes = Boolean(personalData?.notes && personalData.notes.trim().length > 0);

  const articleUrl = problem.tufUrl && problem.tufUrl.trim().length > 0 
    ? problem.tufUrl 
    : DEFAULT_ARTICLE_URL;

  const toggleSolved = () => {
    onUpdateStatus(isSolved ? 'Not Started' : 'Solved');
  };

  const diffBadgeColor = {
    Easy: darkMode 
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
      : 'text-emerald-700 bg-emerald-50 border-emerald-200',
    Medium: darkMode 
      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' 
      : 'text-amber-700 bg-amber-50 border-amber-200',
    Hard: darkMode 
      ? 'text-rose-400 bg-rose-500/10 border-rose-500/30' 
      : 'text-rose-700 bg-rose-50 border-rose-200',
  }[problem.difficulty];

  return (
    <div className={`group px-3.5 py-3 border-b transition-colors ${
      isSolved 
        ? darkMode 
          ? 'bg-emerald-950/15 border-[#21262d] hover:bg-emerald-950/25' 
          : 'bg-emerald-50/50 border-slate-200 hover:bg-emerald-50'
        : currentStatus === 'Important'
          ? darkMode
            ? 'bg-rose-950/15 border-[#21262d] hover:bg-rose-950/25'
            : 'bg-rose-50/40 border-slate-200 hover:bg-rose-50'
          : darkMode 
            ? 'bg-[#161b22] border-[#21262d] hover:bg-[#1c2128]' 
            : 'bg-white border-slate-200 hover:bg-slate-50'
    }`}>
      {/* Desktop / Tablet Row Layout (12 cols) */}
      <div className="hidden lg:grid grid-cols-12 items-center gap-3 text-xs">
        {/* Col 1: Solved Checkbox + Problem # */}
        <div className="col-span-1 flex items-center gap-2">
          <button
            onClick={toggleSolved}
            className={`p-1 rounded-md transition-transform active:scale-95 ${
              isSolved 
                ? 'text-emerald-400 hover:text-emerald-300' 
                : darkMode 
                  ? 'text-slate-500 hover:text-slate-300' 
                  : 'text-slate-400 hover:text-slate-600'
            }`}
            title={isSolved ? 'Mark as Not Solved' : 'Mark as Solved'}
          >
            {isSolved ? (
              <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <span className="font-mono text-[11px] font-semibold text-slate-400">
            #{problem.number}
          </span>
        </div>

        {/* Col 2-7: Problem Name + Difficulty Badge (6 cols) */}
        <div className="col-span-6 flex items-center gap-2 min-w-0 pr-3">
          <span className={`font-medium truncate ${
            isSolved 
              ? darkMode ? 'text-slate-200' : 'text-slate-700 font-semibold' 
              : darkMode ? 'text-slate-100' : 'text-slate-900'
          }`} title={problem.name}>
            {problem.name}
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${diffBadgeColor}`}>
            {problem.difficulty}
          </span>
        </div>

        {/* Col 8-9: Resource Links (Article, Video) (2 cols) */}
        <div className="col-span-2 flex items-center gap-1.5">
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
              darkMode
                ? 'bg-[#21262d] hover:bg-[#30363d] text-cyan-300 border-[#30363d]'
                : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border-cyan-200'
            }`}
            title="Open TUF Article"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Article</span>
          </a>

          {problem.youtubeUrl && (
            <a
              href={problem.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                darkMode
                  ? 'bg-[#21262d] hover:bg-rose-950/40 text-rose-300 border-[#30363d] hover:border-rose-500/40'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
              }`}
              title="Watch YouTube Solution Video"
            >
              <Youtube className="w-3.5 h-3.5 text-rose-500" />
              <span>Video</span>
            </a>
          )}
        </div>

        {/* Col 10-11: Practice Links (LeetCode, GFG) (2 cols) */}
        <div className="col-span-2 flex items-center gap-1.5">
          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                darkMode
                  ? 'bg-[#21262d] hover:bg-amber-950/40 text-amber-300 border-[#30363d] hover:border-amber-500/40'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
              }`}
              title="Solve on LeetCode"
            >
              <span>LeetCode</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          )}

          {problem.gfgUrl && (
            <a
              href={problem.gfgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                darkMode
                  ? 'bg-[#21262d] hover:bg-emerald-950/40 text-emerald-300 border-[#30363d] hover:border-emerald-500/40'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
              title="Solve on GeeksforGeeks"
            >
              <span>GFG</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          )}

          {!problem.leetcodeUrl && !problem.gfgUrl && (
            <span className="text-slate-500 text-[11px]">-</span>
          )}
        </div>

        {/* Col 12: Notes Action Button (1 col) */}
        <div className="col-span-1 flex items-center justify-end">
          <button
            onClick={onOpenNotes}
            className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] font-semibold border transition-colors ${
              hasNotes
                ? darkMode
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/25'
                  : 'bg-cyan-50 text-cyan-700 border-cyan-300 hover:bg-cyan-100'
                : darkMode
                  ? 'bg-[#21262d] hover:bg-[#30363d] text-slate-300 border-[#30363d]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={hasNotes ? 'View/Edit Notes' : 'Add Personal Notes'}
          >
            <FileText className={`w-3.5 h-3.5 ${hasNotes ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>Notes</span>
            {hasNotes && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
          </button>
        </div>
      </div>

      {/* Mobile Row Card Layout */}
      <div className="lg:hidden flex flex-col gap-2.5 text-xs">
        {/* Top: Checkbox, Name, Difficulty */}
        <div className="flex items-start gap-2 min-w-0">
          <button
            onClick={toggleSolved}
            className={`p-0.5 rounded transition-transform active:scale-95 shrink-0 mt-0.5 ${
              isSolved 
                ? 'text-emerald-400' 
                : darkMode ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isSolved ? (
              <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-slate-400 font-bold">#{problem.number}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase ${diffBadgeColor}`}>
                {problem.difficulty}
              </span>
            </div>
            <h4 className={`font-semibold text-xs leading-snug mt-0.5 ${
              isSolved 
                ? darkMode ? 'text-slate-300' : 'text-slate-700' 
                : darkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              {problem.name}
            </h4>
          </div>
        </div>

        {/* Links & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-dashed border-slate-800/40 dark:border-slate-800/60">
          {/* Practice & Resources */}
          <div className="flex flex-wrap items-center gap-1">
            <a
              href={articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-cyan-400" />
              Article
            </a>

            {problem.youtubeUrl && (
              <a
                href={problem.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1"
              >
                <Youtube className="w-3 h-3 text-rose-400" />
                Video
              </a>
            )}
            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30"
              >
                LeetCode
              </a>
            )}
            {problem.gfgUrl && (
              <a
                href={problem.gfgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
              >
                GFG
              </a>
            )}
          </div>

          {/* Notes Button */}
          <div>
            <button
              onClick={onOpenNotes}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-semibold border ${
                hasNotes
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                  : darkMode ? 'bg-[#21262d] text-slate-300 border-[#30363d]' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Notes</span>
              {hasNotes && <span className="w-1 h-1 rounded-full bg-cyan-400" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
