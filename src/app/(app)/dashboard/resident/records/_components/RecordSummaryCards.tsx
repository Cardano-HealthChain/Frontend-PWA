import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";

const summaryData = [
    {
        title: "Lab Tests",
        count: "23 Lab Tests",
        subtitle: "Last test",
        details: "2 abnormal results",
        status: "Status",
        timeline: "3 weeks ago",
        buttonLabel: "View Lab Tests",
        color: "bg-green-100 text-green-900"
    },
    {
        title: "Vaccinations",
        count: "7 Vaccinations",
        subtitle: "Next due",
        details: "Hepatitis booster",
        status: "Due in",
        timeline: "2 months",
        buttonLabel: "View Vaccinations",
        color: "bg-blue-100 text-blue-900"
    },
    {
        title: "Clinic Visits",
        count: "15 Visits",
        subtitle: "Last visit",
        details: "",
        status: "Sunrise Clinic",
        timeline: "20 May 2025",
        buttonLabel: "View Visits",
        color: "bg-purple-100 text-purple-900"
    },
    {
        title: "Medications",
        count: "4 Active Medications",
        subtitle: "Last updated",
        details: "1 medication expiring soon",
        status: "Status",
        timeline: "5 days ago",
        buttonLabel: "View Medications",
        color: "bg-red-100 text-red-900"
    },
    {
        title: "Imaging",
        count: "8 Imaging Records",
        subtitle: "Types",
        details: "X-ray, MRI, Ultrasound",
        status: "Latest",
        timeline: "Chest X-ray (3 months ago)",
        buttonLabel: "View Imaging",
        color: "bg-pink-100 text-pink-900"
    }
];

const SummaryCard = ({ title, count, subtitle, details, buttonLabel, color, status, timeline }: any) => (
    <Card className={cn("shadow-sm border-none", color)}>
        <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded bg-white/50 flex items-center justify-center">
                    <UsersRound className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium opacity-90 mt-3">{title}</p>
            </div>
            <div className="w-full bg-gray-100 mb-4 h-px"></div>
            <div>
                <p className="text-lg lg:text-xl font-bold">{count}</p>
                <div className="flex items-start justify-between">
                    <p className="text-xs mt-1 opacity-80">{subtitle}</p>
                    <p className="text-xs mt-1 opacity-80">{timeline}</p>
                </div>
                <div className="mt-1 flex items-start justify-between">
                    <p className="text-xs opacity-80">{status}</p>
                    <p className="text-xs opacity-80">{details}</p>
                </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2 text-xs bg-white/80 hover:bg-white border-primary">
                {buttonLabel} <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
        </CardContent>
    </Card>
);

export const RecordSummaryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {summaryData.map((card, i) => (
                <SummaryCard key={i} {...card} />
            ))}
        </div>
    );
};