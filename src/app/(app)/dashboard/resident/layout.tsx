"use client";

import { useAuthStore, initializeAuth } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import { SidebarNav } from "./_components/SidebarNav";
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock user data - You can replace this with actual user data from your store
const MOCK_USER = {
  name: "Joshua Aladeloye",
  did: "345EUQX",
  dob: "25-10-2023",
  gender: "MALE",
  region: "Nigeria / Abuja",
  profileComplete: 70,
};

// The protected layout for all dashboard pages (/dashboard, /settings, etc.)
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isReady, userRole } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  }, [isReady, isAuthenticated, userRole, router, pathname]);

  // 3. Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // 4. Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // 5. Show loader while checking credentials
  if (!isReady || !isAuthenticated) {
    return <HealthChainLoader loadingText="Verifying Credentials..." />;
  }

  // 6. Render the dashboard UI if authenticated
  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <SidebarNav user={MOCK_USER} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-[280px] z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <SidebarNav user={MOCK_USER} />
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[250px] w-full">
        {/* Header - Responsive */}
        <header className="sticky top-0 z-30 flex h-16 md:h-24 items-center justify-between border-b border-muted-foreground bg-white px-4 shadow-sm">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Search Bar - Hidden on mobile, visible on desktop */}
          <div className="relative hidden md:flex items-center w-full max-w-md">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search For Anything"
              className="w-full rounded-lg border border-border bg-secondary py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Mobile Logo - Centered on mobile */}
          <div className="md:hidden flex-1 flex justify-center">
            <Image
              src="/images/logo0.png"
              alt="HealthChain"
              width={120}
              height={40}
              className="object-contain"
              onError={(e) => (e.currentTarget.src = "https://placehold.co/120x40/6002ee/ffffff?text=HC")}
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Bell Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell className="h-5 w-5 lg:h-8 md:w-8 text-muted-foreground" />
              {/* Notification badge */}
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Profile - Simplified on mobile */}
            <div className="h-10 rounded-full bg-primary/20 flex items-center gap-2 md:gap-3 px-2 cursor-pointer hover:bg-primary/30 transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/images/avatar.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/32x32/6002ee/ffffff?text=U")}
                />
              </div>
              <span className="hidden md:inline text-lg font-medium text-primary">|</span>
              <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Page Content - Changes based on route */}
        <main className="flex-1 p-4 md:px-8 md:py-4 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}