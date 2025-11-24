import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { menuItems } from "../_data/SettingsData";
import * as React from "react";

// Individual menu item component
const SettingsMenuItem = ({ icon: Icon, title, subtitle, active, onClick }: { icon: any, title: string, subtitle: string, active: boolean, onClick: () => void }) => (
    <Card
        className={cn("p-4 border-0 cursor-pointer transition-colors", active ? "bg-primary text-white shadow-md" : "hover:bg-secondary/50 ")}
        onClick={onClick}
    >
        <div className="flex items-center space-x-4">
            <Icon className={cn("h-6 w-6", active ? "text-white" : "text-muted-foreground")} />
            <div>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                <p className={cn("text-xs text-muted-foreground", active ? "text-white" : "")}>{subtitle}</p>
            </div>
        </div>
    </Card>
);

interface SettingsNavProps {
    activeSection: string;
    setActiveSection: (id: string) => void;
}

// Main navigation component for the left column
export const SettingsNav: React.FC<SettingsNavProps> = ({ activeSection, setActiveSection }) => (
    <Card className="lg:col-span-2 shadow-lg h-fit border-none">
        <CardContent className="p-4 space-y-2">
            {menuItems.map((item) => (
                <SettingsMenuItem
                    key={item.id}
                    {...item}
                    active={item.id === activeSection}
                    onClick={() => setActiveSection(item.id)}
                />
            ))}
        </CardContent>
    </Card>
);