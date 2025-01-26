import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Callout from "@/components/callout";
import AlgorithmSelector from "./algorithm-selector";
import { algorithms } from "@/utils/layup-sequence";

interface ResultsCardProps {
  n: number;
  setN: (value: number) => void;
  result: bigint;
  selectedAlgo: keyof typeof algorithms;
  setSelectedAlgo: (algo: keyof typeof algorithms) => void;
  setComputeFunction: (func: (n: number) => number) => void;
}

export default function ResultsCard({ n, setN, result, setSelectedAlgo, setComputeFunction }: ResultsCardProps) {
  const formatBigIntScientific = (value: bigint, precision = 5) => {
    const valueStr = value.toString();
    const firstDigits = valueStr.slice(0, precision + 1);
    const exponent = valueStr.length - 1;
    return `${firstDigits[0]}.${firstDigits.slice(1)}e+${exponent}`;
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Algorithm Selection</CardTitle>
        <CardDescription>Select an algorithm and input N value</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="font-semibold leading-none tracking-tight text-card-foreground">
          Select an algorithm
        </div>
        <AlgorithmSelector
          onSelect={(algo) => {
            setSelectedAlgo(algo as keyof typeof algorithms);
            setComputeFunction(() => algorithms[algo as keyof typeof algorithms]);
          }}
        />
        <div className="space-y-2">
          <Label htmlFor="n-input" className="text-bolder text-card-foreground">
            <strong>Enter N</strong>
          </Label>
          <Input
            id="n-input"
            type="number"
            value={n}
            min={1}
            className="bg-gray-100 text-black w-full"
            onChange={(e) => setN(parseInt(e.target.value, 10))}
          />
        </div>
        <div
          className={`p-4 text-gray-800 rounded-md border ${n > 0 && n <= 10000 ? "bg-green-100 border-green-400" : "bg-transparent border-gray-300"
            }`}
        >
          <h2 className="text-xl font-semibold">Result: S({n}) = {formatBigIntScientific(result)}</h2>
        </div>
        <Callout className="!mt-[6rem]" type="warning" title="Warning" message="High values for N will cause performance issues" />
      </CardContent>
    </Card>
  );
}

