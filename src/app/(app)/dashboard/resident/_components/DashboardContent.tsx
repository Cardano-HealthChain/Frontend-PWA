import { CurrentPermissions } from "./CurrentPermissions";
import { HealthStats } from "./HealthStats";
import { ProfileCard } from "./ProfileCard";
import { YourAlerts } from "./YourAlerts";
import { LearnAndImprove } from "./LearnAndImprove";
import { ProgressTracker } from "./ProgressTracker";
import { Button } from "@/components/ui/button";
import { Bell, FileText, Share2, RefreshCw, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const ActionButton = ({
    icon: Icon,
    label,
    title,
    href
}: {
    icon: any;
    label: string;
    title: string;
    href?: string;
}) => {
    const ButtonContent = (
        <>
            <Icon className="h-5 w-5 mr-2" /> {label}
        </>
    );

    if (href) {
        return (
            <Link href={href}>
                <Button
                    size="lg"
                    variant="outline"
                    className="w-full justify-start md:w-auto h-10 text-sm px-3 py-1 border-primary"
                    title={title}
                >
                    {ButtonContent}
                </Button>
            </Link>
        );
    }

    return (
        <Button
            size="lg"
            variant="outline"
            className="w-full justify-start md:w-auto h-10 text-sm px-3 py-1 border-primary"
            title={title}
        >
            {ButtonContent}
        </Button>
    );
};

interface DashboardStats {
    totalRecords: number;
    verifiedRecords: number;
    clinicsVisited: number;
    notifications: number;
}

export const DashboardContent = ({
    user,
    hasActiveRecords,
    permissions,
    alerts,
    learnCards,
    stats,
    onRefresh,
}: {
    user: any;
    hasActiveRecords: boolean;
    permissions: any[];
    alerts: any[];
    learnCards: any[];
    stats?: DashboardStats;
    onRefresh?: () => void;
}) => {
    // Get time-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Quick Actions (Always visible) */}
                <div className="flex flex-col">
                    <div className="mb-3">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
                                {getGreeting()}, <br />
                                <span className="mt-2 capitalize text-primary">
                                    {user?.name?.split(' ')[0] || "User"} 👋
                                </span>
                            </h1>
                            {onRefresh && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onRefresh}
                                    title="Refresh dashboard"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <p className="mt-2 text-muted-foreground text-xl">
                            Your health information is secure.
                        </p>
                    </div>
                    <div className="w-full flex flex-wrap gap-2 mt-6">
                        <ActionButton
                            icon={FileText}
                            label="My Records"
                            title="View your records"
                            href="/dashboard/resident/records"
                        />
                        <ActionButton
                            icon={Share2}
                            label="Share Access"
                            title="Grant or revoke access"
                            href="/dashboard/resident/permissions"
                        />
                        <ActionButton
                            icon={Bell}
                            label={stats?.notifications ? `Alerts (${stats.notifications})` : "Alerts"}
                            title="View alerts"
                            href="/dashboard/resident/notifications"
                        />
                        <ActionButton
                            icon={Zap}
                            label="AI Assistant"
                            title="Ask AI assistant"
                            href="/dashboard/resident/ai-assistant"
                        />
                    </div>
                </div>
                <ProfileCard user={user} stats={stats} />
            </div>

            <div className="flex flex-col lg:flex-row items-start mt-4">
                {/* COLUMN 1 & 2: Health Info, Alerts, Missions (Expands on mobile) */}
                <div className="space-y-8 w-full">
                    {/* 1. Health Stats / Profile (always active) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <HealthStats
                                user={user}
                                hasRecords={hasActiveRecords}
                                stats={stats}
                            />
                        </div>
                        {/* COLUMN 3: Permissions (Always visible, handles empty state internally) */}
                        <div className="lg:col-span-1">
                            <CurrentPermissions
                                permissions={permissions}
                                hasActiveRecords={hasActiveRecords}
                            />
                        </div>
                        <div className="lg:col-span-2 mt-0">
                            {hasActiveRecords && <YourAlerts />}
                        </div>
                        <div className="lg:col-span-1">
                            <ProgressTracker profileComplete={user?.profileComplete} />
                        </div>
                    </div>

                    {/* 3. Learn and Improve Section (Visible if Active) */}
                    {hasActiveRecords && <LearnAndImprove learnCards={learnCards} />}

                    {/* 4. Empty State Placeholder (If no alerts/records) */}
                    {!hasActiveRecords && (
                        <Card className="p-8 text-center border-dashed border-2 border-border/50 bg-secondary/50">
                            <h3 className="text-xl font-bold text-muted-foreground">
                                No Recent Activity
                            </h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Complete your profile, and receive your first VC from a clinic to see your dashboard come to life.
                            </p>
                            <Link href="/dashboard/resident/clinics">
                                <Button className="mt-4">Find a Verified Clinic</Button>
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};