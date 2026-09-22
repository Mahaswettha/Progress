import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { X, Copy, Check } from 'lucide-react';
import { Problem, CodeLanguage } from '../types/tracker';
import { STARTER_CODE } from '../utils/storage';

interface CodeModalProps {
  isOpen: boolean;
  problem: Problem | null;
  initialCode: string;
  initialLanguage: CodeLanguage;
  onSave: (problemId: string, code: string, language: CodeLanguage) => void;
  onClose: () => void;
  darkMode?: boolean;
}

export const CodeModal: React.FC<CodeModalProps> = ({
  isOpen,
  problem,
  initialCode,
  initialLanguage,
  onSave,
  onClose,
  darkMode = true,
}) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<CodeLanguage>('java');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLanguage(initialLanguage || 'java');
      if (initialCode && initialCode.trim().length > 0) {
        setCode(initialCode);
      } else {
        setCode(STARTER_CODE[initialLanguage || 'java']);
      }
      setCopied(false);
    }
  }, [isOpen, initialCode, initialLanguage]);

  if (!isOpen || !problem) return null;

  const getLanguageExtension = (lang: CodeLanguage) => {
    switch (lang) {
      case 'java':
        return [java()];
      case 'cpp':
        return [cpp()];
      case 'python':
        return [python()];
      default:
        return [java()];
    }
  };

  const handleLanguageChange = (newLang: CodeLanguage) => {
    setLanguage(newLang);
    const isStarter = Object.values(STARTER_CODE).some(s => s.trim() === code.trim());
    if (!code.trim() || isStarter) {
      setCode(STARTER_CODE[newLang]);
    }
  };

  const handleSave = () => {
    onSave(problem.id, code, language);
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#30363d] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <h2 className="text-sm sm:text-base font-bold text-[#e6edf3] leading-tight truncate">
              My Code — <span className="text-brand-400">{problem.name}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector: [ Java ▼ ] */}
            <div className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as CodeLanguage)}
                className="bg-transparent text-xs font-semibold text-brand-400 focus:outline-none cursor-pointer"
              >
                <option value="java" className="bg-[#161b22] text-[#e6edf3]">Java</option>
                <option value="cpp" className="bg-[#161b22] text-[#e6edf3]">C++</option>
                <option value="python" className="bg-[#161b22] text-[#e6edf3]">Python</option>
              </select>
            </div>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-[#21262d] text-dark-muted hover:text-[#e6edf3] transition-colors"
              title="Copy Code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-[#21262d] text-dark-muted hover:text-[#e6edf3] transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-hidden relative font-mono text-sm">
          <CodeMirror
            value={code}
            height="100%"
            theme={darkMode ? oneDark : undefined}
            extensions={getLanguageExtension(language)}
            onChange={(val) => setCode(val)}
            className="h-full text-sm font-mono overflow-auto"
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              foldGutter: true,
              autocompletion: true,
              bracketMatching: true,
              closeBrackets: true,
              indentOnInput: true,
              syntaxHighlighting: true,
            }}
          />
        </div>

        {/* Footer: [Cancel] [Save Code] */}
        <div className="px-4 py-2.5 border-t border-[#30363d] flex items-center justify-between gap-3 bg-[#0d1117]">
          <span className="text-[11px] text-dark-muted">
            Ctrl+Enter to save
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
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-brand-500 hover:bg-brand-600 text-white transition-colors"
            >
              Save Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
