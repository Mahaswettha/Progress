import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Problem } from '../types/tracker';

interface NotesModalProps {
  isOpen: boolean;
  problem: Problem | null;
  initialNotes: string;
  onSave: (problemId: string, notes: string) => void;
  onClose: () => void;
}

const MAX_WORDS = 1000;

export const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  problem,
  initialNotes,
  onSave,
  onClose,
}) => {
  const [content, setContent] = useState('');
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setContent(initialNotes || '');
      setWarning(null);
    }
  }, [isOpen, initialNotes]);

  if (!isOpen || !problem) return null;

  // Word count utility
  const countWords = (text: string): number => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  };

  const wordCount = countWords(content);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const newWordCount = countWords(newText);

    if (newWordCount > MAX_WORDS) {
      // Truncate to exactly MAX_WORDS words
      const words = newText.trim().split(/\s+/).slice(0, MAX_WORDS);
      setContent(words.join(' '));
      setWarning(`Maximum word limit of ${MAX_WORDS} words reached! Extra words truncated.`);
    } else {
      setContent(newText);
      if (warning) setWarning(null);
    }
  };

  const handleSave = () => {
    onSave(problem.id, content);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Notes — Problem Name */}
        <div className="p-4 border-b border-[#30363d] flex items-center justify-between gap-3">
          <h2 className="text-sm sm:text-base font-bold text-[#e6edf3] leading-tight truncate">
            Notes — <span className="text-cyan-400">{problem.name}</span>
          </h2>

          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-[#21262d] text-dark-muted hover:text-[#e6edf3] transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning if 1000 words reached */}
        {warning && (
          <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>{warning}</span>
          </div>
        )}

        {/* Text Area */}
        <div className="flex-1 p-4 flex flex-col min-h-[300px]">
          <textarea
            value={content}
            onChange={handleTextChange}
            placeholder="Type your notes, approach, time/space complexity intuition, key edge cases..."
            className="w-full flex-1 p-3.5 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-dark-muted/50 text-sm leading-relaxed resize-none focus:outline-none focus:border-cyan-500 font-sans"
            autoFocus
          />

          {/* Footer: Live word count & [Cancel] [Save Notes] */}
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className={`font-mono font-medium ${
              wordCount >= MAX_WORDS ? 'text-rose-400 font-bold' : 'text-dark-muted'
            }`}>
              {wordCount} / {MAX_WORDS} words
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-dark-muted hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
