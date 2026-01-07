"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BarChart,
  Stethoscope,
  Users,
  Calendar,
  FileText,
  FileBarChart,
  PieChart,
  AlertCircle,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/clinic", label: "Dashboard", icon: BarChart },
  { href: "/dashboard/clinic/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/dashboard/clinic/patients", label: "Patients", icon: Users },
  { href: "/dashboard/clinic/records", label: "Records", icon: FileText },
  { href: "/dashboard/clinic/alerts", label: "Alerts", icon: AlertCircle },
  { href: "/dashboard/clinic/appointments", label: "Appointments", icon: Calendar, comingSoon: true },
  { href: "/dashboard/clinic/reports", label: "Reports", icon: FileBarChart, comingSoon: true },
  { href: "/dashboard/clinic/analytics", label: "Analytics", icon: PieChart, comingSoon: true },
];


const secondaryItems = [
  { href: "/dashboard/clinic/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/clinic/logout", label: "Log Out", icon: LogOut },
];

export const ClinicSidebarNav = ({ clinic }: { clinic: { name: string; location?: string } }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // For the main dashboard page, only match exact path
    if (href === "/dashboard/clinic") {
      return pathname === "/dashboard/clinic";
    }

    // For other pages, check if pathname starts with href
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-[250px] flex-col justify-between bg-primary p-4 text-white shadow-lg flex overflow-y-auto">
      {/* Top Section */}
      <div>
        <Link href="/dashboard/clinic" className="mb-8 flex items-center justify-center">
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
      <div className="space-y-4 mt-4">
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

        {/* Clinic Badge */}
        <div className="flex flex-col space-y-1 rounded-lg bg-primary-foreground/10 p-3 text-sm">
          <div className="flex items-center space-x-3">
            <span className="h-8 w-8 rounded-full bg-white text-primary flex items-center justify-center font-bold text-sm shrink-0">
              🏥
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {clinic?.name || 'Clinic Admin'}
              </p>
              {clinic?.location && (
                <p className="text-xs text-primary-foreground/60 truncate">
                  {clinic.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};