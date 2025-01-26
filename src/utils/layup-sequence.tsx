export function computeRecursive(n: number): bigint {
  if (n === 1) return 1n;
  if (n === 2) return 2n;

  if (n % 2 === 0) {
    return computeRecursive(n - 1) + computeRecursive(n - 2);
  } else {
    return 2n * computeRecursive(n - 1) - computeRecursive(n - 2);
  }
}

export const computeMemoized = (() => {
  let memo: Record<number, bigint> = {};

  function reset() {
    memo = {};
  }

  function inner(n: number): bigint {
    if (n in memo) {
      return memo[n];
    }

    if (n === 1) return 1n;
    if (n === 2) return 2n;

    let result: bigint;
    if (n % 2 === 0) {
      result = inner(n - 1) + inner(n - 2);
    } else {
      result = 2n * inner(n - 1) - inner(n - 2);
    }

    memo[n] = result;
    return result;
  }

  return Object.assign(inner, { reset });
})();


export function makeMemoized() {
  const memo: Record<number, bigint> = {};

  function memoized(n: number): bigint {
    if (n in memo) {
      return memo[n];
    }

    if (n === 1) return 1n;
    if (n === 2) return 2n;

    let result: bigint;
    if (n % 2 === 0) {
      result = memoized(n - 1) + memoized(n - 2);
    } else {
      result = 2n * memoized(n - 1) - memoized(n - 2);
    }

    memo[n] = result;
    return result;
  }

  return memoized;
}

export function computeDP(n: number): bigint {
  const dp = new Array<bigint>(n + 1);

  dp[1] = 1n;
  if (n >= 2) {
    dp[2] = 2n;
  }

  for (let i = 3; i <= n; i++) {
    if (i % 2 === 0) {
      dp[i] = dp[i - 1] + dp[i - 2];
    } else {
      dp[i] = 2n * dp[i - 1] - dp[i - 2];
    }
  }

  return dp[n];
}

export function computeOptimized(n: number): bigint {
  if (n === 1) return 1n;
  if (n === 2) return 2n;

  let prev2 = 1n;
  let prev1 = 2n;
  let current = 0n;

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

export const algorithms = {
  recursive: computeRecursive,
  memoization: computeMemoized,
  dp: computeDP,
  optimized: computeOptimized,
} as const;


