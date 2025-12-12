// PerformanceMetrics.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const PerformanceMetrics = () => (
  <Card className="shadow-lg border-none">
    <CardHeader className="border-b border-gray-200">
      <CardTitle className="text-lg font-bold flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        This Month
      </CardTitle>
    </CardHeader>

    <CardContent className="pt-4 space-y-4">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Appointments Completed
          </span>
          <span className="text-sm font-semibold">87%</span>
        </div>
        <Progress value={87} className="h-2" />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Patient Satisfaction
          </span>
          <span className="text-sm font-semibold">95%</span>
        </div>
        <Progress value={95} className="h-2" />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Records Accuracy
          </span>
          <span className="text-sm font-semibold">98%</span>
        </div>
        <Progress value={98} className="h-2" />
      </div>
    </CardContent>
  </Card>
);
