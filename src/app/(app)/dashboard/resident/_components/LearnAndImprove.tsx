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
        </div>
    );
};