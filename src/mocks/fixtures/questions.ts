import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  // ==================== DSA (9 questions: 3 easy, 3 medium, 3 hard) ====================
  {
    id: 'dsa-e1',
    trackId: 'dsa',
    difficulty: 'easy',
    title: 'Two Sum with Target Pair',
    prompt:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. Assume exactly one solution exists and you may not use the same element twice.',
    hints: [
      'A brute-force nested loop takes O(n^2) time.',
      'Use a hash map to store value -> index as you iterate in O(n) time.',
    ],
    starterCode: `function twoSum(nums: number[], target: number): [number, number] {\n  // Your solution here\n  return [0, 1];\n}`,
    language: 'typescript',
    expectedKeywords: ['map', 'hash', 'complement', 'o(n)', 'space'],
    followUpRules: [
      {
        keywords: ['map', 'hash', 'object'],
        question: 'What is the worst-case time and space complexity of your hash map approach, and how would you handle duplicate values?',
        focusArea: 'Complexity & Duplicates',
      },
      {
        keywords: ['sort', 'two pointer'],
        question: 'Sorting changes original indices—how would you preserve the original indices if you used two pointers?',
        focusArea: 'Index Preservation',
      },
    ],
    defaultFollowUp: 'Can you optimize this from O(n^2) to O(n) time? What space tradeoff does that introduce?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.3, communication: 0.15, edgeCases: 0.2 },
  },
  {
    id: 'dsa-e2',
    trackId: 'dsa',
    difficulty: 'easy',
    title: 'Valid Parentheses Matcher',
    prompt:
      'Given a string `s` containing only `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid (open brackets closed by the same type and in the correct order).',
    hints: [
      'Think LIFO (Last-In, First-Out).',
      'Check if the stack is empty at the end and before popping.',
    ],
    starterCode: `function isValidBrackets(s: string): boolean {\n  // Your solution here\n  return false;\n}`,
    language: 'typescript',
    expectedKeywords: ['stack', 'push', 'pop', 'empty', 'o(n)'],
    followUpRules: [
      {
        keywords: ['stack', 'push', 'pop'],
        question: 'What happens if the string has an odd length or starts with a closing bracket?',
        focusArea: 'Edge Cases',
      },
    ],
    defaultFollowUp: 'How does your solution handle an empty string or an unmatched opening bracket at the end?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.3, communication: 0.15, edgeCases: 0.25 },
  },
  {
    id: 'dsa-e3',
    trackId: 'dsa',
    difficulty: 'easy',
    title: 'Best Time to Buy and Sell Stock',
    prompt:
      'Given an array `prices` where `prices[i]` is the price of a stock on day `i`, maximize your profit by choosing a single day to buy and a future day to sell.',
    hints: [
      'Track the minimum price seen so far as you scan left to right.',
      'Update maxProfit = Math.max(maxProfit, price - minPrice).',
    ],
    starterCode: `function maxProfit(prices: number[]): number {\n  // Your solution here\n  return 0;\n}`,
    language: 'typescript',
    expectedKeywords: ['min', 'profit', 'greedy', 'o(n)', 'o(1)'],
    followUpRules: [
      {
        keywords: ['min', 'profit', 'greedy'],
        question: 'What if prices are strictly decreasing? What should your function return?',
        focusArea: 'Boundary Handling',
      },
    ],
    defaultFollowUp: 'How would your approach change if you were allowed to complete at most two transactions?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.25, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'dsa-m1',
    trackId: 'dsa',
    difficulty: 'medium',
    title: 'Longest Substring Without Repeating Characters',
    prompt:
      'Given a string `s`, find the length of the longest substring without repeating characters.',
    hints: [
      'Use a sliding window with left and right pointers.',
      'Store the last seen index of each character in a Map to jump `left` forward.',
    ],
    starterCode: `function lengthOfLongestSubstring(s: string): number {\n  // Sliding window\n  return 0;\n}`,
    language: 'typescript',
    expectedKeywords: ['sliding window', 'set', 'map', 'pointer', 'o(n)'],
    followUpRules: [
      {
        keywords: ['sliding window', 'pointer', 'map'],
        question: 'Why do we take `Math.max(left, lastSeen + 1)` instead of directly setting `left = lastSeen + 1`?',
        focusArea: 'Window Invariant',
      },
    ],
    defaultFollowUp: 'Walk through your algorithm on `"abba"` to verify the left pointer never moves backward.',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.25, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'dsa-m2',
    trackId: 'dsa',
    difficulty: 'medium',
    title: 'Binary Tree Level Order Traversal',
    prompt:
      'Given the `root` of a binary tree, return the level order traversal of its nodes’ values (left to right, level by level).',
    hints: [
      'Use a queue for Breadth-First Search (BFS).',
      'Snapshot `queue.length` at the start of each level.',
    ],
    starterCode: `interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }\n\nfunction levelOrder(root: TreeNode | null): number[][] {\n  return [];\n}`,
    language: 'typescript',
    expectedKeywords: ['bfs', 'queue', 'level', 'null', 'o(n)'],
    followUpRules: [
      {
        keywords: ['queue', 'bfs'],
        question: 'Notice `Array.shift()` in JS is O(n). How would you keep BFS strictly O(n) total for large trees?',
        focusArea: 'Implementation Performance',
      },
    ],
    defaultFollowUp: 'Could you also solve this using DFS with a depth parameter? How do the space complexities compare?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.3, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'dsa-m3',
    trackId: 'dsa',
    difficulty: 'medium',
    title: 'Merge Overlapping Intervals',
    prompt:
      'Given an array of intervals `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals.',
    hints: [
      'Sort intervals by their start time first.',
      'Compare current interval start with the last merged interval’s end.',
    ],
    starterCode: `function mergeIntervals(intervals: [number, number][]): [number, number][] {\n  return [];\n}`,
    language: 'typescript',
    expectedKeywords: ['sort', 'start', 'end', 'overlap', 'o(n log n)'],
    followUpRules: [
      {
        keywords: ['sort'],
        question: 'What is the time complexity of sorting, and what if intervals are already sorted?',
        focusArea: 'Complexity Analysis',
      },
    ],
    defaultFollowUp: 'How do you handle touching intervals like `[1, 4]` and `[4, 5]`, or an empty input array?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.25, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'dsa-h1',
    trackId: 'dsa',
    difficulty: 'hard',
    title: 'LRU Cache Implementation',
    prompt:
      'Design a data structure that follows Least Recently Used (LRU) cache constraints with `get(key)` and `put(key, value)` both running in O(1) average time.',
    hints: [
      'Combine a hash map with a doubly linked list (or leverage JS `Map` insertion order).',
      'Evict the least recently used key when capacity is exceeded.',
    ],
    starterCode: `class LRUCache {\n  constructor(private capacity: number) {}\n  get(key: number): number { return -1; }\n  put(key: number, value: number): void {}\n}`,
    language: 'typescript',
    expectedKeywords: ['doubly linked list', 'map', 'o(1)', 'evict', 'capacity'],
    followUpRules: [
      {
        keywords: ['map', 'linked list'],
        question: 'Why does a singly linked list fail to achieve O(1) removal on `get`?',
        focusArea: 'Data Structure Tradeoffs',
      },
    ],
    defaultFollowUp: 'How would you make this thread-safe or adapt it to an LFU cache?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.35, communication: 0.15, edgeCases: 0.2 },
  },
  {
    id: 'dsa-h2',
    trackId: 'dsa',
    difficulty: 'hard',
    title: 'Course Schedule Topological Sort',
    prompt:
      'There are `numCourses` courses labeled `0` to `numCourses - 1` and prerequisites `[a, b]` meaning you must take `b` before `a`. Return `true` if you can finish all courses.',
    hints: [
      'Model courses as a directed graph and detect cycles.',
      'Use Kahn’s algorithm (in-degree + queue) or 3-color DFS.',
    ],
    starterCode: `function canFinish(numCourses: number, prerequisites: [number, number][]): boolean {\n  return true;\n}`,
    language: 'typescript',
    expectedKeywords: ['graph', 'cycle', 'topological', 'indegree', 'dfs'],
    followUpRules: [
      {
        keywords: ['indegree', 'kahn', 'bfs'],
        question: 'If a cycle exists, how does Kahn’s algorithm detect it at the end of the queue loop?',
        focusArea: 'Cycle Detection',
      },
    ],
    defaultFollowUp: 'What is the time and space complexity in terms of V (courses) and E (prerequisites)?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.3, communication: 0.15, edgeCases: 0.2 },
  },
  {
    id: 'dsa-h3',
    trackId: 'dsa',
    difficulty: 'hard',
    title: 'Trapping Rain Water',
    prompt:
      'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    hints: [
      'Water at index `i` is `min(maxLeft[i], maxRight[i]) - height[i]`.',
      'Two pointers can reduce extra space from O(n) to O(1).',
    ],
    starterCode: `function trap(height: number[]): number {\n  return 0;\n}`,
    language: 'typescript',
    expectedKeywords: ['two pointer', 'leftmax', 'rightmax', 'o(n)', 'o(1)'],
    followUpRules: [
      {
        keywords: ['two pointer', 'leftmax'],
        question: 'Why is it safe to advance the pointer with the smaller height without knowing the exact max on the other side?',
        focusArea: 'Proof of Correctness',
      },
    ],
    defaultFollowUp: 'Compare the O(n) prefix/suffix array solution against the O(1) space two-pointer approach.',
    rubricWeights: { problemSolving: 0.4, codeOrStructure: 0.25, communication: 0.15, edgeCases: 0.2 },
  },

  // ==================== FRONTEND (9 questions: 3 easy, 3 medium, 3 hard) ====================
  {
    id: 'fe-e1',
    trackId: 'frontend',
    difficulty: 'easy',
    title: 'Implement a Debounce Utility',
    prompt:
      'Write a `debounce(fn, delay)` function in TypeScript/JavaScript that delays invoking `fn` until `delay` milliseconds have elapsed since the last time it was called.',
    hints: [
      'Store a timer ID in a closure and call `clearTimeout` on every invocation.',
      'Preserve `this` context and arguments if needed.',
    ],
    starterCode: `function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {\n  // Return debounced function\n}`,
    language: 'typescript',
    expectedKeywords: ['cleartimeout', 'settimeout', 'closure', 'timer', 'args'],
    followUpRules: [
      {
        keywords: ['cleartimeout', 'settimeout'],
        question: 'How would you add a `.cancel()` method or a `leading: true` option to this debounce utility?',
        focusArea: 'API Ergonomics',
      },
    ],
    defaultFollowUp: 'How does `debounce` differ from `throttle`, and when would you pick each in a React search bar?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.35, communication: 0.15, edgeCases: 0.2 },
  },
  {
    id: 'fe-e2',
    trackId: 'frontend',
    difficulty: 'easy',
    title: 'React Keys & Reconciliation',
    prompt:
      'Explain why using array indices as `key` in a dynamic React list can cause bugs, and describe when index keys are acceptable.',
    hints: [
      'Think about stateful child components (inputs, animations) when items are inserted or reordered.',
      'React uses `key` to match fiber nodes across renders.',
    ],
    expectedKeywords: ['reconciliation', 'fiber', 'state', 'reorder', 'unique'],
    followUpRules: [
      {
        keywords: ['state', 'reorder', 'insert'],
        question: 'Can you give a concrete example where an `<input>` inside a list loses or swaps its typed value due to index keys?',
        focusArea: 'Concrete Bug Scenario',
      },
    ],
    defaultFollowUp: 'What happens if two sibling elements accidentally share the same `key`?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.2, communication: 0.35, edgeCases: 0.2 },
  },
  {
    id: 'fe-e3',
    trackId: 'frontend',
    difficulty: 'easy',
    title: 'Event Delegation & Bubbling',
    prompt:
      'Explain how event bubbling and event delegation work in the DOM, and write a short snippet attaching a single click listener to a `<ul>` to handle `<li>` clicks.',
    hints: [
      'Use `event.target.closest("li")` to safely handle nested elements inside `<li>`.',
    ],
    starterCode: `function attachListHandler(ul: HTMLUListElement, onSelect: (id: string) => void) {\n  // Event delegation\n}`,
    language: 'javascript',
    expectedKeywords: ['bubbling', 'target', 'closest', 'memory', 'listener'],
    followUpRules: [
      {
        keywords: ['target', 'closest'],
        question: 'Why is `event.target.closest("li")` safer than checking `event.target.tagName === "LI"`?',
        focusArea: 'Nested DOM Elements',
      },
    ],
    defaultFollowUp: 'Which DOM events do not bubble, and how does `stopPropagation()` affect delegation?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.3, communication: 0.25, edgeCases: 0.2 },
  },
  {
    id: 'fe-m1',
    trackId: 'frontend',
    difficulty: 'medium',
    title: 'Custom `useDebounce` & Race-Safe Fetch Hook',
    prompt:
      'Design a React hook `useSearchResults(query)` that debounces the query and prevents stale network responses from overwriting newer results.',
    hints: [
      'Use `AbortController` or a `cancelled` boolean flag inside `useEffect` cleanup.',
      'Handle loading and error states cleanly.',
    ],
    starterCode: `import { useEffect, useState } from 'react';\n\nexport function useSearchResults(query: string) {\n  // Implement debounced + race-safe fetch\n}`,
    language: 'typescript',
    expectedKeywords: ['abortcontroller', 'cleanup', 'useeffect', 'race', 'debounce'],
    followUpRules: [
      {
        keywords: ['abortcontroller', 'cleanup'],
        question: 'What happens if the component unmounts while a request is in flight? How does `AbortController` help?',
        focusArea: 'Lifecycle & Cleanup',
      },
    ],
    defaultFollowUp: 'How would you avoid firing an API call when `query` is empty or whitespace-only?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.3, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'fe-m2',
    trackId: 'frontend',
    difficulty: 'medium',
    title: 'Promise.all vs Promise.allSettled Polyfill',
    prompt:
      'Implement `promiseAll(promises)` from scratch without using `Promise.all`, preserving input order and rejecting immediately on the first rejection.',
    hints: [
      'Track a `completedCount` and store results by index `results[i] = val`.',
      'Handle an empty input array by resolving immediately with `[]`.',
    ],
    starterCode: `function promiseAll<T>(promises: Array<Promise<T> | T>): Promise<T[]> {\n  return new Promise((resolve, reject) => {\n    // Your implementation\n  });\n}`,
    language: 'typescript',
    expectedKeywords: ['index', 'count', 'resolve', 'reject', 'empty'],
    followUpRules: [
      {
        keywords: ['promise.resolve', 'non-promise'],
        question: 'Why should we wrap each item with `Promise.resolve(item)` before calling `.then`?',
        focusArea: 'Mixed Values',
      },
    ],
    defaultFollowUp: 'How would you modify your implementation to behave like `Promise.allSettled` instead?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.35, communication: 0.15, edgeCases: 0.2 },
  },
  {
    id: 'fe-m3',
    trackId: 'frontend',
    difficulty: 'medium',
    title: 'Accessible Modal Dialog & Focus Trap',
    prompt:
      'What ARIA attributes, keyboard interactions, and focus management rules are required to make a custom React modal dialog accessible?',
    hints: [
      'Consider `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, Escape key, focus trap, and restoring focus on close.',
    ],
    expectedKeywords: ['aria-modal', 'focus', 'escape', 'tab', 'restore'],
    followUpRules: [
      {
        keywords: ['focus', 'tab'],
        question: 'How do you implement a keyboard focus trap for `Tab` and `Shift+Tab` inside the modal?',
        focusArea: 'Keyboard Navigation',
      },
    ],
    defaultFollowUp: 'Why should you restore focus to the trigger button when the modal closes?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.25, communication: 0.3, edgeCases: 0.2 },
  },
  {
    id: 'fe-h1',
    trackId: 'frontend',
    difficulty: 'hard',
    title: 'Deep Clone with Circular References',
    prompt:
      'Write a `deepClone(value)` function that handles nested objects, arrays, Dates, RegExps, and circular references without causing a stack overflow.',
    hints: [
      'Pass a `WeakMap` (`seen`) to map original objects to their cloned references.',
    ],
    starterCode: `function deepClone<T>(value: T, seen = new WeakMap()): T {\n  // Handle primitives, circular refs, arrays, objects\n  return value;\n}`,
    language: 'typescript',
    expectedKeywords: ['weakmap', 'circular', 'date', 'array', 'recursive'],
    followUpRules: [
      {
        keywords: ['weakmap'],
        question: 'Why is `WeakMap` preferred over `Map` for tracking visited objects during cloning?',
        focusArea: 'Memory Management',
      },
    ],
    defaultFollowUp: 'How does `structuredClone()` compare to a custom recursive `deepClone`, and what types does `structuredClone` reject?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.3, communication: 0.15, edgeCases: 0.2 },
  },
  {
    id: 'fe-h2',
    trackId: 'frontend',
    difficulty: 'hard',
    title: 'Diagnose & Fix React Render Bottlenecks',
    prompt:
      'A dashboard with a 2,000-row table and a live search input lags on every keystroke. Walk through your profiling workflow and optimization strategy.',
    hints: [
      'Mention React DevTools Profiler, virtualization (`react-window`), `useDeferredValue`, memoization, and state colocation.',
    ],
    expectedKeywords: ['profiler', 'virtualization', 'memo', 'usedeferredvalue', 'colocation'],
    followUpRules: [
      {
        keywords: ['memo', 'usememo', 'usecallback'],
        question: 'When can `React.memo` actually hurt performance or fail to prevent re-renders?',
        focusArea: 'Memoization Pitfalls',
      },
    ],
    defaultFollowUp: 'Why does moving the search input state into a smaller child component often beat wrapping everything in `React.memo`?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.25, communication: 0.25, edgeCases: 0.2 },
  },
  {
    id: 'fe-h3',
    trackId: 'frontend',
    difficulty: 'hard',
    title: 'Browser Event Loop: Microtasks vs Macrotasks',
    prompt:
      'Explain the execution order of synchronous code, `Promise.then` microtasks, `setTimeout` macrotasks, and `requestAnimationFrame` in a browser frame.',
    hints: [
      'All microtasks drain completely after each macrotask before the browser paints or runs the next macrotask.',
    ],
    expectedKeywords: ['microtask', 'macrotask', 'call stack', 'render', 'queue'],
    followUpRules: [
      {
        keywords: ['microtask', 'starvation', 'infinite'],
        question: 'What happens to UI rendering if a microtask recursively schedules another microtask?',
        focusArea: 'Event Loop Starvation',
      },
    ],
    defaultFollowUp: 'Where does `queueMicrotask` fit relative to `Promise.resolve().then(...)`?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.2, communication: 0.3, edgeCases: 0.2 },
  },

  // ==================== BEHAVIORAL (9 questions: 3 easy, 3 medium, 3 hard) ====================
  {
    id: 'beh-e1',
    trackId: 'behavioral',
    difficulty: 'easy',
    title: 'Tell Me About a Project You Are Proud Of',
    prompt:
      'Walk me through a technical project you built recently. What problem did it solve, what was your specific role, and what did you learn?',
    hints: [
      'Use STAR: Situation, Task, Action, Result.',
      'Quantify the outcome (load time, users, test coverage) even for personal or academic projects.',
    ],
    expectedKeywords: ['situation', 'action', 'result', 'metric', 'tradeoff'],
    followUpRules: [
      {
        keywords: ['react', 'frontend', 'api'],
        question: 'What was the hardest technical tradeoff you made in that project, and what would you do differently today?',
        focusArea: 'Technical Reflection',
      },
    ],
    defaultFollowUp: 'If you had two more weeks on that project, what single improvement would have the highest user impact?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.25, communication: 0.35, edgeCases: 0.15 },
  },
  {
    id: 'beh-e2',
    trackId: 'behavioral',
    difficulty: 'easy',
    title: 'Learning a New Technology Under Time Pressure',
    prompt:
      'Describe a time you had to ramp up quickly on an unfamiliar tool, framework, or codebase to meet a deadline.',
    hints: [
      'Highlight your learning strategy (docs, small prototypes, asking targeted questions).',
    ],
    expectedKeywords: ['deadline', 'learn', 'prototype', 'docs', 'delivered'],
    followUpRules: [
      {
        keywords: ['mentor', 'teammate', 'asked'],
        question: 'How did you balance figuring things out independently versus asking teammates for help?',
        focusArea: 'Collaboration & Autonomy',
      },
    ],
    defaultFollowUp: 'How did you verify that your solution was reliable despite the tight timeline?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.2, communication: 0.4, edgeCases: 0.15 },
  },
  {
    id: 'beh-e3',
    trackId: 'behavioral',
    difficulty: 'easy',
    title: 'Handling Constructive Code Review Feedback',
    prompt:
      'Tell me about a time you received critical feedback on your code or design. How did you respond?',
    hints: [
      'Show openness, curiosity, and how you turned feedback into concrete improvement.',
    ],
    expectedKeywords: ['feedback', 'review', 'improved', 'listen', 'refactor'],
    followUpRules: [
      {
        keywords: ['disagree', 'discuss'],
        question: 'What if you believe the reviewer’s suggestion introduces a performance or UX regression?',
        focusArea: 'Respectful Pushback',
      },
    ],
    defaultFollowUp: 'What habit did you adopt afterward to catch similar issues before opening a PR?',
    rubricWeights: { problemSolving: 0.2, codeOrStructure: 0.2, communication: 0.45, edgeCases: 0.15 },
  },
  {
    id: 'beh-m1',
    trackId: 'behavioral',
    difficulty: 'medium',
    title: 'Resolving a Technical Disagreement',
    prompt:
      'Tell me about a time you disagreed with a teammate or designer on an implementation approach. How did you reach alignment?',
    hints: [
      'Focus on data, user impact, and prototyping rather than winning an argument.',
    ],
    expectedKeywords: ['disagreement', 'data', 'tradeoff', 'compromise', 'aligned'],
    followUpRules: [
      {
        keywords: ['prototype', 'benchmark', 'data'],
        question: 'How did you ensure the other person felt heard once the decision went one way?',
        focusArea: 'Empathy & Alignment',
      },
    ],
    defaultFollowUp: 'Looking back, was the final decision the right one? Why or why not?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.2, communication: 0.4, edgeCases: 0.15 },
  },
  {
    id: 'beh-m2',
    trackId: 'behavioral',
    difficulty: 'medium',
    title: 'Debugging a Tricky Production or Demo Bug',
    prompt:
      'Describe a tough bug that was hard to reproduce. How did you isolate the root cause and prevent it from happening again?',
    hints: [
      'Walk through hypothesis -> isolate -> fix -> regression test.',
    ],
    expectedKeywords: ['reproduce', 'root cause', 'logs', 'test', 'prevent'],
    followUpRules: [
      {
        keywords: ['test', 'monitor', 'alert'],
        question: 'What automated check or monitoring did you add so this class of bug wouldn’t silently recur?',
        focusArea: 'Systemic Prevention',
      },
    ],
    defaultFollowUp: 'How did you communicate status to stakeholders while investigating?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.2, communication: 0.3, edgeCases: 0.15 },
  },
  {
    id: 'beh-m3',
    trackId: 'behavioral',
    difficulty: 'medium',
    title: 'Balancing Quality vs Shipping Speed',
    prompt:
      'Tell me about a time you had to ship under a tight deadline and consciously scoped down or deferred technical work.',
    hints: [
      'Explain what you cut, what you refused to compromise on (e.g., data integrity/a11y), and how you paid down tech debt.',
    ],
    expectedKeywords: ['scope', 'deadline', 'debt', 'priority', 'shipped'],
    followUpRules: [
      {
        keywords: ['debt', 'follow-up'],
        question: 'Did you actually go back and pay down that technical debt? How did you get it prioritized?',
        focusArea: 'Follow-through',
      },
    ],
    defaultFollowUp: 'Which quality bar do you consider non-negotiable even under crunch?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.2, communication: 0.35, edgeCases: 0.15 },
  },
  {
    id: 'beh-h1',
    trackId: 'behavioral',
    difficulty: 'hard',
    title: 'Owning a Mistake or Outage',
    prompt:
      'Tell me about a time you made a mistake that impacted your team or users. How did you handle it and what changed afterward?',
    hints: [
      'Take direct ownership without blaming others; emphasize blameless postmortem and concrete guardrails.',
    ],
    expectedKeywords: ['ownership', 'mistake', 'impact', 'postmortem', 'guardrail'],
    followUpRules: [
      {
        keywords: ['ownership', 'apologized', 'fixed'],
        question: 'How did you rebuild trust with the team or stakeholder after the incident?',
        focusArea: 'Trust & Accountability',
      },
    ],
    defaultFollowUp: 'What process or tooling guardrail did you introduce as a result?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.2, communication: 0.4, edgeCases: 0.15 },
  },
  {
    id: 'beh-h2',
    trackId: 'behavioral',
    difficulty: 'hard',
    title: 'Driving Alignment Across Ambiguous Requirements',
    prompt:
      'Describe a time you were handed a vague or ambiguous problem with unclear requirements. How did you turn it into a concrete deliverable?',
    hints: [
      'Show how you wrote a short spec, clarified success metrics, and iterated with stakeholders.',
    ],
    expectedKeywords: ['ambiguous', 'clarified', 'spec', 'stakeholder', 'milestone'],
    followUpRules: [
      {
        keywords: ['spec', 'metrics'],
        question: 'How did you decide what was out of scope before writing code?',
        focusArea: 'Scoping & Clarity',
      },
    ],
    defaultFollowUp: 'What was the biggest assumption you validated early, and how?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.2, communication: 0.35, edgeCases: 0.15 },
  },
  {
    id: 'beh-h3',
    trackId: 'behavioral',
    difficulty: 'hard',
    title: 'Influencing Without Authority',
    prompt:
      'Tell me about a time you convinced a team or senior engineer to adopt a better practice or architecture without having formal authority.',
    hints: [
      'Mention empathy, small proof-of-concept, measurable wins, and incremental adoption.',
    ],
    expectedKeywords: ['influence', 'poc', 'adoption', 'metrics', 'buy-in'],
    followUpRules: [
      {
        keywords: ['poc', 'demo'],
        question: 'How did you address resistance from teammates who were worried about migration cost?',
        focusArea: 'Change Management',
      },
    ],
    defaultFollowUp: 'What made your proposal easy for others to say yes to?',
    rubricWeights: { problemSolving: 0.25, codeOrStructure: 0.2, communication: 0.4, edgeCases: 0.15 },
  },

  // ==================== SYSTEM DESIGN (9 questions: 3 easy, 3 medium, 3 hard) ====================
  {
    id: 'sd-e1',
    trackId: 'system-design',
    difficulty: 'easy',
    title: 'Design a Reusable Toast & Notification System',
    prompt:
      'Design a client-side toast/notification system for a web app supporting stacking, auto-dismiss, manual close, and accessibility.',
    hints: [
      'Consider a pub/sub store or React Context, portal rendering, `aria-live="polite"`, and timer pause on hover.',
    ],
    expectedKeywords: ['portal', 'queue', 'aria-live', 'timer', 'context'],
    followUpRules: [
      {
        keywords: ['aria-live', 'accessibility'],
        question: 'When would you use `aria-live="assertive"` vs `aria-live="polite"` for notifications?',
        focusArea: 'Accessibility',
      },
    ],
    defaultFollowUp: 'How would you prevent 20 identical error toasts from flooding the screen if an API goes down?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.3, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'sd-e2',
    trackId: 'system-design',
    difficulty: 'easy',
    title: 'Design a Pagination vs Infinite Scroll Feed',
    prompt:
      'Compare cursor-based pagination, offset pagination, and infinite scroll for a social feed. Which would you pick and how do you structure the client state?',
    hints: [
      'Cursor pagination avoids duplicate/skipped items when new posts arrive.',
      'Consider URL shareability and footer accessibility.',
    ],
    expectedKeywords: ['cursor', 'offset', 'intersectionobserver', 'cache', 'dedupe'],
    followUpRules: [
      {
        keywords: ['cursor'],
        question: 'Why does offset pagination break when new items are inserted at the top of the feed?',
        focusArea: 'Data Consistency',
      },
    ],
    defaultFollowUp: 'How do you preserve scroll position when the user clicks an item and presses the browser Back button?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.25, communication: 0.25, edgeCases: 0.2 },
  },
  {
    id: 'sd-e3',
    trackId: 'system-design',
    difficulty: 'easy',
    title: 'Design a URL Shortener Service',
    prompt:
      'Design a URL shortener like bit.ly. Cover API endpoints, short-code generation, storage schema, and read/write scaling.',
    hints: [
      'Base62 encoding of a unique ID or hash + collision check; 301 vs 302 redirects; Redis cache for hot URLs.',
    ],
    expectedKeywords: ['base62', 'cache', 'redis', 'redirect', 'collision'],
    followUpRules: [
      {
        keywords: ['301', '302', 'redirect'],
        question: 'What is the difference between 301 and 302 redirects if you need accurate click analytics?',
        focusArea: 'HTTP Semantics',
      },
    ],
    defaultFollowUp: 'How would you handle custom aliases and link expiration?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.25, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'sd-m1',
    trackId: 'system-design',
    difficulty: 'medium',
    title: 'Design an Autocomplete / Typeahead Widget',
    prompt:
      'Design a search autocomplete widget with sub-100ms perceived latency, keyboard navigation, request cancellation, and client caching.',
    hints: [
      'Debounce input, cache prefix results in a client LRU/Map, cancel stale fetches with `AbortController`, and support ArrowUp/Down + Enter.',
    ],
    expectedKeywords: ['debounce', 'cache', 'abortcontroller', 'keyboard', 'trie'],
    followUpRules: [
      {
        keywords: ['cache', 'prefix'],
        question: 'If `"rea"` returned 0 results, how can your client cache avoid making a request for `"reac"`?',
        focusArea: 'Negative Caching',
      },
    ],
    defaultFollowUp: 'How do you highlight matched substrings safely without XSS risk?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.3, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'sd-m2',
    trackId: 'system-design',
    difficulty: 'medium',
    title: 'Design a Client-Side State & Caching Layer',
    prompt:
      'Design a React data-fetching and caching library (like a lightweight React Query) supporting stale-while-revalidate, deduplication, and mutations.',
    hints: [
      'Key queries deterministically, share in-flight promises for identical keys, and invalidate/optimistically update on mutation.',
    ],
    expectedKeywords: ['stale-while-revalidate', 'deduplication', 'invalidation', 'optimistic', 'cache'],
    followUpRules: [
      {
        keywords: ['optimistic'],
        question: 'How do you roll back an optimistic UI update if the server mutation fails?',
        focusArea: 'Error Recovery',
      },
    ],
    defaultFollowUp: 'How would you garbage-collect unused cache entries when components unmount?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.3, communication: 0.15, edgeCases: 0.2 },
  },
  {
    id: 'sd-m3',
    trackId: 'system-design',
    difficulty: 'medium',
    title: 'Design a Real-Time Chat Application',
    prompt:
      'Design a real-time 1:1 and group chat web app. Cover transport (WebSockets vs SSE), message ordering, offline queue, and unread counts.',
    hints: [
      'Use WebSockets with heartbeat/reconnect backoff, client-generated temporary IDs for optimistic sends, and sequence numbers for ordering.',
    ],
    expectedKeywords: ['websocket', 'reconnect', 'optimistic', 'ordering', 'offline'],
    followUpRules: [
      {
        keywords: ['websocket', 'reconnect'],
        question: 'When a client reconnects after 2 minutes offline, how do you sync missed messages without duplicates?',
        focusArea: 'Sync & Idempotency',
      },
    ],
    defaultFollowUp: 'How would you handle typing indicators without overwhelming the server?',
    rubricWeights: { problemSolving: 0.3, codeOrStructure: 0.25, communication: 0.25, edgeCases: 0.2 },
  },
  {
    id: 'sd-h1',
    trackId: 'system-design',
    difficulty: 'hard',
    title: 'Design a Collaborative Rich-Text Editor',
    prompt:
      'Design a Google Docs-style collaborative editor supporting concurrent edits, cursor presence, undo/redo, and offline conflict resolution.',
    hints: [
      'Compare OT (Operational Transformation) vs CRDTs, WebSocket presence channels, and snapshot + delta persistence.',
    ],
    expectedKeywords: ['crdt', 'ot', 'websocket', 'presence', 'conflict'],
    followUpRules: [
      {
        keywords: ['crdt', 'ot'],
        question: 'Why do CRDTs work better for peer-to-peer or offline-first editing compared to central-server OT?',
        focusArea: 'Concurrency Models',
      },
    ],
    defaultFollowUp: 'How do you keep undo/redo local to each user rather than undoing another user’s edit?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.25, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'sd-h2',
    trackId: 'system-design',
    difficulty: 'hard',
    title: 'Design a Multi-Tenant Analytics Dashboard',
    prompt:
      'Design a high-throughput analytics portal rendering interactive charts over millions of events with sub-second filter updates.',
    hints: [
      'Pre-aggregated rollups, materialized views, CDN/edge caching, progressive loading, and Web Workers for client transforms.',
    ],
    expectedKeywords: ['aggregation', 'cache', 'worker', 'streaming', 'partition'],
    followUpRules: [
      {
        keywords: ['worker', 'canvas', 'svg'],
        question: 'At what data point count do you switch from SVG charts to Canvas/WebGL, and why?',
        focusArea: 'Rendering Scalability',
      },
    ],
    defaultFollowUp: 'How do you prevent noisy-neighbor queries from degrading other tenants?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.25, communication: 0.2, edgeCases: 0.2 },
  },
  {
    id: 'sd-h3',
    trackId: 'system-design',
    difficulty: 'hard',
    title: 'Design an In-Browser Code Execution & Grading Sandbox',
    prompt:
      'Design a safe client + server architecture for running user-submitted JavaScript/TypeScript interview code with timeouts and test assertions.',
    hints: [
      'Isolate untrusted code in a sandboxed iframe/Web Worker (or server container), enforce execution timeouts, and prevent network/DOM access.',
    ],
    expectedKeywords: ['sandbox', 'worker', 'iframe', 'timeout', 'csp'],
    followUpRules: [
      {
        keywords: ['worker', 'timeout'],
        question: 'If user code has an infinite `while (true) {}` loop, how do you terminate it without freezing the main UI thread?',
        focusArea: 'Isolation & Termination',
      },
    ],
    defaultFollowUp: 'What security risks remain if you run untrusted code in a Web Worker on the same origin?',
    rubricWeights: { problemSolving: 0.35, codeOrStructure: 0.3, communication: 0.15, edgeCases: 0.2 },
  },
];

