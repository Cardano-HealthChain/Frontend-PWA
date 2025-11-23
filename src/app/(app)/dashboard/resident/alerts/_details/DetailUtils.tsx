import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import * as React from "react";

export const DetailHeader = ({ title, subInfo, onClose }: { title: string, subInfo: string, onClose: () => void }) => (
    <div className="flex justify-between items-start pb-4 border-b border-gray-200">
        <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{subInfo}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="flex-shrink-0">
            <X className="h-5 w-5" />
        </Button>
    </div>
);

export const DetailSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mt-6 space-y-3">
        <h4 className="text-md font-semibold border-b border-gray-200 pb-1">{title}</h4>
        {children}
    </div>
);