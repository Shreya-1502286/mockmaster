import {
  DEBRIEF_QUOTES_BY_USER,
  PERSONAS,
  WEEKLY_PLAN_BY_USER,
} from './fixtures/personas';
import { QUESTIONS } from './fixtures/questions';
import {
  SEED_SESSIONS_BY_USER,
  TRACK_MASTERY_BY_USER,
  WEEKLY_HISTORY_BY_USER,
} from './fixtures/sessions';
import { TRACKS } from './fixtures/tracks';
import type {
  CreateSessionPayload,
  DebriefQuote,
  Difficulty,
  ProgressSummary,
  Question,
  QuestionEvaluation,
  RubricDimension,
  Scorecard,
  SessionRecord,
  Track,
  TrackId,
  UserPersona,
  UserSettings,
  WeeklyPlanItem,
} from './types';

const STORAGE_KEY = 'mockmaster_mock_store_v1';

interface MockStoreState {
  activeUserId: string;
  personas: UserPersona[];
  tracks: Track[];
  sessionsByUser: Record<string, SessionRecord[]>;
  weeklyPlanByUser: Record<string, WeeklyPlanItem[]>;
  debriefByUser: Record<string, DebriefQuote[]>;
}

function cloneDefaultState(): MockStoreState {
  return {
    activeUserId: PERSONAS[0].id,
    personas: structuredClone(PERSONAS),
    tracks: structuredClone(TRACKS),
    sessionsByUser: structuredClone(SEED_SESSIONS_BY_USER),
    weeklyPlanByUser: structuredClone(WEEKLY_PLAN_BY_USER),
    debriefByUser: structuredClone(DEBRIEF_QUOTES_BY_USER),
  };
}

function loadStore(): MockStoreState {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!raw) return cloneDefaultState();
    const parsed = JSON.parse(raw) as MockStoreState;
    if (!parsed.activeUserId || !Array.isArray(parsed.personas)) {
      return cloneDefaultState();
    }
    return parsed;
  } catch {
    return cloneDefaultState();
  }
}

let store: MockStoreState = loadStore();

function saveStore(): void {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore storage quota or SSR errors
  }
}

export function simulateLatency(minMs = 300, maxMs = 800): Promise<void> {
  const delay = Math.floor(minMs + Math.random() * (maxMs - minMs));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function getActivePersona(): UserPersona {
  return (
    store.personas.find((p) => p.id === store.activeUserId) ?? store.personas[0]
  );
}

function gradeFromScore(score: number): Scorecard['gradeLabel'] {
  if (score >= 88) return 'Interview Ready';
  if (score >= 76) return 'Strong';
  if (score >= 62) return 'Developing';
  return 'Needs Work';
}

function evaluateQuestionResponse(
  question: Question,
  userAnswer: string,
  userCode?: string,
  followUpAnswer?: string
): QuestionEvaluation {
  const combined = `${userAnswer} ${userCode ?? ''} ${followUpAnswer ?? ''}`.toLowerCase();

  const matchedKeywords = question.expectedKeywords.filter((kw) =>
    combined.includes(kw.toLowerCase())
  );

  const matchedRule = question.followUpRules.find((rule) =>
    rule.keywords.some((kw) => combined.includes(kw.toLowerCase()))
  );

  const followUpPrompt = matchedRule
    ? matchedRule.question
    : question.defaultFollowUp;

  const keywordRatio =
    question.expectedKeywords.length > 0
      ? matchedKeywords.length / question.expectedKeywords.length
      : 0.5;

  const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;
  const depthBonus = Math.min(18, Math.floor(wordCount / 6) * 3);
  const codeBonus = userCode && userCode.trim().length > 35 ? 10 : 0;
  const followUpBonus = followUpAnswer && followUpAnswer.trim().length > 15 ? 6 : 0;

  const rawScore = Math.round(52 + keywordRatio * 28 + depthBonus + codeBonus + followUpBonus);
  const score = Math.max(45, Math.min(96, rawScore));

  const missingKeywords = question.expectedKeywords.filter(
    (kw) => !matchedKeywords.includes(kw)
  );

  const feedbackParts: string[] = [];
  if (matchedKeywords.length > 0) {
    feedbackParts.push(
      `Good coverage of key concepts (${matchedKeywords.slice(0, 3).join(', ')}).`
    );
  } else {
    feedbackParts.push('Try anchoring your explanation around core complexity and architecture terms.');
  }

  if (missingKeywords.length > 0) {
    feedbackParts.push(
      `Consider explicitly addressing: ${missingKeywords.slice(0, 2).join(', ')}.`
    );
  }

  return {
    questionId: question.id,
    questionTitle: question.title,
    difficulty: question.difficulty,
    userAnswer,
    userCode,
    followUpPrompt,
    followUpAnswer,
    matchedKeywords,
    score,
    feedback: feedbackParts.join(' '),
  };
}

function buildScorecard(session: SessionRecord): Scorecard {
  const evals = session.evaluations;
  const avg =
    evals.length > 0
      ? Math.round(evals.reduce((sum, item) => sum + item.score, 0) / evals.length)
      : 72;

  const clamp = (n: number) => Math.max(45, Math.min(98, n));

  const rubric: RubricDimension[] = [
    {
      key: 'problemSolving',
      label: 'Problem Solving',
      score: clamp(avg + 2),
      feedback:
        avg >= 80
          ? 'Strong pattern recognition and clear decomposition of the problem.'
          : 'Identify the core pattern and state brute-force vs optimal tradeoffs early.',
    },
    {
      key: 'codeOrStructure',
      label: 'Code & Structure',
      score: clamp(avg - 1),
      feedback:
        avg >= 80
          ? 'Clean, modular structure with readable naming.'
          : 'Keep helper logic concise and double-check variable boundaries.',
    },
    {
      key: 'communication',
      label: 'Communication',
      score: clamp(avg + 1),
      feedback:
        avg >= 78
          ? 'Explained reasoning step-by-step and responded well to follow-ups.'
          : 'Narrate your assumptions and complexity before diving into details.',
    },
    {
      key: 'edgeCases',
      label: 'Edge Cases',
      score: clamp(avg - 3),
      feedback:
        avg >= 82
          ? 'Proactively handled empty inputs and boundary conditions.'
          : 'Walk through a small boundary example (empty, 1-element, or duplicate input).',
    },
  ];

  const strengths = evals
    .filter((e) => e.matchedKeywords.length > 0)
    .slice(0, 2)
    .map(
      (e) =>
        `${e.questionTitle}: covered ${e.matchedKeywords.slice(0, 2).join(' & ')}`
    );

  if (strengths.length === 0) {
    strengths.push('Completed all session prompts with structured reasoning');
  }

  const improvements = [
    'State time/space or architectural tradeoffs before implementing',
    'Verify boundary cases with a quick dry run before final submission',
  ];

  const mentorDebrief =
    avg >= 85
      ? 'Interview-ready pacing and strong technical depth. Keep leading with tradeoffs and edge cases.'
      : avg >= 75
        ? 'Solid foundation—sharpen your boundary-case dry runs to push into the 85+ range.'
        : 'Good start! Focus on naming core patterns upfront and testing edge cases step-by-step.';

  return {
    sessionId: session.id,
    overallScore: avg,
    gradeLabel: gradeFromScore(avg),
    rubric,
    strengths,
    improvements,
    mentorDebrief,
    questionEvaluations: evals,
  };
}

export const mockApi = {
  /** GET /users/me (helper for auth/persona context) */
  async getCurrentUser(): Promise<UserPersona> {
    await simulateLatency(250, 450);
    return structuredClone(getActivePersona());
  },

  /** List available demo personas for Login / Settings */
  async getPersonas(): Promise<UserPersona[]> {
    await simulateLatency(200, 400);
    return structuredClone(store.personas);
  },

  /** Quick demo login / persona switch */
  async loginAsPersona(personaId: string): Promise<UserPersona> {
    await simulateLatency(300, 600);
    const found = store.personas.find((p) => p.id === personaId);
    if (!found) {
      throw new Error(`Persona "${personaId}" not found`);
    }
    store.activeUserId = found.id;
    saveStore();
    return structuredClone(found);
  },

  /** GET /tracks */
  async getTracks(): Promise<Track[]> {
    await simulateLatency();
    return structuredClone(store.tracks);
  },

  /** GET /questions?track&difficulty */
  async getQuestions(params?: {
    track?: TrackId | 'all';
    difficulty?: Difficulty | 'all';
  }): Promise<Question[]> {
    await simulateLatency();
    let list = QUESTIONS;
    if (params?.track && params.track !== 'all') {
      list = list.filter((q) => q.trackId === params.track);
    }
    if (params?.difficulty && params.difficulty !== 'all') {
      list = list.filter((q) => q.difficulty === params.difficulty);
    }
    return structuredClone(list);
  },

  /** POST /sessions */
  async createSession(payload: CreateSessionPayload): Promise<SessionRecord> {
    await simulateLatency();
    const user = getActivePersona();
    const track = store.tracks.find((t) => t.id === payload.trackId);
    if (!track) {
      throw new Error(`Track "${payload.trackId}" not found`);
    }

    const matchingQuestions = QUESTIONS.filter(
      (q) => q.trackId === payload.trackId && q.difficulty === payload.difficulty
    );
    const pool =
      matchingQuestions.length > 0
        ? matchingQuestions
        : QUESTIONS.filter((q) => q.trackId === payload.trackId);

    const count = Math.min(payload.questionCount ?? 2, pool.length);
    const selectedIds = pool.slice(0, count).map((q) => q.id);

    const newSession: SessionRecord = {
      id: `sess-${Date.now().toString(36)}`,
      userId: user.id,
      trackId: track.id,
      trackName: track.name,
      difficulty: payload.difficulty,
      mode: payload.mode ?? 'timed',
      pacingMinutes: payload.pacingMinutes ?? user.settings.pacingMinutes,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      questionIds: selectedIds,
      evaluations: [],
    };

    const existing = store.sessionsByUser[user.id] ?? [];
    store.sessionsByUser[user.id] = [newSession, ...existing];
    saveStore();

    return structuredClone(newSession);
  },

  /** GET /sessions/:id */
  async getSessionById(sessionId: string): Promise<SessionRecord> {
    await simulateLatency();
    for (const sessions of Object.values(store.sessionsByUser)) {
      const found = sessions.find((s) => s.id === sessionId);
      if (found) return structuredClone(found);
    }
    throw new Error(`Session "${sessionId}" not found`);
  },

  /** Submit an answer + optional code for a question inside an active session */
  async submitSessionAnswer(
    sessionId: string,
    questionId: string,
    userAnswer: string,
    userCode?: string,
    followUpAnswer?: string
  ): Promise<QuestionEvaluation> {
    await simulateLatency();
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question) {
      throw new Error(`Question "${questionId}" not found`);
    }

    let targetSession: SessionRecord | undefined;
    for (const sessions of Object.values(store.sessionsByUser)) {
      const found = sessions.find((s) => s.id === sessionId);
      if (found) {
        targetSession = found;
        break;
      }
    }
    if (!targetSession) {
      throw new Error(`Session "${sessionId}" not found`);
    }

    const evaluation = evaluateQuestionResponse(
      question,
      userAnswer,
      userCode,
      followUpAnswer
    );

    const idx = targetSession.evaluations.findIndex(
      (e) => e.questionId === questionId
    );
    if (idx >= 0) {
      targetSession.evaluations[idx] = evaluation;
    } else {
      targetSession.evaluations.push(evaluation);
    }

    saveStore();
    return structuredClone(evaluation);
  },

  /** Complete an active session, generate its scorecard, and update streak/weekly plan */
  async completeSession(sessionId: string): Promise<SessionRecord> {
    await simulateLatency();
    const user = getActivePersona();
    const userSessions = store.sessionsByUser[user.id] ?? [];
    const session = userSessions.find((s) => s.id === sessionId);
    if (!session) {
      throw new Error(`Session "${sessionId}" not found`);
    }

    if (session.status !== 'completed') {
      session.status = 'completed';
      session.completedAt = new Date().toISOString();
      session.scorecard = buildScorecard(session);
      user.streakDays += 1;

      // Mark today's matching weekly plan item done if present
      const plan = store.weeklyPlanByUser[user.id] ?? [];
      const todayItem = plan.find(
        (item) => item.status === 'today' && item.trackId === session.trackId
      );
      if (todayItem) {
        todayItem.status = 'done';
      }

      // Prepend a fresh debrief quote
      const debriefs = store.debriefByUser[user.id] ?? [];
      debriefs.unshift({
        id: `deb-${Date.now().toString(36)}`,
        mentorName: 'MockMaster AI Coach',
        mentorTitle: 'Session Debrief',
        quote: session.scorecard.mentorDebrief,
        takeaway: session.scorecard.improvements[0] ?? 'Keep practicing consistently.',
        trackId: session.trackId,
        sessionDate: new Date().toISOString().slice(0, 10),
        score: session.scorecard.overallScore,
      });
      store.debriefByUser[user.id] = debriefs;
      saveStore();
    }

    return structuredClone(session);
  },

  /** GET /users/me/progress */
  async getMyProgress(): Promise<ProgressSummary> {
    await simulateLatency();
    const user = getActivePersona();
    const sessions = (store.sessionsByUser[user.id] ?? []).filter(
      (s) => s.status === 'completed'
    );

    const scores = sessions
      .map((s) => s.scorecard?.overallScore)
      .filter((v): v is number => typeof v === 'number');

    const averageScore =
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    const totalMinutesPracticed = sessions.reduce(
      (sum, s) => sum + s.pacingMinutes,
      0
    );

    const weeklyHistory = structuredClone(
      WEEKLY_HISTORY_BY_USER[user.id] ?? WEEKLY_HISTORY_BY_USER['user-shreya']
    );
    if (weeklyHistory.length > 0) {
      weeklyHistory[weeklyHistory.length - 1].targetSessions =
        user.settings.weeklySessionTarget;
    }

    const plan = store.weeklyPlanByUser[user.id] ?? [];
    const doneThisWeek = plan.filter((item) => item.status === 'done').length;

    return {
      userId: user.id,
      streakDays: user.streakDays,
      weeklySessionsCompleted: doneThisWeek,
      weeklySessionTarget: user.settings.weeklySessionTarget,
      totalSessionsCompleted: sessions.length,
      averageScore,
      totalMinutesPracticed,
      weeklyHistory,
      trackMastery: structuredClone(
        TRACK_MASTERY_BY_USER[user.id] ?? TRACK_MASTERY_BY_USER['user-shreya']
      ),
      recentSessions: structuredClone(sessions),
    };
  },

  /** GET /users/me/weekly-plan */
  async getMyWeeklyPlan(): Promise<WeeklyPlanItem[]> {
    await simulateLatency();
    const user = getActivePersona();
    return structuredClone(store.weeklyPlanByUser[user.id] ?? []);
  },

  /** GET /users/me/debrief */
  async getMyDebrief(): Promise<DebriefQuote[]> {
    await simulateLatency();
    const user = getActivePersona();
    return structuredClone(store.debriefByUser[user.id] ?? []);
  },

  /** PATCH /users/me/settings */
  async patchMySettings(
    partial: Partial<UserSettings>
  ): Promise<UserPersona> {
    await simulateLatency(250, 500);
    const user = getActivePersona();
    user.settings = {
      ...user.settings,
      ...partial,
    };
    if (partial.targetRole) {
      user.targetRole = partial.targetRole;
    }
    if (partial.personaRole) {
      user.role = partial.personaRole;
    }
    saveStore();
    return structuredClone(user);
  },

  /** Reset local mock store back to initial seed data */
  resetMockStore(): void {
    store = cloneDefaultState();
    saveStore();
  },
};

