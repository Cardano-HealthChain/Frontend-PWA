// hooks/useDashboard.ts
"use client";

import { useState, useEffect } from "react";
import { loadDashboard, loadDashboardSafe, DashboardData } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface UseDashboardReturn {
    data: Partial<DashboardData> | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch all dashboard data at once
 * Uses Promise.all for efficient parallel fetching
 * 
 * @param useSafeMode - If true, uses Promise.allSettled to return partial data on errors
 */
export function useDashboard(useSafeMode: boolean = true): UseDashboardReturn {
    const [data, setData] = useState<Partial<DashboardData> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { toast } = useToast();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            let dashboardData: Partial<DashboardData>;

            if (useSafeMode) {
                // Safe mode: Returns partial data if some requests fail
                dashboardData = await loadDashboardSafe();
            } else {
                // Strict mode: Fails if any request fails
                dashboardData = await loadDashboard();
            }

            setData(dashboardData);
        } catch (err: any) {
            console.error("Error fetching dashboard data:", err);
            setError(err);

            toast({
                title: "Error Loading Dashboard",
                description: err.message || "Failed to load dashboard data",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
    };
}

/**
 * Alternative hook with manual trigger
 */
export function useDashboardLazy() {
    const [data, setData] = useState<Partial<DashboardData> | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { toast } = useToast();

    const loadData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const dashboardData = await loadDashboardSafe();
            setData(dashboardData);

            return dashboardData;
        } catch (err: any) {
            console.error("Error fetching dashboard data:", err);
            setError(err);

            toast({
                title: "Error Loading Dashboard",
                description: err.message || "Failed to load dashboard data",
                variant: "destructive",
            });

            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        error,
        loadData,
    };
}