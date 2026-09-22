import { PersonalDataStore, PersonalProblemData, CodeLanguage } from '../types/tracker';

const STORAGE_KEY = 'striver_a2z_personal_tracker_v1';

export const STARTER_CODE: Record<CodeLanguage, string> = {
  java: `import java.util.*;

class Solution {
    public void solve() {
        // Write your solution here
        
    }
}`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    void solve() {
        // Write your solution here
        
    }
};`,
  python: `class Solution:
    def solve(self):
        # Write your solution here
        pass
`
};

export function loadPersonalData(): PersonalDataStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load personal tracker data from localStorage:', err);
    return {};
  }
}

export function savePersonalData(data: PersonalDataStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save personal tracker data to localStorage:', err);
  }
}

export function updateProblemPersonalData(
  problemId: string,
  partialData: Partial<PersonalProblemData>
): PersonalDataStore {
  const current = loadPersonalData();
  const existing = current[problemId] || {
    notes: '',
    code: '',
    language: 'java',
    status: 'Not Started',
    revision: 'No Revision',
    timeComplexity: '',
    spaceComplexity: ''
  };

  const updated: PersonalProblemData = {
    ...existing,
    ...partialData,
    updatedAt: Date.now()
  };

  current[problemId] = updated;
  savePersonalData(current);
  return { ...current };
}

export function exportBackup(data: PersonalDataStore): void {
  const payload = {
    app: 'Progress Tracker',
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    totalProblemsTracked: Object.keys(data).length,
    data: data
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().split('T')[0];
  a.download = `progress_tracker_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importBackup(jsonString: string): { success: boolean; message: string; data?: PersonalDataStore } {
  try {
    const parsed = JSON.parse(jsonString);
    let incomingData: PersonalDataStore | null = null;

    if (parsed && typeof parsed === 'object') {
      if (parsed.data && typeof parsed.data === 'object') {
        incomingData = parsed.data;
      } else {
        // Direct map
        incomingData = parsed;
      }
    }

    if (!incomingData) {
      return { success: false, message: 'Invalid backup file format.' };
    }

    // Validate entries
    const validated: PersonalDataStore = {};
    let validCount = 0;

    for (const [key, val] of Object.entries(incomingData)) {
      if (typeof val === 'object' && val !== null) {
        validated[key] = {
          notes: typeof val.notes === 'string' ? val.notes : '',
          code: typeof val.code === 'string' ? val.code : '',
          language: (val.language === 'cpp' || val.language === 'python') ? val.language : 'java',
          status: val.status || 'Not Started',
          revision: val.revision || 'No Revision',
          timeComplexity: typeof val.timeComplexity === 'string' ? val.timeComplexity : '',
          spaceComplexity: typeof val.spaceComplexity === 'string' ? val.spaceComplexity : '',
          updatedAt: val.updatedAt || Date.now()
        };
        validCount++;
      }
    }

    savePersonalData(validated);
    return {
      success: true,
      message: `Successfully imported backup with ${validCount} problem records.`,
      data: validated
    };
  } catch (err) {
    return {
      success: false,
      message: `Error reading backup file: ${(err as Error).message}`
    };
  }
}
