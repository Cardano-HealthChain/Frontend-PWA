import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAlerts } from "@/hooks/useAlerts";
import { Alert } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Helper function to format time
const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;

    // For older dates, show the date
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: diffDays >= 365 ? 'numeric' : undefined
    });
};

// Severity badge colors
const getSeverityColor = (severity: string) => {
    if (severity === 'High') return "bg-red-200 text-red-800";
    if (severity === 'Medium') return "bg-yellow-200 text-yellow-800";
    return "bg-green-200 text-green-800";
};

// Row background colors
const getRowColor = (severity: string, isRead: boolean) => {
    const baseColor = severity === 'High'
        ? "bg-red-50 hover:bg-red-100"
        : severity === 'Medium'
            ? "bg-yellow-50 hover:bg-yellow-100"
            : "bg-green-50 hover:bg-green-100";

    return cn(baseColor, isRead && "opacity-70");
};

export const YourAlerts = () => {
    const { alerts, isLoading, error, markAsRead, unreadCount } = useAlerts();

    if (error) {
        return (
            <Card className="shadow-lg border-none">
                <CardContent className="p-6">
                    <div className="text-center text-red-500">
                        <Bell className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold">Failed to Load Alerts</h3>
                        <p className="text-sm mt-2">{error.message}</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-lg border-none">
            {/* Header with severity legend and unread count */}
            <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <CardTitle className="text-xl font-bold">Your Alerts</CardTitle>
                        {unreadCount > 0 && (
                            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </div>

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
                        See All Alerts
                    </Link>
                </div>
            </CardHeader>

            {/* Table Content */}
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="space-y-3 p-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-5 w-5" />
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-4 flex-1" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}
                        </div>
                    ) : alerts && alerts.length > 0 ? (
                        <table className="w-full border-separate border-spacing-y-2">
                            <tbody>
                                {alerts.slice(0, 6).map((alert) => (
                                    <tr
                                        key={alert.alert_id}
                                        className={cn(
                                            "transition-colors cursor-pointer",
                                            getRowColor(alert.severity, alert.read)
                                        )}
                                        onClick={() => markAsRead(alert.alert_id)}
                                    >
                                        {/* Icon Column */}
                                        <td className="py-4 pl-6 pr-4 w-12">
                                            <div className="relative">
                                                <LinkIcon className="h-5 w-5 text-foreground/70" />
                                                {!alert.read && (
                                                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Alert Type Column */}
                                        <td className="py-4 px-2">
                                            <div className="flex items-center gap-2">
                                                <span className={cn(
                                                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                                                    getSeverityColor(alert.severity)
                                                )}>
                                                    {alert.severity}
                                                </span>
                                                <p className="text-sm font-semibold text-foreground">
                                                    {alert.title}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Description Column */}
                                        <td className="py-4 px-2">
                                            <p className="text-sm text-foreground/80">
                                                {alert.description}
                                            </p>
                                        </td>

                                        {/* Time Column */}
                                        <td className="py-4 pl-6 pr-4 text-right">
                                            <span className="text-sm text-foreground/70 whitespace-nowrap">
                                                {formatTime(alert.created_at)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center p-8">
                            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-500">No Alerts</h3>
                            <p className="text-sm text-gray-400 mt-2">
                                You're all caught up! No alerts at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};