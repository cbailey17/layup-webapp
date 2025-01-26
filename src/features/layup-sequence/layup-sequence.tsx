import SequenceSolver from "./sequence-solver";
import SolutionsGrid from "./solutions-grid";
import { CardContent, CardDescription, Card, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LayupSequence() {
  return (
    <div className="p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight pb-4">
        Layup Sequence
      </h2>
      <Tabs defaultValue="algorithms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="algorithms">Algorithm Development</TabsTrigger>
          <TabsTrigger value="result">Runtimes and Results</TabsTrigger>
        </TabsList>
        <TabsContent value="algorithms" className="space-y-4">
          <Card className="dark:bg-gradient-to-br from-slate-700 to-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle>Layup Sequence Algorithm</CardTitle>
              <CardDescription>The design and implemententaion of a provided sequence algorithm. Below are four implementations of the algorithm which progressively optimize the slution and corresponding time and space complexity</CardDescription>
            </CardHeader>
            <CardContent>
              <SolutionsGrid />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="result">
          <Card className="dark:bg-gradient-to-br from-slate-700 to-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle>Run Time Charts</CardTitle>
              <CardDescription>Display run time for various values of N</CardDescription>
            </CardHeader>
            <CardContent>
              <SequenceSolver />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
