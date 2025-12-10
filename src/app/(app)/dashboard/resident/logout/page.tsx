// app/dashboard/resident/logout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { HealthChainLoader } from '@/components/ui/HealthChainLoader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LogoutPage() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.logout);
  const [status, setStatus] = useState<'logging-out' | 'logged-out' | 'error'>('logging-out');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Clear Zustand store
        clearAuth();
        
        // Call API logout
        await logout();
        
        setStatus('logged-out');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
        
      } catch (err) {
        console.error('Logout error:', err);
        setError('Failed to log out. Please try again.');
        setStatus('error');
        
        // Still try to redirect on error after 3 seconds
        setTimeout(() => {
          router.push('/sign-in');
        }, 3000);
      }
    };

    performLogout();
  }, [clearAuth, router]);

  if (status === 'logging-out') {
    return <HealthChainLoader loadingText="Logging you out..." />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {status === 'logged-out' ? 'Logged Out Successfully' : 'Logout Error'}
          </CardTitle>
          <CardDescription>
            {status === 'logged-out' 
              ? 'You have been successfully logged out.'
              : 'There was an issue logging you out.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'logged-out' ? (
            <>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">Redirecting you to the sign-in page...</p>
              <Button onClick={() => router.push('/sign-in')} variant="default">
                Go to Sign In
              </Button>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-600 mb-2">{error}</p>
              <p className="text-gray-600 mb-4">You will be redirected shortly.</p>
              <Button onClick={() => router.push('/sign-in')} variant="destructive">
                Go to Sign In Now
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}