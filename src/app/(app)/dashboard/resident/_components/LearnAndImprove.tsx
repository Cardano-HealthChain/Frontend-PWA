import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LearnCard = ({ card }: { card: any }) => (
    <Card className="shadow-sm p-4 h-full flex flex-col justify-between">
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm text-muted-foreground">
                {card.comingSoon ? "Coming Soon: Actionable steps for long-term health management." : "A quick guide to keeping your records up-to-date and reliable."}
            </p>
        </div>
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-border">
            <span className={cn("text-xs font-semibold", card.comingSoon ? "text-muted-foreground" : "text-primary")}>
                {card.comingSoon ? "Coming Soon" : "Mission Ready"}
            </span>
            <Button size="sm" disabled={card.comingSoon} variant={card.comingSoon ? "outline" : "default"} asChild>
                <Link href={card.comingSoon ? "#" : "/missions"}>
                    {card.status}
                </Link>
            </Button>
        </div>
    </Card>
);

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

export const LearnAndImprove = ({ learnCards }: { learnCards: any[] }) => {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Missions/Modules */}
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-bold">Learn & Improve</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {learnCards.map((card, i) => (
                        <LearnCard key={i} card={card} />
                    ))}
                </div>
            </div>

            {/* Progress Checklist (Right Column) */}
            <Card className="shadow-lg p-4 md:col-span-1">
                <CardHeader className="p-0 pb-2 flex-row justify-between items-center">
                    <CardTitle className="text-base font-semibold">Your Progress</CardTitle>
                    <Link href="#" className="text-xs font-semibold text-primary/80 hover:text-primary">
                        See More
                    </Link>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                    <ImprovementItem label="Complete your profile" percentage={70} />
                    <ImprovementItem label="Schedule your year's check-up" percentage={70} />
                    <ImprovementItem label="Watch 'Healthy Living' lesson" percentage={70} />
                    <ImprovementItem label="Review security settings" percentage={70} />
                </CardContent>
            </Card>
        </div>
    );
};