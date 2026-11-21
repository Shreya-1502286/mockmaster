import type { Track } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    shortName: 'DSA',
    description:
      'Arrays, sliding windows, trees, graphs, and dynamic programming patterns with complexity analysis.',
    category: 'Coding',
    isFree: true,
    isEnrolled: true,
    totalQuestions: 9,
    completedQuestions: 4,
    estimatedMinutes: 30,
    difficultyDistribution: { easy: 3, medium: 3, hard: 3 },
    tags: ['Arrays', 'Trees', 'Graphs', 'DP'],
  },
  {
    id: 'frontend',
    name: 'Frontend & React Engineering',
    shortName: 'Frontend',
    description:
      'JavaScript internals, React hooks, async UI patterns, accessibility, and browser rendering performance.',
    category: 'UI Engineering',
    isFree: false,
    isEnrolled: true,
    totalQuestions: 9,
    completedQuestions: 5,
    estimatedMinutes: 30,
    difficultyDistribution: { easy: 3, medium: 3, hard: 3 },
    tags: ['React', 'TypeScript', 'DOM', 'Performance'],
  },
  {
    id: 'behavioral',
    name: 'Behavioral & STAR Stories',
    shortName: 'Behavioral',
    description:
      'Structured storytelling for ownership, conflict resolution, ambiguity, and cross-functional impact.',
    category: 'Leadership & Fit',
    isFree: true,
    isEnrolled: true,
    totalQuestions: 9,
    completedQuestions: 3,
    estimatedMinutes: 20,
    difficultyDistribution: { easy: 3, medium: 3, hard: 3 },
    tags: ['STAR', 'Ownership', 'Teamwork'],
  },
  {
    id: 'system-design',
    name: 'Frontend & Web System Design',
    shortName: 'System Design',
    description:
      'Scalable client architectures, state management, caching, real-time updates, and API contracts.',
    category: 'Architecture',
    isFree: false,
    isEnrolled: false,
    totalQuestions: 9,
    completedQuestions: 1,
    estimatedMinutes: 45,
    difficultyDistribution: { easy: 3, medium: 3, hard: 3 },
    tags: ['Caching', 'WebSockets', 'Scalability'],
  },
];

