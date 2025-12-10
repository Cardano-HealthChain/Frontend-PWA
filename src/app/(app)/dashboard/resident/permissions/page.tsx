// app/dashboard/resident/permissions/page.tsx
"use client";

import { useState } from "react";
import { PermissionSummaryCards } from "./_components/PermissionSummaryCards";
import { PermissionGrid } from "./_components/PermissionGrid";
import { PermissionDetailPanel } from "./_components/PermissionDetailPanel";
import { cn } from "@/lib/utils";
import { usePermissions } from "@/hooks/usePermissions";
import { Permission } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PermissionsPage() {
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        permissions,
        isLoading,
        error,
        refetch,
        grant,
        revoke,
        loadMore,
        hasMore
    } = usePermissions(true);

    // Loading State
    if (isLoading && permissions.length === 0) {
        return <PermissionsPageSkeleton />;
    }

    // Error State
    if (error && permissions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <h2 className="text-2xl font-bold">Failed to Load Permissions</h2>
                <p className="text-muted-foreground">
                    We couldn't load your permissions. Please try again.
                </p>
                <Button onClick={refetch}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                </Button>
            </div>
        );
    }

    const handleRevoke = async (permission: Permission) => {
        const success = await revoke(permission.clinic_id);
        if (success) {
            setSelectedPermission(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Summary Cards - Full Width (Not affected by panel) */}
            <PermissionSummaryCards permissions={permissions} />

            {/* Grid Section with Detail Panel */}
            <div className="flex gap-6">
                {/* Permissions Grid - Shrinks when panel opens */}
                <div className={cn("flex-1 transition-all duration-300", selectedPermission && "lg:w-[calc(100%-450px-1.5rem)]")}>
                    <PermissionGrid
                        permissions={permissions}
                        onPermissionSelect={setSelectedPermission}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        isLoading={isLoading}
                        onLoadMore={loadMore}
                        hasMore={hasMore}
                    />
                </div>

                {/* Desktop Detail Panel - Appears beside grid */}
                {selectedPermission && (
                    <div className="hidden lg:block w-[450px] flex-shrink-0">
                        <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
                            <PermissionDetailPanel
                                permission={selectedPermission}
                                onClose={() => setSelectedPermission(null)}
                                onRevoke={handleRevoke}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Detail Panel - Full screen overlay */}
            {selectedPermission && (
                <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
                    <PermissionDetailPanel
                        permission={selectedPermission}
                        onClose={() => setSelectedPermission(null)}
                        onRevoke={handleRevoke}
                    />
                </div>
            )}
        </div>
    );
}

// Loading Skeleton
function PermissionsPageSkeleton() {
    return (
        <div className="space-y-6">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="p-4">
                        <Skeleton className="h-24 w-full" />
                    </Card>
                ))}
            </div>

            {/* Grid Skeleton */}
            <div>
                <Skeleton className="h-8 w-[200px] mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="p-4">
                            <Skeleton className="h-32 w-full" />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}