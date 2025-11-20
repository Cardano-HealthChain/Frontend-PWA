"use client";

import Link from "next/link";
import Image from "next/image";
import { BarChart, FileText, Bell, Lock, Settings, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart },
    { href: "/records", label: "Records", icon: FileText },
    { href: "/alerts", label: "Alerts", icon: Bell },
    { href: "/permissions", label: "Permissions", icon: Lock },
];

const secondaryItems = [
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/logout", label: "Log Out", icon: LogOut },
];

export const SidebarNav = ({ user }: { user: { name: string } }) => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        // Check if path starts with href, handling base dashboard path correctly
        if (href === "/dashboard") {
            return pathname.includes("/dashboard/resident");
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className="fixed left-0 top-0 hidden h-full w-[250px] flex-col justify-between bg-primary p-4 text-white shadow-lg md:flex">
            {/* Top Section */}
            <div>
                <Link href="/dashboard" className="mb-8 flex items-center justify-cente ">
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
                        const ActiveIcon = item.icon;
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
                                    <ActiveIcon className="mr-3 h-5 w-5" />
                                    {item.label}
                                </Link>
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
                {/* User B / Footer */}
                <div className="flex items-center space-x-3 rounded-lg bg-primary-foreground/10 p-3 text-sm">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.name.split(' ')[0]}</span>
                </div>
            </div>
        </nav>
    );
};