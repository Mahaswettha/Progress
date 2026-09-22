import React from 'react';
import { 
  Moon, 
  Sun, 
  Download, 
  Menu, 
  Search, 
  X,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenBackup: () => void;
  onLogout: () => void;
  toggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenBackup,
  onLogout,
  toggleSidebar,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#161b22] border-b border-[#30363d] px-4 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Mobile Nav Toggle & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] transition-colors"
            title="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
            <span className="text-brand-500">Progress</span> Tracker
          </h1>
        </div>

        {/* Center: Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search problems by name, #number, topic..."
            className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-dark-muted focus:outline-none focus:border-brand-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dark-muted hover:text-[#e6edf3]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Backup, Logout & Theme */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenBackup}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] transition-colors"
            title="Export or Import Tracker Backup"
          >
            <Download className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Backup</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-rose-500/20 text-[#e6edf3] hover:text-rose-300 border border-[#30363d] hover:border-rose-500/40 transition-colors"
            title="Log Out of Tracker"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-dark-muted hover:text-[#e6edf3] border border-[#30363d] transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
