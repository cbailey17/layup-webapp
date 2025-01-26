import { useReducer, useEffect, useCallback, useState } from "react";
import ResultsCard from "./results-card";
import ChartCard from "./chart-card";
import { computeOptimized, computeMemoized, algorithms } from "@/utils/layup-sequence";

type RuntimePoint = { n: number; runtime: number };

type Action =
  | { type: "SET_N"; payload: number }
  | { type: "SET_RESULT"; payload: bigint }
  | { type: "SET_RUNTIMES"; payload: RuntimePoint[] };

const initialState = {
  n: 1000,
  result: 0n,
  runtimes: [] as RuntimePoint[],
};

function reducer(state: typeof initialState, action: Action): typeof initialState {
  switch (action.type) {
    case "SET_N":
      return { ...state, n: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_RUNTIMES":
      return { ...state, runtimes: action.payload };
    default:
      return state;
  }
}

function measurePerformance(
  n: number,
  iterations = 100,
  computeFunction: (n: number) => number,
  reset?: () => void
): number {
  let totalTime = 0;

  if (reset) reset();

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    computeFunction(n);
    totalTime += performance.now() - start;
  }
  console.log(`Runtime for N=${n}:`, totalTime / iterations);
  return totalTime / iterations;
}

export default function SequenceSolver() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [computeFunction, setComputeFunction] = useState<(n: number) => number>(() => computeOptimized);
  const [selectedAlgo, setSelectedAlgo] = useState<keyof typeof algorithms>("optimized");

  const generateRuntimes = useCallback(() => {
    const runtimes: RuntimePoint[] = [];
    const testValues: number[] = [];

    for (let i = 1; i <= state.n; i *= 2) {
      testValues.push(i);
    }

    for (const val of testValues) {
      let runtime: number;

      if (selectedAlgo === "memoization") {
        runtime = measurePerformance(val, 500, computeMemoized, computeMemoized.reset);
      } else {
        runtime = measurePerformance(val, 500, computeFunction);
      }

      runtimes.push({ n: val, runtime });
    }

    dispatch({ type: "SET_RUNTIMES", payload: runtimes });
  }, [state.n, computeFunction, selectedAlgo]);

  useEffect(() => {
    const finalValue = computeFunction(state.n);
    dispatch({ type: "SET_RESULT", payload: BigInt(finalValue) });

    generateRuntimes();
  }, [state.n, computeFunction, generateRuntimes]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <ResultsCard
        n={state.n}
        setN={(value) => dispatch({ type: "SET_N", payload: value })}
        result={state.result}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        setComputeFunction={setComputeFunction}
      />
      <ChartCard chartData={state.runtimes} />
    </div>
  );
}

