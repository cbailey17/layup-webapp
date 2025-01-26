import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ChartCardProps {
  chartData: { n: number; runtime: number }[];
}

export default function ChartCard({ chartData }: ChartCardProps) {
  const chartConfig = {
    runtime: {
      label: "Runtime (ms)",
      color: "#10B981",
    },
  };

  return (
    <Card className="flex-1 w-full max-w-full overflow-x-auto md:overflow-visible">
      <CardHeader>
        <CardTitle>Runtime Plot</CardTitle>
        <CardDescription className="text-sm">
          Dynamically generated runtime plot for the layup sequence
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full">
          <ChartContainer config={chartConfig} className="mt-2 h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="n" tickFormatter={(n) => n.toString()} />
                <YAxis scale="linear" domain={[0, "auto"]} tickFormatter={(value) => value.toFixed(6)} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="runtime" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

