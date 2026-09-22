export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export type ProblemStatus = 'Not Started' | 'Solved' | 'Revision' | 'Important';

export type RevisionStatus = 'No Revision' | 'Revision 1' | 'Revision 2' | 'Revision 3' | 'Mastered';

export type CodeLanguage = 'java' | 'cpp' | 'python';

export interface Problem {
  id: string;
  originalId: string;
  number: number;
  step: string;
  stepTitle: string;
  topic: string;
  subtopicId: string;
  subtopic: string;
  name: string;
  difficulty: ProblemDifficulty;
  tufUrl: string;
  gfgUrl: string;
  leetcodeUrl: string;
  youtubeUrl: string;
}

export interface PersonalProblemData {
  notes?: string;
  code?: string;
  language?: CodeLanguage;
  status?: ProblemStatus;
  revision?: RevisionStatus;
  timeComplexity?: string;
  spaceComplexity?: string;
  updatedAt?: number;
}

export type PersonalDataStore = Record<string, PersonalProblemData>;

export interface FilterState {
  searchQuery: string;
  step: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  status: string;
  revision: string;
  hasNotes: string; // 'all' | 'yes' | 'no'
  hasCode: string;  // 'all' | 'yes' | 'no'
}

export interface StepSummary {
  step: string;
  stepTitle: string;
  total: number;
  solved: number;
  revision: number;
  important: number;
  mastered: number;
}
