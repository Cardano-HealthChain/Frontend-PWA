// components/AuthProvider.tsx
"use client"

import { useEffect, useState } from 'react';
import { initializeAuth, useAuthStore } from '@/store/authStore';
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const isReady = useAuthStore((state) => state.isReady);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        initializeAuth();
    }, []);

    // Show loading state until auth is initialized
    if (!mounted || !isReady) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <HealthChainLoader />
            </div>
        );
    }

    return <>{children}</>;
}