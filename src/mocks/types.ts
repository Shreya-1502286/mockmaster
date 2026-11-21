export type TrackId = 'dsa' | 'frontend' | 'behavioral' | 'system-design';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type PersonaRole = 'fresher' | 'professional';

export type ThemeMode = 'light' | 'dark';

export type WeeklyPlanStatus = 'done' | 'today' | 'upcoming';

export type WeeklyPlanTag = 'learn' | 'practise' | 'interview';

export type SessionMode = 'timed' | 'practice' | 'guided';

export interface UserSettings {
  theme: ThemeMode;
  weeklySessionTarget: number;
  targetRole: string;
  personaRole: PersonaRole;
  preferredDifficulty: Difficulty;
  pacingMinutes: number;
}

export interface UserPersona {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  role: PersonaRole;
  targetRole: string;
  experienceLabel: string;
  streakDays: number;
  settings: UserSettings;
}

export interface Track {
  id: TrackId;
  name: string;
  shortName: string;
  description: string;
  category: 'Coding' | 'UI Engineering' | 'Leadership & Fit' | 'Architecture';
  isFree: boolean;
  isEnrolled: boolean;
  totalQuestions: number;
  completedQuestions: number;
  estimatedMinutes: number;
  difficultyDistribution: Record<Difficulty, number>;
  tags: string[];
}

export interface FollowUpRule {
  keywords: string[];
  question: string;
  focusArea: string;
}

export interface Question {
  id: string;
  trackId: TrackId;
  difficulty: Difficulty;
  title: string;
  prompt: string;
  context?: string;
  hints: string[];
  starterCode?: string;
  language?: 'typescript' | 'javascript';
  expectedKeywords: string[];
  followUpRules: FollowUpRule[];
  defaultFollowUp: string;
  rubricWeights: {
    problemSolving: number;
    codeOrStructure: number;
    communication: number;
    edgeCases: number;
  };
}

export interface WeeklyPlanItem {
  id: string;
  dayLabel: string;
  title: string;
  trackId: TrackId;
  status: WeeklyPlanStatus;
  tag: WeeklyPlanTag;
  durationMinutes: number;
}

export interface DebriefQuote {
  id: string;
  mentorName: string;
  mentorTitle: string;
  quote: string;
  takeaway: string;
  trackId: TrackId;
  sessionDate: string;
  score: number;
}

export interface RubricDimension {
  key: 'problemSolving' | 'codeOrStructure' | 'communication' | 'edgeCases';
  label: string;
  score: number; // 0-100
  feedback: string;
}

export interface QuestionEvaluation {
  questionId: string;
  questionTitle: string;
  difficulty: Difficulty;
  userAnswer: string;
  userCode?: string;
  followUpPrompt: string;
  followUpAnswer?: string;
  matchedKeywords: string[];
  score: number; // 0-100
  feedback: string;
}

export interface Scorecard {
  sessionId: string;
  overallScore: number; // 0-100
  gradeLabel: 'Needs Work' | 'Developing' | 'Strong' | 'Interview Ready';
  rubric: RubricDimension[];
  strengths: string[];
  improvements: string[];
  mentorDebrief: string;
  questionEvaluations: QuestionEvaluation[];
}

export interface SessionRecord {
  id: string;
  userId: string;
  trackId: TrackId;
  trackName: string;
  difficulty: Difficulty;
  mode: SessionMode;
  pacingMinutes: number;
  status: 'in_progress' | 'completed';
  startedAt: string;
  completedAt?: string;
  questionIds: string[];
  evaluations: QuestionEvaluation[];
  scorecard?: Scorecard;
}

export interface WeeklyHistoryPoint {
  weekLabel: string;
  sessionsCompleted: number;
  targetSessions: number;
  avgScore: number;
  minutesPracticed: number;
}

export interface TrackMastery {
  trackId: TrackId;
  trackName: string;
  masteryPct: number;
  sessionsCount: number;
  avgScore: number;
}

export interface ProgressSummary {
  userId: string;
  streakDays: number;
  weeklySessionsCompleted: number;
  weeklySessionTarget: number;
  totalSessionsCompleted: number;
  averageScore: number;
  totalMinutesPracticed: number;
  weeklyHistory: WeeklyHistoryPoint[];
  trackMastery: TrackMastery[];
  recentSessions: SessionRecord[];
}

export interface CreateSessionPayload {
  trackId: TrackId;
  difficulty: Difficulty;
  mode?: SessionMode;
  pacingMinutes?: number;
  questionCount?: number;
}

