import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  ShieldCheck, 
  FileJson, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { PersonalDataStore } from '../types/tracker';
import { exportBackup, importBackup } from '../utils/storage';

interface BackupModalProps {
  isOpen: boolean;
  personalData: PersonalDataStore;
  onImportSuccess: (importedData: PersonalDataStore) => void;
  onClose: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  personalData,
  onImportSuccess,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const totalTrackedProblems = Object.keys(personalData).length;

  const handleExport = () => {
    exportBackup(personalData);
    setStatusMessage({
      type: 'success',
      text: `Backup exported successfully (${totalTrackedProblems} tracked problems).`
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackup(content);
      if (res.success && res.data) {
        setStatusMessage({ type: 'success', text: res.message });
        onImportSuccess(res.data);
      } else {
        setStatusMessage({ type: 'error', text: res.message });
      }
    };
    reader.onerror = () => {
      setStatusMessage({ type: 'error', text: 'Failed to read file from disk.' });
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg glass-panel bg-dark-surface border border-dark-border rounded-2xl shadow-2xl overflow-hidden p-6 animate-modal-in space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Data Backup & Restore
              </h2>
              <p className="text-xs text-dark-muted font-medium mt-0.5">
                Permanent Local Storage Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-dark-hover text-dark-muted hover:text-dark-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Note */}
        <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border text-xs text-dark-muted flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            Your master problem dataset is 100% separate and immutable. Backups only contain your personal notes, codes, statuses, revisions, and complexity annotations matched via stable problem IDs.
          </p>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Export Card */}
          <div className="p-4 rounded-xl border border-dark-border bg-dark-card flex flex-col justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-brand-400" />
                Export Backup
              </h3>
              <p className="text-[11px] text-dark-muted mt-1">
                Download all your saved codes, notes, and statuses as a single JSON file.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-brand-500 hover:bg-brand-600 text-white transition-colors"
            >
              Download JSON
            </button>
          </div>

          {/* Import Card */}
          <div className="p-4 rounded-xl border border-dark-border bg-dark-card flex flex-col justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                Import Backup
              </h3>
              <p className="text-[11px] text-dark-muted mt-1">
                Restore previously exported JSON backup to your browser storage.
              </p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-dark-hover hover:bg-dark-border text-dark-text border border-dark-border transition-colors"
            >
              Select Backup File
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-dark-hover hover:bg-dark-border text-dark-text transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
