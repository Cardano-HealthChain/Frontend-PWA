import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, Clock, ArrowUpRight, SquareCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const StatItem = ({
    icon: Icon,
    title,
    value,
    subValue,
    bgColor,
    color
}: {
    icon: any;
    title: string;
    value: string;
    subValue: string;
    bgColor: string;
    color: string;
}) => (
    <Card className="shadow-sm border-none">
        <CardContent className="py-2 px-3 flex items-start flex-col space-y-4">
            <div className="flex flex-row items-center space-x-4">
                <div className={`p-2 rounded-md ${bgColor}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                    <p className="text-sm font-medium">{title}</p>
                </div>
            </div>
            <div className="w-full bg-gray-100 mb-4 h-px"></div>
            <div className="flex flex-row items-center justify-evenly space-x-6 space-y-6 text-xs">
                <p className="text-lg font-bold mt-1">{value}</p>
                <div>
                    <span className="text-green-600 flex items-center">
                        {subValue} <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </span>
                    <span className="text-muted-foreground/80">vs Last Month</span>
                </div>
            </div>
        </CardContent>
    </Card>
);

interface DashboardStats {
    totalRecords?: number;
    verifiedRecords?: number;
    clinicsVisited?: number;
    notifications?: number;
}

export const HealthStats = ({
    user,
    hasRecords,
    stats
}: {
    user: any;
    hasRecords: boolean;
    stats?: DashboardStats;
}) => {
    // Calculate stats from real data
    const verifiedCount = stats?.verifiedRecords || 0;
    const totalRecords = stats?.totalRecords || 0;
    const clinicsVisited = stats?.clinicsVisited || 0;

    const statData = [
        {
            icon: FileText,
            title: "Verified Records Count",
            value: `${verifiedCount} Record${verifiedCount !== 1 ? 's' : ''}`,
            subValue: "+1.0%",
            bgColor: "bg-blue-50",
            color: "text-blue-500"
        },
        {
            icon: Calendar,
            title: "Total Records",
            value: `${totalRecords} Record${totalRecords !== 1 ? 's' : ''}`,
            subValue: "+0.0%",
            bgColor: "bg-green-50",
            color: "text-green-500"
        },
        {
            icon: Clock,
            title: "Clinics Visited",
            value: `${clinicsVisited} Clinic${clinicsVisited !== 1 ? 's' : ''}`,
            subValue: "+10.0%",
            bgColor: "bg-yellow-50",
            color: "text-yellow-500"
        },
    ];

    const profileComplete = user?.profileComplete || 0;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {statData.map((stat, i) => (
                    <StatItem key={i} {...stat} />
                ))}
            </div>
            <div className="flex flex-row space-x-2 justify-between w-full">
                <Card className="shadow-sm p-4 border-none w-full">
                    <CardHeader className="p-0 pb-2 flex flex-row items-center space-x-3">
                        <div className="flex items-center bg-blue-50 p-2 rounded-md">
                            <SquareCheck className="text-primary h-4 w-4" />
                        </div>
                        <CardTitle className="text-xs text-muted-foreground">
                            Profile Completion Percentage
                        </CardTitle>
                    </CardHeader>
                    <div className="w-full bg-gray-100 mb-4 h-px"></div>
                    <CardContent className="px-0 py-4 flex items-center gap-4">
                        <div className="w-full">
                            <Progress value={profileComplete} className="h-4" />
                        </div>
                        <span className="text-lg font-bold text-primary">{profileComplete}%</span>
                    </CardContent>
                </Card>
                <div className="mt-3 flex flex-col justify-start items-center gap-3">
                    <Link href="/dashboard/resident/settings">
                        <Button size="full" variant="outline" className="border-primary font-semibold w-full">
                            Complete Profile
                        </Button>
                    </Link>
                    <Link href="/dashboard/resident/records">
                        <Button size="full" className="font-semibold">
                            View Full Health Records
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};