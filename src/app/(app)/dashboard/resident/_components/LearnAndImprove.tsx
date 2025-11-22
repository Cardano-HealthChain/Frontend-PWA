import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LearnCard = ({ card }: { card: any }) => (
    <Card className="shadow-sm p-4 h-full flex flex-col justify-between border-none">
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
        <div className="flex flex-col items-center relative">
            {/* Missions/Modules */}
            <div className="flex justify-between items-center w-full mb-4">
                <h2 className="text-xl font-bold">Learn & Improve</h2>
                <Link
                    href="/alerts"
                    className="text-sm font-semibold text-primary hover:text-primary/80 underline ml-2"
                >
                    See More
                </Link>
            </div>

            {/* Content Container with Overlay */}
            <div className="relative w-full">
                {/* Grid Content */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 blur-sm opacity-60 pointer-events-none">
                    {learnCards.map((card, i) => (
                        <LearnCard key={i} card={card} />
                    ))}
                </div>

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <div className="text-center p-8 rounded-lg bg-card shadow-2xl border border-primary">
                        <h3 className="text-xl md:text-3xl font-extrabold text-primary mb-2">
                            Coming Soon
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base">
                            This feature is under development
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};