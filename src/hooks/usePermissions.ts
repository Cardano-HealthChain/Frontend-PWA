// hooks/usePermissions.ts
"use client";

import { useState, useEffect } from "react";
import {
    getPermissions,
    grantPermission,
    revokePermission,
    Permission
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface UsePermissionsReturn {
    permissions: Permission[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    grant: (clinicId: string, accessType: 'READ' | 'WRITE' | 'READANDWRITE') => Promise<boolean>;
    revoke: (clinicId: string) => Promise<boolean>;
    loadMore: () => Promise<void>;
    hasMore: boolean;
    currentPage: number;
}

export function usePermissions(autoFetch: boolean = true): UsePermissionsReturn {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { toast } = useToast();

    const fetchPermissions = async (page: number = 0, append: boolean = false) => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await getPermissions(page);
            const newPermissions = response.data;

            if (append) {
                setPermissions(prev => [...prev, ...newPermissions]);
            } else {
                setPermissions(newPermissions);
            }

            // Check if there are more permissions
            setHasMore(newPermissions.length >= 10); // Assuming page size is 10
            setCurrentPage(page);

        } catch (err: any) {
            console.error("Error fetching permissions:", err);
            setError(err);

            toast({
                title: "Error Loading Permissions",
                description: err.message || "Failed to load permissions",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const refetch = async () => {
        await fetchPermissions(0, false);
    };

    const loadMore = async () => {
        if (!hasMore || isLoading) return;
        await fetchPermissions(currentPage + 1, true);
    };

    const grant = async (
        clinicId: string,
        accessType: 'READ' | 'WRITE' | 'READANDWRITE'
    ): Promise<boolean> => {
        try {
            setIsLoading(true);
            await grantPermission(clinicId, accessType);

            toast({
                title: "Permission Granted",
                description: `Successfully granted ${accessType} access`,
            });

            // Refresh permissions list
            await refetch();
            return true;
        } catch (err: any) {
            console.error("Error granting permission:", err);

            toast({
                title: "Error Granting Permission",
                description: err.message || "Failed to grant permission",
                variant: "destructive",
            });

            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const revoke = async (clinicId: string): Promise<boolean> => {
        try {
            setIsLoading(true);
            await revokePermission(clinicId);

            toast({
                title: "Permission Revoked",
                description: "Successfully revoked access",
            });

            // Refresh permissions list
            await refetch();
            return true;
        } catch (err: any) {
            console.error("Error revoking permission:", err);

            toast({
                title: "Error Revoking Permission",
                description: err.message || "Failed to revoke permission",
                variant: "destructive",
            });

            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchPermissions(0, false);
        }
    }, []);

    return {
        permissions,
        isLoading,
        error,
        refetch,
        grant,
        revoke,
        loadMore,
        hasMore,
        currentPage,
    };
}

/**
 * Hook to get permission statistics
 */
export function usePermissionStats() {
    const { permissions, isLoading } = usePermissions(true);

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    const stats = {
        active: permissions.filter(p => p.granted && !p.revoked).length,
        expiringSoon: permissions.filter(p => {
            if (!p.granted || p.revoked) return false;
            // You'd need to add expiry date to Permission type to calculate this properly
            return false; // Placeholder
        }).length,
        recentlyUsed: permissions.filter(p => {
            if (!p.granted || p.revoked) return false;
            const grantedDate = new Date(p.granted_at);
            return grantedDate > threeDaysAgo;
        }).length,
        revoked: permissions.filter(p => p.revoked).length,
    };

    return { stats, isLoading };
}