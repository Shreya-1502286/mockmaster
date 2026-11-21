import type { DebriefQuote, UserPersona, WeeklyPlanItem } from '../types';

export const PERSONAS: UserPersona[] = [
  {
    id: 'user-shreya',
    name: 'Shreya',
    email: 'shreya@mockmaster.dev',
    avatarInitials: 'SH',
    role: 'fresher',
    targetRole: 'Frontend Dev',
    experienceLabel: 'Fresher · 0–1 yrs',
    streakDays: 6,
    settings: {
      theme: 'light',
      weeklySessionTarget: 5,
      targetRole: 'Frontend Dev',
      personaRole: 'fresher',
      preferredDifficulty: 'medium',
      pacingMinutes: 30,
    },
  },
  {
    id: 'user-aarav',
    name: 'Aarav',
    email: 'aarav@mockmaster.dev',
    avatarInitials: 'AA',
    role: 'professional',
    targetRole: 'Senior Frontend Engineer',
    experienceLabel: 'Working Professional · 4 yrs',
    streakDays: 11,
    settings: {
      theme: 'dark',
      weeklySessionTarget: 4,
      targetRole: 'Senior Frontend Engineer',
      personaRole: 'professional',
      preferredDifficulty: 'hard',
      pacingMinutes: 45,
    },
  },
];

export const WEEKLY_PLAN_BY_USER: Record<string, WeeklyPlanItem[]> = {
  'user-shreya': [
    {
      id: 'wp-1',
      dayLabel: 'Mon',
      title: 'React Rendering & Hooks Deep Dive',
      trackId: 'frontend',
      status: 'done',
      tag: 'learn',
      durationMinutes: 25,
    },
    {
      id: 'wp-2',
      dayLabel: 'Tue',
      title: 'Sliding Window & HashMap Drills',
      trackId: 'dsa',
      status: 'done',
      tag: 'practise',
      durationMinutes: 30,
    },
    {
      id: 'wp-3',
      dayLabel: 'Wed',
      title: 'Frontend Mock: Async State & Debounce',
      trackId: 'frontend',
      status: 'today',
      tag: 'interview',
      durationMinutes: 30,
    },
    {
      id: 'wp-4',
      dayLabel: 'Thu',
      title: 'STAR Method: Conflict & Ownership',
      trackId: 'behavioral',
      status: 'upcoming',
      tag: 'practise',
      durationMinutes: 20,
    },
    {
      id: 'wp-5',
      dayLabel: 'Fri',
      title: 'Autocomplete Widget Architecture',
      trackId: 'system-design',
      status: 'upcoming',
      tag: 'interview',
      durationMinutes: 35,
    },
  ],
  'user-aarav': [
    {
      id: 'wp-a1',
      dayLabel: 'Mon',
      title: 'Micro-frontend & Module Federation',
      trackId: 'system-design',
      status: 'done',
      tag: 'learn',
      durationMinutes: 35,
    },
    {
      id: 'wp-a2',
      dayLabel: 'Tue',
      title: 'Graph Traversal & Shortest Path',
      trackId: 'dsa',
      status: 'done',
      tag: 'practise',
      durationMinutes: 40,
    },
    {
      id: 'wp-a3',
      dayLabel: 'Wed',
      title: 'System Design Mock: Collaborative Editor',
      trackId: 'system-design',
      status: 'today',
      tag: 'interview',
      durationMinutes: 45,
    },
    {
      id: 'wp-a4',
      dayLabel: 'Thu',
      title: 'Leadership: Cross-team Tradeoffs',
      trackId: 'behavioral',
      status: 'upcoming',
      tag: 'practise',
      durationMinutes: 25,
    },
    {
      id: 'wp-a5',
      dayLabel: 'Fri',
      title: 'Browser Performance & Core Web Vitals',
      trackId: 'frontend',
      status: 'upcoming',
      tag: 'interview',
      durationMinutes: 40,
    },
  ],
};

export const DEBRIEF_QUOTES_BY_USER: Record<string, DebriefQuote[]> = {
  'user-shreya': [
    {
      id: 'deb-1',
      mentorName: 'Maya Lin',
      mentorTitle: 'Staff Frontend Mentor',
      quote:
        'Your intuition for React state updates is solid—just state your time/space tradeoffs before typing your first line.',
      takeaway: 'Narrate edge cases (empty array, stale closure) upfront.',
      trackId: 'frontend',
      sessionDate: '2026-11-19',
      score: 84,
    },
    {
      id: 'deb-2',
      mentorName: 'Rohan Kapoor',
      mentorTitle: 'Senior SWE Interviewer',
      quote:
        'Clean two-pointer solution! Next time, walk through a dry run on a 3-element input to catch off-by-one bounds early.',
      takeaway: 'Dry-run boundary indices before submitting.',
      trackId: 'dsa',
      sessionDate: '2026-11-17',
      score: 79,
    },
  ],
  'user-aarav': [
    {
      id: 'deb-a1',
      mentorName: 'Elena Vance',
      mentorTitle: 'Principal Architect',
      quote:
        'Strong capacity estimation and caching strategy. Explicitly call out cache invalidation failure modes earlier in the discussion.',
      takeaway: 'Lead with SLAs and failure-mode mitigations.',
      trackId: 'system-design',
      sessionDate: '2026-11-18',
      score: 89,
    },
  ],
};

