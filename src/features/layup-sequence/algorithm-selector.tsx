import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { algorithms } from "@/utils/layup-sequence"

type AlgorithmKey = keyof typeof algorithms

const algorithmOptions: Array<{ label: string; value: AlgorithmKey }> = [
  { label: "Memoization", value: "memoization" },
  { label: "Dynamic Programming", value: "dp" },
  { label: "Optimized DP", value: "optimized" },
]

interface AlgorithmSelectorProps {
  onSelect: (value: AlgorithmKey) => void
}

export default function AlgorithmSelector({ onSelect }: AlgorithmSelectorProps) {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmKey>("optimized");

  const handleSelection = (value: AlgorithmKey) => {
    setSelectedAlgorithm(value);
    onSelect(value);
  };

  return (
    <div className="pb-4">
      <RadioGroup
        value={selectedAlgorithm}
        onValueChange={(v) => handleSelection(v as AlgorithmKey)}
        className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 md:items-center items-start"
      >
        {algorithmOptions.map(({ label, value }) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem id={value} value={value} />
            <Label htmlFor={value} className="text-card-foreground">{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

