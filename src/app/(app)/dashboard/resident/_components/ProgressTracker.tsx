import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ImprovementItem = ({ label, percentage }: { label: string, percentage: number }) => (
    <div className="py-2 border-b last:border-b-0">
        <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/80">{label}</p>
            <span className="text-sm font-semibold text-primary">{percentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-secondary rounded-full mt-1">
            <div
                className="h-full bg-orange-400 rounded-full"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
);

export const ProgressTracker = () => {
    console.log("ProgressTracker rendering!");
    return (
        <Card className="shadow-lg border-none">
            <CardHeader className="pb-3">
                <div className="flex flex-row justify-between items-center">
                    <CardTitle className="text-base font-semibold">Your Progress</CardTitle>
                    <Link href="#" className="text-xs font-semibold text-primary/80 hover:text-primary">
                        See More
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
                <ImprovementItem label="Complete your profile" percentage={70} />
                <ImprovementItem label="Schedule your year's check-up" percentage={70} />
                <ImprovementItem label="Watch 'Healthy Living' lesson" percentage={70} />
                <ImprovementItem label="Review security settings" percentage={70} />
            </CardContent>
        </Card>
    );
};