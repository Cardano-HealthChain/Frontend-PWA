import { Card } from "@/components/ui/card";
import * as React from "react";

// Reusable container for sub-sections within a main settings tab
export const SectionContainer = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <Card className="p-6 border-none">
        <h3 className="text-lg font-bold border-b border-gray-200 pb-3 mb-4">{title}</h3>
        {children}
    </Card>
);