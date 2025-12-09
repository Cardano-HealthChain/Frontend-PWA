"use client";

import { useState, useEffect, useCallback } from "react";
import { getAlerts, markAlertAsRead } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';

const alertSchema = z.object({
  alert_id: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(['High', 'Medium', 'Low']),
  alert_type: z.string(),
  created_at: z.string().datetime(),
  read: z.boolean(),
  metadata: z.record(z.string(), z.any()).optional(),
});

type Alert = z.infer<typeof alertSchema>;

const alertsArraySchema = z.array(alertSchema);

interface UseAlertsReturn {
    alerts: Alert[] | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    markAsRead: (alertId: string) => Promise<void>;
    unreadCount: number;
}

export function useAlerts(): UseAlertsReturn {
    const [alerts, setAlerts] = useState<Alert[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { toast } = useToast();

    const fetchAlerts = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await getAlerts(0);

            // Validate response with Zod
            const validatedAlerts = alertsArraySchema.parse(response.data);

            setAlerts(validatedAlerts);
        } catch (err: any) {
            console.error("Error fetching alerts:", err);
            setError(err);

            toast({
                title: "Error Loading Alerts",
                description: err.message || "Failed to load alerts",
                variant: "destructive",
            });

            // Fallback to empty array if API fails
            if (!alerts) {
                setAlerts([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const markAsRead = useCallback(async (alertId: string) => {
        try {
            await markAlertAsRead(alertId);

            // Update local state
            setAlerts(prev =>
                prev?.map(alert =>
                    alert.alert_id === alertId
                        ? { ...alert, read: true }
                        : alert
                ) || null
            );

            toast({
                title: "Alert Marked as Read",
                description: "Alert has been marked as read",
            });
        } catch (err: any) {
            console.error("Error marking alert as read:", err);
            toast({
                title: "Error",
                description: "Failed to mark alert as read",
                variant: "destructive",
            });
        }
    }, [toast]);

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    // Calculate unread count
    const unreadCount = alerts?.filter(alert => !alert.read).length || 0;

    return {
        alerts,
        isLoading,
        error,
        refetch: fetchAlerts,
        markAsRead,
        unreadCount,
    };
}