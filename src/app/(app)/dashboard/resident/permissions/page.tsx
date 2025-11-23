"use client";

import { useState } from "react";
import { PermissionSummaryCards } from "./_components/PermissionSummaryCards";
import { PermissionGrid } from "./_components/PermissionGrid";
import { PermissionDetailPanel } from "./_components/PermissionDetailPanel";
import { cn } from "@/lib/utils";

export default function PermissionsPage() {
    const [selectedPermission, setSelectedPermission] = useState<any | null>(null);

    return (
        <div className="space-y-6">
            {/* Summary Cards - Full Width (Not affected by panel) */}
            <PermissionSummaryCards />

            {/* Grid Section with Detail Panel */}
            <div className="flex gap-6">
                {/* Permissions Grid - Shrinks when panel opens */}
                <div className={cn("flex-1 transition-all duration-300", selectedPermission && "lg:w-[calc(100%-450px-1.5rem)]")}>
                    <PermissionGrid onPermissionSelect={setSelectedPermission} searchQuery="" />
                </div>

                {/* Desktop Detail Panel - Appears beside grid */}
                {selectedPermission && (
                    <div className="hidden lg:block w-[450px] flex-shrink-0">
                        <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
                            <PermissionDetailPanel permission={selectedPermission} onClose={() => setSelectedPermission(null)} />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Detail Panel - Full screen overlay */}
            {selectedPermission && (
                <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
                    <PermissionDetailPanel permission={selectedPermission} onClose={() => setSelectedPermission(null)} />
                </div>
            )}
        </div>
    );
}