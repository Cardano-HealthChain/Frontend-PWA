import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Severity badge colors (small pills in header)
const getSeverityColor = (severity: string) => {
    if (severity === 'High') return "bg-red-200 text-red-800";
    if (severity === 'Medium') return "bg-yellow-200 text-yellow-800";
    return "bg-green-200 text-green-800";
};

// Row background colors (full row coloring)
const getRowColor = (severity: string) => {
    if (severity === 'High') return "bg-red-50 hover:bg-red-100";
    if (severity === 'Medium') return "bg-yellow-50 hover:bg-yellow-100";
    return "bg-green-50 hover:bg-green-100";
};

// Alert type
type Alert = {
    type: string;
    description: string;
    time: string;
    severity: 'High' | 'Medium' | 'Low';
};

// Sample data
const sampleAlerts: Alert[] = [
    {
        type: "Vaccination Overdue",
        description: "Hepatitis B vaccination is overdue",
        time: "2 hours ago",
        severity: "High"
    },
    {
        type: "New Clinic Update",
        description: "New update from Sunrise Medical Centre",
        time: "Yesterday",
        severity: "Medium"
    },
    {
        type: "Malaria Outbreak",
        description: "Malaria outbreak reported in your region",
        time: "3 days ago",
        severity: "Low"
    },
    {
        type: "Vaccination Overdue",
        description: "Upcoming wellness screening available at Emerald Clinic",
        time: "1 week ago",
        severity: "High"
    },
    {
        type: "New Clinic Update",
        description: "Your blood test results have been added",
        time: "1 week ago",
        severity: "Medium"
    },
    {
        type: "Malaria Outbreak",
        description: "Missed Morphine Sulfate",
        time: "28/02/2025",
        severity: "Low"
    }
];

export const YourAlerts = ({ alerts = sampleAlerts }: { alerts?: Alert[] }) => {
    return (
        <Card className="shadow-lg border-none">
            {/* Header with severity legend */}
            <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <CardTitle className="text-xl font-bold">Your Alerts</CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                            <span className="text-xs size-3 rounded-full bg-red-200"></span>
                            <p className="text-sm">High Severity</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs size-3 rounded-full bg-yellow-200"></span>
                            <p className="text-sm">Medium Severity</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs size-3 rounded-full bg-green-200"></span>
                            <p className="text-sm">Low Severity</p>
                        </div>
                    </div>
                    <Link
                        href="/alerts"
                        className="text-sm font-semibold text-primary hover:text-primary/80 underline ml-2"
                    >
                        See More
                    </Link>
                </div>
            </CardHeader>

            {/* Table Content */}
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-2">
                        <tbody className="">
                            {alerts.slice(0, 6).map((alert, i) => (
                                <tr
                                    key={i}
                                    className={cn(
                                        "transition-colors",
                                        getRowColor(alert.severity)
                                    )}
                                >
                                    {/* Icon Column */}
                                    <td className="py-4 pl-6 pr-4 w-12">
                                        <LinkIcon className="h-5 w-5 text-foreground/70" />
                                    </td>

                                    {/* Alert Type Column */}
                                    <td className="py-4 px-2">
                                        <p className="text-sm font-semibold text-foreground">
                                            {alert.type}
                                        </p>
                                    </td>

                                    {/* Description Column */} 
                                    <td className="py-4 px-2">
                                        <p className="text-sm font-semibold text-foreground">
                                            {alert.description}
                                        </p>
                                    </td>

                                    {/* Time Column */}
                                    <td className="py-4 pl-6 pr-4 text-right">
                                        <span className="text-sm text-foreground/70 whitespace-nowrap">
                                            {alert.time}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};