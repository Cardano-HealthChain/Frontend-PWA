import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const summaryData = [
    {
        title: "Lab Tests",
        count: "23 Lab Tests",
        subtitle: "Last test",
        details: ["Status: 3 weeks ago", "2 abnormal results"],
        buttonLabel: "View Lab Tests",
        color: "bg-green-100 text-green-900"
    },
    {
        title: "Vaccinations",
        count: "7 Vaccinations",
        subtitle: "Next due",
        details: ["Due in: Hepatitis booster", "2 months"],
        buttonLabel: "View Vaccinations",
        color: "bg-blue-100 text-blue-900"
    },
    {
        title: "Clinic Visits",
        count: "15 Visits",
        subtitle: "Last visit",
        details: ["Sunrise Clinic: 20 May 2025"],
        buttonLabel: "View Visits",
        color: "bg-purple-100 text-purple-900"
    },
    {
        title: "Medications",
        count: "4 Active Medications",
        subtitle: "Last updated",
        details: ["Status: 5 days ago", "1 medication expiring soon"],
        buttonLabel: "View Medications",
        color: "bg-red-100 text-red-900"
    },
    {
        title: "Imaging",
        count: "8 Imaging Records",
        subtitle: "Types",
        details: ["Latest: X-ray, MRI, Ultrasound", "Chest X-ray (3 months ago)"],
        buttonLabel: "View Imaging",
        color: "bg-pink-100 text-pink-900"
    }
];

const SummaryCard = ({ title, count, subtitle, details, buttonLabel, color }: any) => (
    <Card className={cn("shadow-sm", color)}>
        <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded bg-white/50 flex items-center justify-center">
                    <UsersRound className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium opacity-90">{title}</p>
            </div>
            <div>
                <p className="text-3xl font-bold">{count}</p>
                <p className="text-xs mt-1 opacity-80">{subtitle}</p>
                <div className="text-xs mt-2 space-y-0.5">
                    {details.map((detail: string, i: number) => (
                        <p key={i} className="opacity-70">{detail}</p>
                    ))}
                </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2 text-xs bg-white/80 hover:bg-white">
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