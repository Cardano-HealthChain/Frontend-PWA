import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const summaryData = [
    {
        title: "Active Permissions",
        count: 6,
        subtitle: "active clinics and authorities currently have access to your health records",
        color: "bg-green-100 text-green-900",
        icon: Users
    },
    {
        title: "Expiring Soon",
        count: 2,
        subtitle: "these permissions will expire within the next 7–14 days",
        color: "bg-cyan-100 text-cyan-900",
        icon: Clock
    },
    {
        title: "Recently Used",
        count: 4,
        subtitle: "these clinics viewed your records within the last 72 hours",
        color: "bg-purple-100 text-purple-900",
        icon: Eye
    },
    {
        title: "Revoked Access",
        count: 3,
        subtitle: "you have revoked access from these clinics in the past",
        color: "bg-red-100 text-red-900",
        icon: AlertTriangle
    }
];

const SummaryCard = ({ title, count, subtitle, color, icon: Icon }: any) => (
    <Card className={cn("shadow-sm", color)}>
        <CardContent className="p-4 space-y-2">
            <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded bg-white/50 flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-medium opacity-90">{title}</p>
            </div>
            <div>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs mt-2 opacity-80 leading-relaxed">{subtitle}</p>
            </div>
        </CardContent>
    </Card>
);

export const PermissionSummaryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryData.map((card, i) => (
                <SummaryCard key={i} {...card} />
            ))}
        </div>
    );
};