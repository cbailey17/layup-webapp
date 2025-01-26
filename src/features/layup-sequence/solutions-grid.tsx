import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Callout from "../../components/callout";
import { CodeBlock } from "@/components/code-block";
import { BlockMath } from "react-katex";
import { recursiveSolution, memoizedSolution, dpSolution, optimizedDPSolution } from "@/constants/layup-sequence-constants";

export default function SolutionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2 flex justify-center">
        <Card className="w-full md:w-3/4">
          <CardHeader>
            <CardTitle>Problem Equations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="pb-2">
              Given the recurrence relations of the layup sequence calculate the value at <strong>n = 100000:</strong>
            </p>
            <BlockMath math={String.raw`S(n) = 1 \text{ if } n \text{ = 1 }`} />
            <BlockMath math={String.raw`S(n) = 2 \text{ if } n \text{ = 2 }`} />
            <BlockMath math={String.raw`S(n) = S(n-1) + S(n-2) \text{ if } n \text{ is even}`} />
            <BlockMath math={String.raw`S(n) = 2 \cdot S(n-1) - S(n-2) \text{ if } n \text{ is odd}`} />
          </CardContent>
        </Card>
      </div>

      <div className="text-2xl mt-4 font-semibold leading-none tracking-tight pb-2 text-card-foreground text-center col-span-2">
        Recursive Solution and Memoization
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recursive Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="pb-2">
            This solution uses a basic recursive approach. This approach performs many computations multiple times and is highly inefficient, especially for large values of N.
          </p>
          <Callout type="warning" title="Warning" message="This approach causes severe performance degradation and is hence removed from the results section as a testing option" />
          <p className="pt-4"><strong>Time Complexity:</strong> O(2ⁿ)</p>
          <p className="pb-2"><strong>Space Complexity:</strong> O(n) (due to recursive call stack)</p>
          <CodeBlock value={recursiveSolution} language="javascript" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Memoization Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="pb-2">
            This solution optimizes recursion using memoization. Calculations are stored and later referenced instead of performing the computation again. This significantly improves the time complexity with some compromise for space complexity overhead.
          </p>
          <p className="pt-4"><strong>Time Complexity:</strong> O(n)</p>
          <p className="pb-2"><strong>Space Complexity:</strong> O(n) (due to memoization storage)</p>
          <CodeBlock value={memoizedSolution} language="javascript" />
        </CardContent>
      </Card>

      <div className="text-2xl mt-4 font-semibold leading-none tracking-tight pb-2 text-card-foreground text-center col-span-2">
        Dynamic Programming Solution and Optimization
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dynamic Programming Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="pb-2">
            This solution implements a bottom-up dynamic programming approach by filling a table iteratively.
          </p>
          <p className="pt-4"><strong>Time Complexity:</strong> O(n)</p>
          <p className="pb-2"><strong>Space Complexity:</strong> O(n) (due to storing computed values in an array)</p>
          <CodeBlock value={dpSolution} language="javascript" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimized Dynamic Programming</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="pb-2">
            This solution further optimizes dynamic programming by using only two variables instead of an entire array.
          </p>
          <p className="pt-4"><strong>Time Complexity:</strong> O(n)</p>
          <p className="pb-2"><strong>Space Complexity:</strong> O(1) (constant space usage with two variables)</p>
          <CodeBlock value={optimizedDPSolution} language="javascript" />
        </CardContent>
      </Card>
    </div>
  );
}

