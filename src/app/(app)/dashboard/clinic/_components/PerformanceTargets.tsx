// PerformanceTargets.tsx
"use client"

import { Progress } from "@/components/ui/progress";

export const PerformanceTargets = ({
    label,
    value,
    target
}: {
    label: string;
    value: number;
    target: number;
}) => {
    const percentage = (value / target) * 100;

    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm text-muted-foreground">
                    {value} / {target}
                </span>
            </div>

            <Progress value={percentage} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">
                {percentage.toFixed(0)}% of target
            </p>
        </div>
    );
};
