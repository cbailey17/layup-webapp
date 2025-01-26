export const recursiveSolution = `
function layupSequenceRecursive(n) {
  if (n === 1) return 1n;
  if (n === 2) return 2n;

  if (n % 2 === 0) {
    return layupSequenceRecursive(n - 1) + layupSequenceRecursive(n - 2);
  } else {
    return 2n * layupSequenceRecursive(n - 1) - layupSequenceRecursive(n - 2);
  }
}
`;

export const memoizedSolution = `
const memo = {};
function layupSequenceMemoized(n) {
  if (n in memo) return memo[n];
  if (n === 1) return 1n;
  if (n === 2) return 2n;

  if (n % 2 === 0) {
    memo[n] = layupSequenceMemoized(n - 1) + layupSequenceMemoized(n - 2);
  } else {
    memo[n] = 2n * layupSequenceMemoized(n - 1) - layupSequenceMemoized(n - 2);
  }
  return memo[n];
}
`;

export const dpSolution = `
function layupSequenceDP(n) {
  const dp = new Array(n + 1).fill(0n);
  dp[1] = 1n;
  dp[2] = 2n;
  for (let i = 3; i <= n; i++) {
    if (i % 2 === 0) {
      dp[i] = dp[i - 1] + dp[i - 2];
    } else {
      dp[i] = 2n * dp[i - 1] - dp[i - 2];
    }
  }
  return dp[n];
}
`;

export const optimizedDPSolution = `
function layupSequenceOptimized(n) {
  if (n === 1) return 1n;
  if (n === 2) return 2n;

  let prev2 = 1n, prev1 = 2n, current;
  for (let i = 3; i <= n; i++) {
    if (i % 2 === 0) {
      current = prev1 + prev2;
    } else {
      current = 2n * prev1 - prev2;
    }
    prev2 = prev1;
    prev1 = current;
  }
  return current;
}
`;
