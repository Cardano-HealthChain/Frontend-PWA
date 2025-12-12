// ActivityLog.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ActivityItem = ({ activity }: { activity: any }) => (
  <div className="flex items-start gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors">
    <div className={`p-2 h-5 w-5 rounded-full ${activity.bgColor}`}>
      {activity.icon && <activity.icon className={`h-4 w-4 ${activity.color}`} />}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{activity.title}</p>
      <p className="text-xs text-muted-foreground">{activity.description}</p>
      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
    </div>
  </div>
);
