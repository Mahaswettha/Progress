import React from 'react';
import { 
  Search, 
  X, 
  RotateCcw,
  ChevronsDown,
  ChevronsUp
} from 'lucide-react';
import { FilterState } from '../types/tracker';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalAll: number;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  isAllExpanded: boolean;
  darkMode: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalAll,
  onExpandAll,
  onCollapseAll,
  isAllExpanded,
  darkMode,
}) => {
  const hasActiveFilters = 
    Boolean(filters.searchQuery) ||
    Boolean(filters.step) ||
    filters.difficulty !== 'all' ||
    filters.status !== 'all' ||
    filters.hasNotes !== 'all';

  return (
    <div className={`p-4 rounded-2xl border mb-6 space-y-3.5 shadow-sm transition-colors ${
      darkMode 
        ? 'bg-[#161b22] border-[#30363d]' 
        : 'bg-white border-slate-200'
    }`}>
      {/* Search Input & Primary Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Search problems by name, #number, topic, subtopic..."
            className={`w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border transition-all focus:outline-none focus:border-brand-500 ${
              darkMode
                ? 'bg-[#0d1117] border-[#30363d] text-slate-100 placeholder:text-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
            }`}
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Badge & Expand/Collapse Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
          {/* Expand / Collapse All */}
          <button
            onClick={isAllExpanded ? onCollapseAll : onExpandAll}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border font-semibold transition-colors ${
              darkMode
                ? 'bg-[#21262d] hover:bg-[#30363d] text-slate-200 border-[#30363d]'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isAllExpanded ? 'Collapse all steps' : 'Expand all steps'}
          >
            {isAllExpanded ? (
              <>
                <ChevronsUp className="w-4 h-4 text-brand-400" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronsDown className="w-4 h-4 text-brand-400" />
                <span>Expand All</span>
              </>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-semibold transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Multi-Filters Grid (3 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 border-t border-slate-800/30 dark:border-slate-800/60">
        {/* Difficulty Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Difficulty</label>
          <select
            value={filters.difficulty}
            onChange={(e) => onFilterChange('difficulty', e.target.value)}
            className={`w-full text-xs rounded-lg px-2.5 py-1.5 border transition-colors focus:outline-none focus:border-brand-500 cursor-pointer ${
              darkMode 
                ? 'bg-[#0d1117] border-[#30363d] text-slate-200' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className={`w-full text-xs rounded-lg px-2.5 py-1.5 border transition-colors focus:outline-none focus:border-brand-500 cursor-pointer ${
              darkMode 
                ? 'bg-[#0d1117] border-[#30363d] text-slate-200' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="Solved">Solved</option>
            <option value="Revision">Revision</option>
            <option value="Important">Important</option>
          </select>
        </div>

        {/* Has Notes Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Personal Notes</label>
          <select
            value={filters.hasNotes}
            onChange={(e) => onFilterChange('hasNotes', e.target.value)}
            className={`w-full text-xs rounded-lg px-2.5 py-1.5 border transition-colors focus:outline-none focus:border-brand-500 cursor-pointer ${
              darkMode 
                ? 'bg-[#0d1117] border-[#30363d] text-slate-200' 
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">All</option>
            <option value="yes">With Notes 📝</option>
            <option value="no">Without Notes</option>
          </select>
        </div>
      </div>
    </div>
  );
};
