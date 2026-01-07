"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BarChart,
  Users,
  Calendar,
  FileText,
  ClipboardList,
  Clock,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/doctor", label: "Dashboard", icon: BarChart },
  { href: "/dashboard/doctor/patients", label: "Patients", icon: Users },
  { href: "/dashboard/doctor/records", label: "Records", icon: FileText },
  { href: "/dashboard/doctor/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/doctor/appointments", label: "Appointments", icon: Calendar, comingSoon: true },
  { href: "/dashboard/doctor/prescriptions", label: "Prescriptions", icon: ClipboardList, comingSoon: true },
  { href: "/dashboard/doctor/schedule", label: "Schedule", icon: Clock, comingSoon: true },
];

const secondaryItems = [
  { href: "/dashboard/doctor/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/doctor/logout", label: "Log Out", icon: LogOut },
];

export const DoctorSidebarNav = ({ doctor }: { doctor: { name: string; specialty?: string } }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // For the main dashboard page, only match exact path
    if (href === "/dashboard/doctor") {
      return pathname === "/dashboard/doctor";
    }

    // For other pages, check if pathname starts with href
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-[250px] flex-col justify-between bg-primary p-4 text-white shadow-lg flex">
      {/* Top Section */}
      <div>
        <Link href="/dashboard/doctor" className="mb-8 flex items-center justify-center">
          <Image
            src="/images/logo0.png"
            alt="HealthChain Logo"
            width={150}
            height={150}
            onError={(e) => (e.currentTarget.src = "https://placehold.co/150x150/ffffff/000000?text=H")}
          />
        </Link>

        {/* Main Nav Items */}
        <ul className="space-y-2 mt-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const disabled = item.comingSoon;

            const content = (
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors",
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : isActive(item.href)
                      ? "bg-white text-primary shadow-md"
                      : "text-primary-foreground/80 hover:bg-primary/80 hover:text-white"
                )}
              >
                <div className="flex items-center">
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </div>

                {disabled && (
                  <span className="ml-2 rounded-xl bg-yellow-400/40 border border-yellow-400 px-2 py-0.5 text-[10px] font-semibold text-yellow-200 whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
              </div>
            );

            return (
              <li key={item.href}>
                {disabled ? (
                  content
                ) : (
                  <Link href={item.href}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        <ul className="space-y-2 border-t border-primary-foreground/20 pt-4">
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg p-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white text-primary shadow-md"
                      : "text-primary-foreground/80 hover:bg-primary/80 hover:text-white"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User Badge */}
        <div className="flex flex-col space-y-2 rounded-lg bg-primary-foreground/10 p-3 text-sm">
          <div className="flex items-center space-x-3">
            <span className="h-8 w-8 rounded-full bg-white text-primary flex items-center justify-center font-bold text-sm">
              {doctor?.name ? doctor.name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2) : 'DR'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium capitalize truncate">
                Dr. {doctor?.name?.split(' ')[0] || 'Doctor'}
              </p>
              {doctor?.specialty && (
                <p className="text-xs text-primary-foreground/60 truncate">
                  {doctor.specialty}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};