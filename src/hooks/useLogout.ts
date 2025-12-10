// hooks/useLogout.ts
'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { logout as apiLogout } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

export function useLogout() {
    const router = useRouter();
    const { toast } = useToast();
    const clearAuth = useAuthStore((state) => state.logout);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);

            // Clear Zustand store
            clearAuth();

            // Call API logout (optional)
            await apiLogout();

            // Show success message
            toast({
                title: 'Logged out successfully',
                description: 'You have been signed out of your account.',
            });

            // Redirect to sign-in
            router.push('/sign-in');

        } catch (error) {
            console.error('Logout error:', error);

            // Still clear local state even if API fails
            clearAuth();

            // Force redirect
            if (typeof window !== 'undefined') {
                window.location.href = '/sign-in';
            }

        } finally {
            setIsLoggingOut(false);
        }
    };

    return {
        logout: handleLogout,
        isLoggingOut,
    };
}