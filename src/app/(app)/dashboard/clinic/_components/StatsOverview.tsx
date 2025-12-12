// StatsOverview.tsx
"use client"
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatsOverview = ({
  icon: Icon,
  title,
  value,
  change,
  changeType,
  subtitle,
  bgColor,
  color
}: {
  icon: any;
  title: string;
  value: string | number;
  change: string;
  changeType: "increase" | "decrease";
  subtitle: string;
  bgColor: string;
  color: string;
}) => (
  <Card className="shadow-sm border-none hover:shadow-md transition-shadow">
    <CardContent className="py-4 px-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>

        <div className="flex items-center gap-1">
          {changeType === "increase" ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={`text-xs font-semibold ${
              changeType === "increase"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {change}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </CardContent>
  </Card>
);


