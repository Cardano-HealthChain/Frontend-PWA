//Permission Grid
"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Permission } from "@/lib/api";

type PermissionGridProps = {
    permissions: Permission[];
    onPermissionSelect: (permission: Permission) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isLoading?: boolean;
    onLoadMore?: () => void;
    hasMore?: boolean;
};

const getStatusColor = (permission: Permission) => {
    if (permission.revoked) return "bg-red-100 text-red-700";
    if (permission.granted) return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
};

const getStatus = (permission: Permission) => {
    if (permission.revoked) return "Revoked";
    if (permission.granted) {
        // Check if expiring soon (you'd need expiry date in Permission type)
        return "Active";
    }
    return "Inactive";
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
};

const getAccessLevelDisplay = (accessType: string) => {
    const mapping: Record<string, string> = {
        'READ': 'Read-Only',
        'WRITE': 'Write-Only',
        'READANDWRITE': 'Full Access',
    };
    return mapping[accessType] || accessType;
};

const PermissionCard = ({ permission, onClick }: { permission: Permission; onClick: () => void }) => (
    <Card
        className={cn(
            "cursor-pointer transition-all hover:shadow-md hover:border-primary/50 border-gray-200",
            permission.revoked && "opacity-60"
        )}
        onClick={onClick}
    >
        <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                        🏥
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary">{permission.clinic_name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            ID: {permission.clinic_id}
                        </p>
                    </div>
                </div>
                <span className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
                    getStatusColor(permission)
                )}>
                    {getStatus(permission)}
                </span>
            </div>

            <div className="space-y-1 text-xs">
                <InfoRow
                    label="Access Level"
                    value={getAccessLevelDisplay(permission.access_type)}
                />
                <InfoRow
                    label="Granted On"
                    value={formatDate(permission.granted_at)}
                />
                <InfoRow
                    label="Last Activity"
                    value={formatTimeAgo(permission.granted_at)}
                />
                {permission.revoked_at && (
                    <InfoRow
                        label="Revoked On"
                        value={formatDate(permission.revoked_at)}
                    />
                )}
            </div>
        </CardContent>
    </Card>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between">
        <span className="text-muted-foreground text-sm">{label}</span>
        <span className="font-medium text-right text-sm">{value}</span>
    </div>
);

export const PermissionGrid = ({
    permissions,
    onPermissionSelect,
    searchQuery,
    onSearchChange,
    isLoading,
    onLoadMore,
    hasMore,
}: PermissionGridProps) => {
    const [localSearch, setLocalSearch] = useState(searchQuery);

    // Debounce search
    const handleSearchChange = (value: string) => {
        setLocalSearch(value);
        const timer = setTimeout(() => {
            onSearchChange(value);
        }, 500);
        return () => clearTimeout(timer);
    };

    // Filter permissions locally
    const filteredPermissions = useMemo(() => {
        if (!localSearch.trim()) return permissions;

        const query = localSearch.toLowerCase();
        return permissions.filter(p =>
            p.clinic_name.toLowerCase().includes(query) ||
            p.clinic_id.toLowerCase().includes(query) ||
            p.access_type.toLowerCase().includes(query)
        );
    }, [permissions, localSearch]);

    return (
        <div>
            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by clinic name or ID..."
                        value={localSearch}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Permissions</h2>
                <span className="text-sm text-muted-foreground">
                    {filteredPermissions.length} permission{filteredPermissions.length !== 1 ? 's' : ''}
                </span>
            </div>

            {filteredPermissions.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">
                        {localSearch ? "No permissions found matching your search" : "No permissions found"}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredPermissions.map((permission) => (
                            <PermissionCard
                                key={permission.permissions_id}
                                permission={permission}
                                onClick={() => onPermissionSelect(permission)}
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="flex justify-center mt-6">
                            <Button
                                variant="outline"
                                onClick={onLoadMore}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    "Load More"
                                )}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};