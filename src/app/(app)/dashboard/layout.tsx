"use client";

import { useAuthStore, initializeAuth } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader"; // Use the loader

// The protected layout for all dashboard pages (/dashboard, /settings, etc.)
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isReady, userRole } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Initialize auth state on mount
  useEffect(() => {
    if (!isReady) {
        initializeAuth();
    }
  }, [isReady]);

  // 2. Redirect logic when auth state changes
  useEffect(() => {
    if (isReady && !isAuthenticated) {
        // Redirect unauthorized users to the login page
        router.push(`/sign-in?redirect=${pathname}`);
    }
    // Optional: Add logic here to check if userRole matches required permissions for the path
    // if (isReady && isAuthenticated && userRole !== 'resident' && pathname.includes('/resident')) {
    //     router.push('/unauthorized');
    // }
  }, [isReady, isAuthenticated, userRole, router, pathname]);

  // 3. Show loader while checking credentials
  if (!isReady || !isAuthenticated) {
    return <HealthChainLoader loadingText="Verifying Credentials..." />;
  }
  
  // 4. Render the dashboard UI if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Your Dashboard Navbar / Sidebar component would go here */}
        <div className="py-">{children}</div>
    </div>
  );
}


// import React from 'react'

// function layout() {
//   return (
//     <div>layout</div>
//   )
// }

// export default layout