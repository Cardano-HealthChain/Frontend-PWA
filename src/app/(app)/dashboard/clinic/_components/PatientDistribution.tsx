// PatientDistribution.tsx
"use client"

import { Progress } from "@/components/ui/progress";

export const PatientDistribution = ({
  doctor,
  count,
  percentage
}: {
  doctor: string;
  count: number;
  percentage: number;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-medium">{doctor}</span>
      <span className="text-muted-foreground">{count} patients</span>
    </div>

    <div className="flex items-center gap-2">
      <Progress value={percentage} className="h-2" />
      <span className="text-xs font-semibold text-primary min-w-[40px]">
        {percentage}%
      </span>
    </div>
  </div>
);
