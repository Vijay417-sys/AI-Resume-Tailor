export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  roles: string[];
  education: string;
  rawContent: string;
}

export interface TailoredResume {
  name: string;
  contact: string;
  summary: string;
  skills: string[];
  experience: string[];
  education: string;
  keywords: string[];
}

export interface InterviewQuestion {
  id: number;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  modelAnswer: string;
  category: string;
}

export interface AppData {
  resume: File | null;
  jobDescription: string;
  parsedResume: ParsedResume | null;
  tailoredResume: TailoredResume | null;
  coverLetter: string | null;
  interviewQuestions: InterviewQuestion[];
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface PracticeSession {
  questionId: number;
  userAnswer: string;
  score: number;
  feedback: string[];
  suggestedAnswer: string;
}