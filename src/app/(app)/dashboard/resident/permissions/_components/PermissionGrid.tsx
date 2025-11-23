import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockPermissions = [
    {
        name: "Sunrise Medical Centre",
        type: "Multi-specialty Clinic",
        accessLevel: "Full Access",
        status: "Active",
        validUntil: "Feb 24, 2025",
        lastAccessed: "Today, 10:14 AM",
        icon: "🏥"
    },
    {
        name: "Emerald Hospital",
        type: "Hospital",
        accessLevel: "Read-Only",
        status: "Expiring Soon",
        validUntil: "In 3 days",
        lastAccessed: "Yesterday, 3:20 PM",
        icon: "🏥"
    },
    {
        name: "Maplewood Diagnostics Lab",
        type: "Lab",
        accessLevel: "Partial Access (Labs + Imaging only)",
        status: "Active",
        validUntil: "Mar 10, 2025",
        lastAccessed: "Today, 08:12 AM",
        icon: "🔬"
    },
    {
        name: "HavenPoint Clinic",
        type: "Clinic",
        accessLevel: "Full Access",
        status: "Expired",
        validUntil: "7 days ago",
        lastAccessed: "Jan 5",
        icon: "🏥"
    },
    {
        name: "Crystal Eye Centre",
        type: "Specialist Clinic",
        accessLevel: "Partial Access (Eye records only)",
        status: "Active",
        validUntil: "Apr 1, 2025",
        lastAccessed: "Today, 6:55 AM",
        icon: "👁️"
    },
    {
        name: "Royal Crest Diagnostics",
        type: "Diagnostic Centre",
        accessLevel: "Full Access",
        status: "Revoked",
        validUntil: "Feb 24, 2025",
        lastAccessed: "Revoked On",
        icon: "🔬"
    },
];

type PermissionGridProps = {
    onPermissionSelect: (permission: any) => void;
    searchQuery: string;
};

const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    if (status === "Expiring Soon") return "bg-yellow-100 text-yellow-700";
    if (status === "Expired") return "bg-red-100 text-red-700";
    if (status === "Revoked") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
};

const PermissionCard = ({ permission, onClick }: any) => (
    <Card
        className={cn(
            "cursor-pointer transition-all hover:shadow-md hover:border-primary/50",
            permission.status === "Revoked" && "opacity-60"
        )}
        onClick={onClick}
    >
        <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                        {permission.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary">{permission.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{permission.type}</p>
                    </div>
                </div>
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap", getStatusColor(permission.status))}>
                    {permission.status}
                </span>
            </div>

            <div className="space-y-1 text-xs">
                <InfoRow label="Access Level" value={permission.accessLevel} />
                <InfoRow label="Status" value={permission.status} />
                <InfoRow label="Valid Until" value={permission.validUntil} />
                <InfoRow label="Last Accessed" value={permission.lastAccessed} />
            </div>
        </CardContent>
    </Card>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">{value}</span>
    </div>
);

export const PermissionGrid = ({ onPermissionSelect, searchQuery }: PermissionGridProps) => {
    const filteredPermissions = mockPermissions.filter(permission =>
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Permissions</h2>
                <Button variant="link" className="text-primary">See More</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPermissions.map((permission, i) => (
                    <PermissionCard
                        key={i}
                        permission={permission}
                        onClick={() => onPermissionSelect(permission)}
                    />
                ))}
            </div>
        </div>
    );
};