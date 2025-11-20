import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AlertSeverityBadge = ({ severity }: { severity: string }) => {
    let colorClass = "";
    if (severity === 'High') {
        colorClass = "bg-red-100 text-red-700";
    } else if (severity === 'Medium') {
        colorClass = "bg-yellow-100 text-yellow-700";
    } else {
        colorClass = "bg-green-100 text-green-700";
    }

    return (
        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", colorClass)}>
            {severity} Severity
        </span>
    );
};

const AlertItem = ({ alert }: { alert: any }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-secondary/30 transition-colors cursor-pointer px-1 -mx-1 rounded">
        <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
                <p className="text-sm font-medium">{alert.type}</p>
                <div className="flex items-center gap-2 mt-1">
                    <AlertSeverityBadge severity={alert.severity} />
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {alert.time}
                    </span>
                </div>
            </div>
        </div>
        <Link href="/alerts" className="text-sm font-semibold text-primary/80 hover:text-primary whitespace-nowrap">
            See More
        </Link>
    </div>
);

export const YourAlerts = ({ alerts }: { alerts: any[] }) => {
    return (
        <Card className="shadow-lg">
            <CardHeader className="border-b flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Your Alerts</CardTitle>
                <Link href="/alerts" className="text-sm font-semibold text-primary/80 hover:text-primary">
                    See More
                </Link>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                {alerts.slice(0, 4).map((alert, i) => (
                    <AlertItem key={i} alert={alert} />
                ))}
            </CardContent>
        </Card>
    );
};