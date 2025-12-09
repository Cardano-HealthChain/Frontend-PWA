import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ImprovementItem = ({ label, percentage }: { label: string; percentage: number }) => (
    <div className="py-3 px-2 border border-gray-100 rounded-lg">
        <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/80">{label}</p>
            <span className="text-sm font-semibold text-primary">{percentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-secondary rounded-full mt-1">
            <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
);

interface ProgressTrackerProps {
    profileComplete?: number;
}

export const ProgressTracker = ({ profileComplete = 0 }: ProgressTrackerProps) => {
    // Calculate progress items based on profile completion
    const progressItems = [
        {
            label: "Complete your profile",
            percentage: profileComplete,
        },
        {
            label: "Schedule your year's check-up",
            percentage: 0, // This could be calculated based on appointments
        },
        {
            label: "Watch 'Healthy Living' lesson",
            percentage: 0, // This could be tracked from lessons completed
        },
        {
            label: "Review security settings",
            percentage: 100, // Could check if user has reviewed settings
        },
    ];

    return (
        <Card className="shadow-lg border-none">
            <CardHeader className="pb-3">
                <div className="flex flex-row justify-between items-center">
                    <CardTitle className="text-base font-semibold">Your Progress</CardTitle>
                    <Link
                        href="/dashboard/resident/progress"
                        className="text-xs font-semibold text-primary/80 hover:text-primary"
                    >
                        See More
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
                {progressItems.map((item, index) => (
                    <ImprovementItem
                        key={index}
                        label={item.label}
                        percentage={item.percentage}
                    />
                ))}
            </CardContent>
        </Card>
    );
};