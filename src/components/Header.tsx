import React from 'react';
import { 
  Moon, 
  Sun, 
  Download, 
  LogOut,
  Code2,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenBackup: () => void;
  onLogout: () => void;
  totalProblems: number;
  solvedProblems: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenBackup,
  onLogout,
  totalProblems,
  solvedProblems,
}) => {
  const solvedPercent = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors shadow-sm ${
      darkMode
        ? 'bg-[#161b22]/95 backdrop-blur-md border-[#30363d] text-[#e6edf3]'
        : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white shadow-md shadow-brand-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-1.5 leading-tight">
              <span className="text-brand-500">Striver's</span> A2Z DSA Sheet
            </h1>
            <p className="text-[11px] font-medium text-slate-400">
              Personal Tracker & Notes
            </p>
          </div>
        </div>

        {/* Center / Right: Progress Summary Pill */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full border bg-slate-500/5 dark:bg-slate-800/40 border-slate-200 dark:border-[#30363d]">
          <span className="text-xs font-semibold text-slate-400">
            Progress:
          </span>
          <span className="text-xs font-bold text-brand-500">
            {solvedProblems} / {totalProblems}
          </span>
          <div className="w-24 bg-slate-300 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${solvedPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-emerald-400">
            {solvedPercent}%
          </span>
        </div>

        {/* Right Actions: Backup, Theme, Logout */}
        <div className="flex items-center gap-2">
          {/* Backup Button */}
          <button
            onClick={onOpenBackup}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              darkMode
                ? 'bg-[#21262d] hover:bg-[#30363d] text-slate-200 border-[#30363d]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Export or Import Tracker Backup"
          >
            <Download className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Backup / Restore</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-1.5 rounded-lg border transition-colors ${
              darkMode
                ? 'bg-[#21262d] hover:bg-[#30363d] text-slate-400 hover:text-slate-100 border-[#30363d]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
              darkMode
                ? 'bg-[#21262d] hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border-[#30363d] hover:border-rose-500/40'
                : 'bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border-slate-200 hover:border-rose-200'
            }`}
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
