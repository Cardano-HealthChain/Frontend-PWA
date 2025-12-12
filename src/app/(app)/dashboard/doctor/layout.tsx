"use client";

import { useAuthStore, initializeAuth } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import { DoctorSidebarNav } from "./_components/SidebarNav";
import { Search, Bell, ChevronDown, Menu, X, User, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDoctorDashboard } from "@/hooks/useDoctorDashboard";
import { useLogout } from '@/hooks/useLogout';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isReady, userRole } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data } = useDoctorDashboard(true);


   const doctor = {
     name: data?.doctor?.name || "Doctor",
     specialty: data?.doctor?.specialty || "General Medicine",
     clinic: data?.doctor?.clinic_name || "HealthChain",
  };
  // Transform API data to match component props
  // const doctor = data?.doctor ? {
  //   name: `${data.doctor.name || "Doctor"}`,
  //   specialty: data.doctor.specialty || "General Medicine",
  //   clinic: data.doctor.clinic_name || "HealthChain",
  // } : null;

  // Initialize auth state on mount
  useEffect(() => {
    if (!isReady) {
      initializeAuth();
    }
  }, [isReady]);

  // Redirect logic when auth state changes
  // useEffect(() => {
  //   if (isReady && !isAuthenticated) {
  //     router.push(`/sign-in?redirect=${pathname}`);
  //   } else if (isReady && isAuthenticated && userRole !== 'doctor') {
  //     // Redirect if user is not a doctor
  //     router.push('/dashboard/resident');
  //   }
  // }, [isReady, isAuthenticated, userRole, router, pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
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

  // Show loader while checking credentials
  // if (!isReady || !isAuthenticated) {
  //   return <HealthChainLoader loadingText="Verifying Credentials..." />;
  // }

  // Handle logout
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await logout();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        {doctor && <DoctorSidebarNav doctor={doctor} />}
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
            {doctor && <DoctorSidebarNav doctor={doctor} />}
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

          {/* Search Bar - Hidden on mobile */}
          <div className="relative hidden md:flex items-center w-full max-w-md">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search patients, appointments..."
              className="w-full rounded-lg border border-border bg-secondary py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Mobile Logo */}
          <div className="md:hidden flex-1 flex justify-center">
            <Image
              src="/images/logo.png"
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
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 lg:h-8 md:w-8 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-10 rounded-full bg-primary/20 flex items-center gap-2 md:gap-3 px-2 cursor-pointer hover:bg-primary/30 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Image
                      src="/images/avatar.png"
                      alt="Doctor Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                      onError={(e) => (e.currentTarget.src = "https://placehold.co/32x32/6002ee/ffffff?text=D")}
                    />
                  </div>
                  <span className="hidden md:inline text-lg font-medium text-primary">|</span>
                  <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-none">
                <div className="px-2 py-1.5">
                  <p className="text-lg font-medium text-primary">
                    Dr. {doctor?.name || "Doctor"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {doctor?.specialty || "Healthcare Professional"}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard/doctor/settings" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard/doctor/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                  <Link href="/dashboard/doctor/logout" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:px-8 md:py-4 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}