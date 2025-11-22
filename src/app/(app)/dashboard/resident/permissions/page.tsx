"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PermissionSummaryCards } from "./_components/PermissionSummaryCards";
import { PermissionGrid } from "./_components/PermissionGrid";
import { PermissionDetailPanel } from "./_components/PermissionDetailPanel";
import { cn } from "@/lib/utils";

export default function PermissionsPage() {
    const [selectedPermission, setSelectedPermission] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex h-full w-full">
            {/* Main Content */}
            <div className={cn("flex-1 transition-all duration-300", selectedPermission && "lg:w-[calc(100%-450px)]")}>
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search Permissions"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Summary Cards */}
                <PermissionSummaryCards />

                {/* Permissions Grid */}
                <PermissionGrid onPermissionSelect={setSelectedPermission} searchQuery={searchQuery} />
            </div>

            {/* Desktop Detail Panel */}
            {selectedPermission && (
                <div className="hidden lg:block w-[450px] h-[calc(100vh-6rem)] sticky top-24">
                    <PermissionDetailPanel permission={selectedPermission} onClose={() => setSelectedPermission(null)} />
                </div>
            )}

            {/* Mobile Detail Panel */}
            {selectedPermission && (
                <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
                    <PermissionDetailPanel permission={selectedPermission} onClose={() => setSelectedPermission(null)} />
                </div>
            )}
        </div>
    );
}