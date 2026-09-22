import React from 'react';
import { 
  Search, 
  X, 
  RotateCcw,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { FilterState } from '../types/tracker';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalAll: number;
  stepsList: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalAll,
  stepsList,
}) => {
  const hasActiveFilters = 
    Boolean(filters.searchQuery) ||
    Boolean(filters.step) ||
    filters.difficulty !== 'all' ||
    filters.status !== 'all' ||
    filters.revision !== 'all' ||
    filters.hasNotes !== 'all' ||
    filters.hasCode !== 'all';

  return (
    <div className="glass-panel p-4 rounded-2xl border border-dark-border mb-6 space-y-3.5">
      {/* Search Input & Primary Status */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Search by problem name, #number, topic, subtopic..."
            className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-dark-card border border-dark-border rounded-xl text-dark-text placeholder:text-dark-muted focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark-text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Badge & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
          <span className="font-medium text-dark-muted bg-dark-card px-3 py-2 rounded-xl border border-dark-border">
            Showing <strong className="text-white">{totalFiltered}</strong> of {totalAll}
          </span>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-hover hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Multi-Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* Step Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-dark-muted mb-1">Step</label>
          <select
            value={filters.step}
            onChange={(e) => onFilterChange('step', e.target.value)}
            className="w-full text-xs bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5 text-dark-text focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="">All Steps</option>
            {stepsList.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-dark-muted mb-1">Difficulty</label>
          <select
            value={filters.difficulty}
            onChange={(e) => onFilterChange('difficulty', e.target.value)}
            className="w-full text-xs bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5 text-dark-text focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-dark-muted mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full text-xs bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5 text-dark-text focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="Solved">Solved</option>
            <option value="Revision">Revision</option>
            <option value="Important">Important</option>
          </select>
        </div>

        {/* Revision Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-dark-muted mb-1">Revision</label>
          <select
            value={filters.revision}
            onChange={(e) => onFilterChange('revision', e.target.value)}
            className="w-full text-xs bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5 text-dark-text focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="all">All Revisions</option>
            <option value="No Revision">No Revision</option>
            <option value="Revision 1">Revision 1</option>
            <option value="Revision 2">Revision 2</option>
            <option value="Revision 3">Revision 3</option>
            <option value="Mastered">Mastered</option>
          </select>
        </div>

        {/* Has Notes Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-dark-muted mb-1">Notes</label>
          <select
            value={filters.hasNotes}
            onChange={(e) => onFilterChange('hasNotes', e.target.value)}
            className="w-full text-xs bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5 text-dark-text focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="all">All</option>
            <option value="yes">Has Notes</option>
            <option value="no">No Notes</option>
          </select>
        </div>

        {/* Has Code Filter */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-dark-muted mb-1">My Code</label>
          <select
            value={filters.hasCode}
            onChange={(e) => onFilterChange('hasCode', e.target.value)}
            className="w-full text-xs bg-dark-card border border-dark-border rounded-lg px-2.5 py-1.5 text-dark-text focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="all">All</option>
            <option value="yes">Has Saved Code</option>
            <option value="no">No Code</option>
          </select>
        </div>
      </div>
    </div>
  );
};
