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
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists; aim for O(n) time.',
    ],
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
    examples: [
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "([)]"',
        output: 'false',
        explanation: 'Brackets are closed out of order.',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: ()[]{}',
      'O(n) time and O(n) worst-case stack space.',
    ],
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
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.',
      },
      {
        input: 'prices = [7, 6, 4, 3, 1]',
        output: '0',
        explanation: 'No profitable transaction is possible.',
      },
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4',
      'Solve in O(n) time and O(1) extra space.',
    ],
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
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces',
      'Aim for O(n) sliding-window time complexity.',
    ],
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
    examples: [
      {
        input: 'root = [3, 9, 20, null, null, 15, 7]',
        output: '[[3], [9, 20], [15, 7]]',
      },
      {
        input: 'root = []',
        output: '[]',
        explanation: 'An empty tree produces an empty array.',
      },
    ],
    constraints: [
      'Number of nodes is in the range [0, 2000]',
      '-1000 <= Node.val <= 1000',
      'Return values grouped by depth from root to leaves.',
    ],
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
    examples: [
      {
        input: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]',
        output: '[[1, 6], [8, 10], [15, 18]]',
        explanation: 'Intervals [1, 3] and [2, 6] overlap and merge into [1, 6].',
      },
      {
        input: 'intervals = [[1, 4], [4, 5]]',
        output: '[[1, 5]]',
        explanation: 'Touching intervals [1, 4] and [4, 5] are considered overlapping.',
      },
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2; 0 <= start_i <= end_i <= 10^4',
      'Input is not guaranteed to be sorted.',
    ],
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
    examples: [
      {
        input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); get(2)',
        output: '1, -1',
        explanation: 'Key 2 is evicted when key 3 is inserted because key 1 was recently accessed.',
      },
      {
        input: 'LRUCache(1); put(1, 10); put(1, 20); get(1)',
        output: '20',
        explanation: 'Updating an existing key refreshes its recency without eviction.',
      },
    ],
    constraints: [
      '1 <= capacity <= 3000',
      'get and put must both run in O(1) average time complexity',
      'Up to 2 * 10^5 calls to get and put.',
    ],
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
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1, 0]]',
        output: 'true',
        explanation: 'Take course 0 first, then course 1.',
      },
      {
        input: 'numCourses = 2, prerequisites = [[1, 0], [0, 1]]',
        output: 'false',
        explanation: 'Cycle between course 0 and course 1 makes completion impossible.',
      },
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'All pairs [a, b] are unique.',
    ],
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
    examples: [
      {
        input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
        output: '6',
        explanation: '6 units of rain water are trapped between the bars.',
      },
      {
        input: 'height = [4, 2, 0, 3, 2, 5]',
        output: '9',
      },
    ],
    constraints: [
      'n == height.length; 1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5',
      'Aim for O(n) time and O(1) extra space using two pointers.',
    ],
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
    examples: [
      {
        input: 'debouncedSearch("r"), debouncedSearch("re"), debouncedSearch("react") within 100ms (delay = 300ms)',
        output: 'fn("react") called once after 300ms',
        explanation: 'Earlier calls are cancelled by clearTimeout.',
      },
      {
        input: 'debouncedSearch("a") then 400ms later debouncedSearch("b") (delay = 300ms)',
        output: 'fn("a") called at 300ms, fn("b") called at 700ms',
      },
    ],
    constraints: [
      'Must preserve argument types and `this` binding',
      'Clear previous timer before scheduling a new one',
      'Zero external dependencies.',
    ],
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
    examples: [
      {
        input: 'List with <input /> items keyed by index; prepend a new item at index 0',
        output: 'Existing typed input value stays attached to index 0 instead of shifting with its item',
        explanation: 'React matches fiber nodes by key, reusing the wrong DOM/state instance.',
      },
      {
        input: 'Static, non-reordered list of read-only badges',
        output: 'Index keys are safe when items never reorder, insert, or hold local state',
      },
    ],
    constraints: [
      'Explain React fiber key matching during reconciliation',
      'Give a concrete stateful DOM/component bug example',
      'State when index keys are acceptable.',
    ],
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
    examples: [
      {
        input: 'User clicks a <span> nested inside <li data-id="42">',
        output: 'onSelect("42") is invoked via event.target.closest("li")',
        explanation: 'Handles nested child elements cleanly without per-row listeners.',
      },
      {
        input: 'User clicks padding directly on <ul> outside any <li>',
        output: 'closest("li") returns null or outside ul; onSelect is not called',
      },
    ],
    constraints: [
      'Attach only one event listener to the parent <ul>',
      'Safely handle nested elements inside <li>',
      'Verify the matched <li> belongs to the target <ul>.',
    ],
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
    examples: [
      {
        input: 'User types "re" (slow 800ms response) then "react" (fast 120ms response)',
        output: 'Only "react" results render; "re" request is aborted via AbortController',
        explanation: 'Effect cleanup aborts the previous in-flight fetch.',
      },
      {
        input: 'query = "" (empty string)',
        output: 'Resets results to [] without firing a network request',
      },
    ],
    constraints: [
      'Cancel stale requests on query change or unmount',
      'Ignore AbortError in catch block so it does not trigger error UI',
      'Return { results, loading, error } cleanly typed.',
    ],
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
    examples: [
      {
        input: '[Promise.resolve(1), 2, new Promise(r => setTimeout(() => r(3), 50))]',
        output: 'Resolves to [1, 2, 3]',
        explanation: 'Non-promise values are wrapped with Promise.resolve; order matches input.',
      },
      {
        input: '[Promise.resolve(1), Promise.reject("err"), Promise.resolve(3)]',
        output: 'Rejects immediately with "err"',
      },
    ],
    constraints: [
      'Handle empty array [] by resolving immediately with []',
      'Support mixed Promise<T> and synchronous values T',
      'Do not use built-in Promise.all.',
    ],
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
    examples: [
      {
        input: 'User presses Tab on the last focusable button inside the modal',
        output: 'Focus wraps back to the first focusable element inside the modal',
      },
      {
        input: 'User presses Escape or clicks Close',
        output: 'Modal closes and focus returns to the trigger button that opened it',
      },
    ],
    constraints: [
      'Include role="dialog", aria-modal="true", and aria-labelledby',
      'Trap Tab / Shift+Tab inside the dialog',
      'Prevent background scroll and restore focus on close.',
    ],
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
    examples: [
      {
        input: 'const a: any = { x: 1 }; a.self = a; deepClone(a)',
        output: 'Cloned object where clone !== a and clone.self === clone',
        explanation: 'WeakMap caches original -> clone reference to break cycles.',
      },
      {
        input: '{ created: new Date(0), pattern: /abc/gi, tags: ["ts"] }',
        output: 'Deep copy with distinct Date, RegExp, and Array instances',
      },
    ],
    constraints: [
      'Must handle circular object/array references',
      'Preserve Date and RegExp instances',
      'Avoid infinite recursion or mutating the original object.',
    ],
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
    examples: [
      {
        input: 'Typing "ana" in top-level search state re-renders all 2,000 rows synchronously',
        output: 'Colocate search state, virtualize rows, and wrap filter in useDeferredValue',
        explanation: 'Keeps input responsiveness under 16ms per keystroke.',
      },
      {
        input: 'React DevTools Profiler shows inline object/callback props breaking memo',
        output: 'Stabilize props or render only ~20 visible rows via windowing',
      },
    ],
    constraints: [
      'Measure first with React DevTools Profiler before optimizing',
      'Address both DOM node count (virtualization) and JS render work',
      'Explain when React.memo helps vs hurts.',
    ],
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
    examples: [
      {
        input: 'console.log("1"); setTimeout(() => log("2"), 0); Promise.resolve().then(() => log("3")); log("4");',
        output: 'Logs: 1, 4, 3, 2',
        explanation: 'Sync code runs first, then all microtasks drain before the next macrotask.',
      },
      {
        input: 'Recursive Promise.resolve().then(loop) inside a click handler',
        output: 'Microtask queue never empties, starving browser paint and macrotasks',
      },
    ],
    constraints: [
      'Distinguish call stack, microtask queue, macrotask queue, and render phase',
      'Explain requestAnimationFrame timing relative to paint',
      'Mention microtask starvation risk.',
    ],
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
    examples: [
      {
        input: 'Situation & Task (25s)',
        output: 'Built an accessible analytics portal for 400+ students with slow initial load times',
      },
      {
        input: 'Action & Result (90s)',
        output: 'Code-split routes and memoized charts, cutting LCP from 3.4s to 1.2s',
      },
    ],
    constraints: [
      'Structure clearly using STAR (Situation, Task, Action, Result)',
      'Highlight your individual technical contributions',
      'Quantify the outcome or user impact.',
    ],
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
    examples: [
      {
        input: 'Unfamiliar stack + 5-day hackathon/sprint deadline',
        output: 'Read official docs, built a 1-hour vertical slice prototype, and shipped on time',
      },
      {
        input: 'Verification step',
        output: 'Wrote unit tests around edge cases to compensate for unfamiliarity',
      },
    ],
    constraints: [
      'Show a repeatable learning strategy (docs, prototype, targeted questions)',
      'Explain how you verified correctness under time pressure',
      'Keep delivery concise (2–3 minutes).',
    ],
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
    examples: [
      {
        input: 'Reviewer flagged duplicated state logic and missing error handling in a PR',
        output: 'Asked clarifying questions, extracted a shared hook, and added error tests',
      },
      {
        input: 'Long-term habit',
        output: 'Created a personal pre-PR checklist to catch similar issues early',
      },
    ],
    constraints: [
      'Demonstrate openness without defensiveness',
      'Explain the concrete refactor or improvement made',
      'Share what you learned for future PRs.',
    ],
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
    examples: [
      {
        input: 'Disagreement over custom animation vs accessible native pattern',
        output: 'Built a quick prototype comparing bundle size, 60fps perf, and keyboard a11y',
      },
      {
        input: 'Alignment outcome',
        output: 'Team adopted hybrid solution keeping both visual polish and accessibility',
      },
    ],
    constraints: [
      'Anchor discussion on user impact, data, or benchmarks—not ego',
      'Show empathy for the other person’s constraints',
      'State the final decision and outcome.',
    ],
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
    examples: [
      {
        input: 'Intermittent stale UI state only on slow 3G connections',
        output: 'Reproduced via Network throttling, traced race condition, added AbortController',
      },
      {
        input: 'Prevention',
        output: 'Added integration test simulating delayed responses',
      },
    ],
    constraints: [
      'Walk through hypothesis -> isolate -> fix -> regression test',
      'Mention tools used (DevTools, logs, network throttling)',
      'Explain systemic prevention.',
    ],
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
    examples: [
      {
        input: '48-hour release window for a core user workflow',
        output: 'Shipped core accessible flow; deferred secondary export feature to Sprint+1',
      },
      {
        input: 'Tech debt follow-through',
        output: 'Logged tracked ticket and completed cleanup the following week',
      },
    ],
    constraints: [
      'Clarify what was non-negotiable (correctness, security, a11y)',
      'Explain how scope cuts were communicated to stakeholders',
      'Show follow-through on deferred debt.',
    ],
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
    examples: [
      {
        input: 'Deployed a config change that broke login redirects for 15 minutes',
        output: 'Rolled back immediately, notified team, and wrote a blameless postmortem',
      },
      {
        input: 'Guardrail added',
        output: 'Added CI smoke test covering auth redirect paths before merge',
      },
    ],
    constraints: [
      'Take direct ownership without blaming teammates',
      'Focus on mitigation speed and transparent communication',
      'Describe concrete tooling/process guardrails added.',
    ],
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
    examples: [
      {
        input: 'Request: "Make the onboarding dashboard feel faster and clearer"',
        output: 'Audited drop-off metrics, wrote a 1-page spec with 3 milestones, aligned PM/Design',
      },
      {
        input: 'Result',
        output: 'Onboarding completion improved by 22% in the first two weeks',
      },
    ],
    constraints: [
      'Show how you defined success criteria and non-goals',
      'Highlight early stakeholder validation',
      'Demonstrate iterative delivery.',
    ],
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
    examples: [
      {
        input: 'Proposed TypeScript strict mode & shared UI tokens across 3 feature squads',
        output: 'Built a small POC on 1 module showing 40% fewer runtime prop bugs',
      },
      {
        input: 'Adoption',
        output: 'Squads opted in incrementally over 2 sprints with zero blocked releases',
      },
    ],
    constraints: [
      'Address migration cost and team concerns empathetically',
      'Use a low-risk proof-of-concept and measurable wins',
      'Show incremental adoption.',
    ],
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
    examples: [
      {
        input: 'toast.success("Saved!") called from any deeply nested component',
        output: 'Portal renders stacked toast at top-right, auto-dismisses after 4s, pauses on hover',
      },
      {
        input: '20 identical network-error toasts triggered in 1 second',
        output: 'Deduplicated by toast ID or capped to max 3 visible toasts',
      },
    ],
    constraints: [
      'Support imperative API (toast.success / toast.error) outside React tree',
      'Accessible announcements via aria-live="polite" / "assertive"',
      'Clean timer cleanup on manual dismiss or unmount.',
    ],
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
    examples: [
      {
        input: 'New post arrives while user scrolls from page 1 to page 2',
        output: 'Cursor pagination (?after=post_89) avoids duplicate or skipped items',
      },
      {
        input: 'User clicks post #42 then presses Browser Back',
        output: 'Cached feed pages + scroll restoration return user to exact position',
      },
    ],
    constraints: [
      'Compare cursor vs offset pagination consistency',
      'Discuss IntersectionObserver and DOM virtualization for long feeds',
      'Address footer reachability and URL shareability.',
    ],
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
    examples: [
      {
        input: 'POST /api/shorten { url: "https://example.com/very/long/path" }',
        output: '{ shortCode: "aB3x9K", shortUrl: "https://sho.rt/aB3x9K" }',
      },
      {
        input: 'GET /aB3x9K',
        output: 'HTTP 302 Redirect to original URL (hits Redis cache in <5ms)',
      },
    ],
    constraints: [
      'Read-heavy workload (e.g., 100:1 read-to-write ratio)',
      'Short codes must be unique and collision-free',
      'Support optional custom aliases and link expiration.',
    ],
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
    examples: [
      {
        input: 'User types "rea" -> "reac" -> "react" within 150ms',
        output: 'Debounced fetch + AbortController cancels stale calls; LRU cache serves repeat prefixes instantly',
      },
      {
        input: 'User presses ArrowDown, ArrowDown, Enter',
        output: 'Highlights 2nd suggestion (aria-activedescendant) and submits selection',
      },
    ],
    constraints: [
      'Sub-100ms perceived latency on cached or debounced queries',
      'Full keyboard & screen-reader combobox accessibility',
      'Safe substring highlighting without XSS risk.',
    ],
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
    examples: [
      {
        input: '3 mounted components call useQuery(["user", 1]) simultaneously',
        output: 'Single network request is fired; all 3 subscribers share the in-flight promise',
      },
      {
        input: 'Optimistic mutation fails with HTTP 500',
        output: 'Snapshot restores previous cache state and surfaces error toast',
      },
    ],
    constraints: [
      'Deterministic query key serialization',
      'Request deduplication for concurrent identical keys',
      'Garbage collection (gcTime) for unmounted observers.',
    ],
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
    examples: [
      {
        input: 'User sends "Hello!" while briefly offline',
        output: 'Optimistic message renders with tempId; queued and flushed on WebSocket reconnect',
      },
      {
        input: 'Client reconnects after 2 minutes offline',
        output: 'Fetches delta messages since lastSeqId and deduplicates by clientTempId',
      },
    ],
    constraints: [
      'Idempotent message delivery (no duplicates on retry)',
      'Exponential backoff with jitter on WebSocket reconnect',
      'Throttled typing indicators.',
    ],
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
    examples: [
      {
        input: 'User A inserts "Hi " at pos 0 while User B deletes char at pos 4 offline',
        output: 'CRDT / OT converges both clients to identical document state on reconnect',
      },
      {
        input: 'User A presses Ctrl+Z (Undo)',
        output: 'Reverts only User A’s last operation without undoing User B’s edits',
      },
    ],
    constraints: [
      'Compare CRDTs vs Operational Transformation (OT)',
      'Sub-100ms local typing latency regardless of network',
      'Ephemeral cursor presence separate from persisted document deltas.',
    ],
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
    examples: [
      {
        input: 'User switches date range filter from 7d to 90d across 5M events',
        output: 'Queries pre-aggregated hourly rollups; renders 50k points smoothly on Canvas',
      },
      {
        input: 'Tenant A runs heavy export query',
        output: 'Rate limiting and query-queue isolation protect Tenant B p95 latency',
      },
    ],
    constraints: [
      'Avoid blocking the main UI thread during data transforms (use Web Workers)',
      'Switch from SVG to Canvas/WebGL for high-density series',
      'Enforce strict tenant isolation in cache keys and queries.',
    ],
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
    examples: [
      {
        input: 'User submits `while (true) {}` infinite loop',
        output: 'Web Worker terminated after 2000ms timeout; main UI remains 60fps responsive',
      },
      {
        input: 'Untrusted code attempts `fetch("/api/me")` or `document.cookie`',
        output: 'Sandboxed origin/iframe + strict CSP blocks network and parent DOM access',
      },
    ],
    constraints: [
      'Isolate untrusted code from parent cookies, localStorage, and DOM',
      'Enforce hard CPU/wall-clock execution timeouts',
      'Capture stdout/console logs and structured assertion results.',
    ],
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
