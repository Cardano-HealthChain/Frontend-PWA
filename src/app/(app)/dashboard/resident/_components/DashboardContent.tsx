import { CurrentPermissions } from "./CurrentPermissions";
import { HealthStats } from "./HealthStats";
import { ProfileCard } from "./ProfileCard";
import { YourAlerts } from "./YourAlerts";
import { LearnAndImprove } from "./LearnAndImprove";
import { ProgressTracker } from "./ProgressTracker";
import { Button } from "@/components/ui/button";
import { Bell, FileText, Share2, Target, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const ActionButton = ({ icon: Icon, label, title }: { icon: any, label: string, title: string }) => (
    <Button size="lg" variant="outline" className="w-full justify-start md:w-auto h-10 text-sm px-3 py-1 border-primary" title={title}>
        <Icon className="h-5 w-5 mr-2" /> {label}
    </Button>
);

export const DashboardContent = ({
    user,
    hasActiveRecords,
    permissions,
    alerts,
    learnCards
}: {
    user: any,
    hasActiveRecords: boolean,
    permissions: any[],
    alerts: any[],
    learnCards: any[],
}) => {

    return (
        <div className="mt-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Quick Actions (Always visible) */}
                <div className="flex flex-col">
                    <div className="mb-3">
                        <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
                            Good afternoon, <br /> <span className="mt-2">Joshua 👋</span>
                        </h1>
                        <p className="mt-2 text-muted-foreground text-xl">
                            Your health information is secure.
                        </p>
                    </div>
                    <div className="w-full flex flex-wrap gap-2 mt-6">
                        <ActionButton icon={FileText} label="My Records" title="View your records" />
                        <ActionButton icon={Share2} label="Share Access" title="Grant or revoke access" />
                        <ActionButton icon={Bell} label="Alerts" title="View alerts" />
                        {/* <ActionButton icon={Target} label="Missions" /> */}
                        <ActionButton icon={Zap} label="AI Assistant" title="Ask AI assistant" />
                    </div>
                </div>
                <ProfileCard user={user} />
            </div>

            <div className="flex flex-col lg:flex-row items-start mt-4">
                {/* COLUMN 1 & 2: Health Info, Alerts, Missions (Expands on mobile) */}
                <div className="space-y-8">

                    {/* 1. Health Stats / Profile (always active) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <HealthStats user={user} hasRecords={hasActiveRecords} />
                        </div>
                        {/* COLUMN 3: Permissions (Always visible, handles empty state internally) */}
                        <div className="lg:col-span-1">
                            <CurrentPermissions permissions={permissions} hasActiveRecords={hasActiveRecords} />
                        </div>
                        <div className="lg:col-span-2 mt-0">
                            {hasActiveRecords && <YourAlerts alerts={alerts} />}
                        </div>
                        <div className="lg:col-span-1">
                            <ProgressTracker />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 2. Alerts Section (Visible if Active) */}
                        
                    </div>
                    {/* 3. Learn and Improve Section (Visible if Active) */}
                    {hasActiveRecords && <LearnAndImprove learnCards={learnCards} />}

                    {/* 4. Empty State Placeholder (If no alerts/records) */}
                    {!hasActiveRecords && (
                        <Card className="p-8 text-center border-dashed border-2 border-border/50 bg-secondary/50">
                            <h3 className="text-xl font-bold text-muted-foreground">No Recent Activity</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Complete your profile, and receive your first VC from a clinic to see your dashboard come to life.</p>
                            <Button className="mt-4">Find a Verified Clinic</Button>
                        </Card>
                    )}
                </div>


            </div>
        </div>
    );
};