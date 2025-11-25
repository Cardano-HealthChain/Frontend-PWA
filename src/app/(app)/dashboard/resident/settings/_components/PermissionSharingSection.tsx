import { Button } from "@/components/ui/button";
import { ArrowRight, Share2, Lock, Clock } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import Link from "next/link";
import * as React from "react";

const mockRecentPermissions = [
    { clinic: "Sunrise Medical Centre", access: "Full Access", expires: "in 7 days" },
    { clinic: "Maplewood Lab", access: "Lab Results only", expires: "in 30 days" },
];

export const PermissionsSharingSection = () => (
    <div className="space-y-6 border-none bg-white rounded-lg p-4">
        <SectionContainer title="Access Management">
            <p className="text-sm text-muted-foreground">Quickly review and manage who currently has access to your health records.</p>
            <div className="flex flex-wrap gap-3 mt-4">
                <Button className="rounded-lg" asChild><Link href="/dashboard/resident/permissions"><Lock className="mr-2 h-4 w-4" /> Go to Permissions Page</Link></Button>
                <Button variant="outline" className="rounded-lg border-primary"><Share2 className="mr-2 h-4 w-4" /> Share New Access</Button>
            </div>
        </SectionContainer>

        <SectionContainer title="Recent Access Grants">
            <p className="text-sm text-muted-foreground mb-4">A snapshot of the most recent access you have granted.</p>

            <div className="space-y-4">
                {mockRecentPermissions.map((p, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border border-primary rounded-md">
                        <div>
                            <p className="font-medium">{p.clinic}</p>
                            <span className="text-xs text-muted-foreground">{p.access}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-semibold text-primary">{p.expires}</span>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Expiry
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <Button variant="link" asChild><Link href="/dashboard/resident/permissions">View All Permissions <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
            </div>
        </SectionContainer>
    </div>
);