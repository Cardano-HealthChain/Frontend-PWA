// app/dashboard/resident/permissions/_components/PermissionSummaryCards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Permission } from "@/lib/api";
import { useMemo } from "react";

interface PermissionSummaryCardsProps {
    permissions: Permission[];
}

const SummaryCard = ({ title, count, subtitle, color, icon: Icon }: any) => (
    <Card className={cn("shadow-sm border-none", color)}>
        <CardContent className="p-4 space-y-2">
            <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded bg-white/50 flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium opacity-90 mt-2">{title}</p>
            </div>
            <div className="w-full bg-gray-200 mb-4 h-px"></div>
            <div>
                <p className="text-lg lg:text-lg font-bold">{count}</p>
                <p className="text-xs mt-2 opacity-80 leading-relaxed">{subtitle}</p>
            </div>
        </CardContent>
    </Card>
);

export const PermissionSummaryCards = ({ permissions }: PermissionSummaryCardsProps) => {
    const stats = useMemo(() => {
        const now = new Date();
        const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000);

        // Active permissions (granted and not revoked)
        const active = permissions.filter(p => p.granted && !p.revoked);

        // Expiring soon (would need expiry_date field in Permission type)
        // For now, using a placeholder
        const expiringSoon = 0;

        // Recently used (accessed within last 72 hours)
        // Using granted_at as proxy for last access since we don't have last_accessed field
        const recentlyUsed = active.filter(p => {
            const grantedDate = new Date(p.granted_at);
            return grantedDate > seventyTwoHoursAgo;
        });

        // Revoked permissions
        const revoked = permissions.filter(p => p.revoked);

        return {
            active: {
                count: active.length,
                subtitle: `${active.length} active clinic${active.length !== 1 ? 's' : ''} and authorit${active.length !== 1 ? 'ies' : 'y'} currently have access to your health records`
            },
            expiringSoon: {
                count: expiringSoon,
                subtitle: "these permissions will expire within the next 7–14 days"
            },
            recentlyUsed: {
                count: recentlyUsed.length,
                subtitle: `${recentlyUsed.length} clinic${recentlyUsed.length !== 1 ? 's' : ''} granted access within the last 72 hours`
            },
            revoked: {
                count: revoked.length,
                subtitle: `you have revoked access from ${revoked.length} clinic${revoked.length !== 1 ? 's' : ''} in the past`
            }
        };
    }, [permissions]);

    const summaryData = [
        {
            title: "Active Permissions",
            count: `${stats.active.count} Active`,
            subtitle: stats.active.subtitle,
            color: "bg-green-100 text-green-900",
            icon: Users
        },
        {
            title: "Expiring Soon",
            count: `${stats.expiringSoon.count} Expiring`,
            subtitle: stats.expiringSoon.subtitle,
            color: "bg-cyan-100 text-cyan-900",
            icon: Clock
        },
        {
            title: "Recently Granted",
            count: `${stats.recentlyUsed.count} Recent`,
            subtitle: stats.recentlyUsed.subtitle,
            color: "bg-purple-100 text-purple-900",
            icon: Eye
        },
        {
            title: "Revoked Access",
            count: `${stats.revoked.count} Revoked`,
            subtitle: stats.revoked.subtitle,
            color: "bg-red-100 text-red-900",
            icon: AlertTriangle
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {summaryData.map((card, i) => (
                <SummaryCard key={i} {...card} />
            ))}
        </div>
    );
};