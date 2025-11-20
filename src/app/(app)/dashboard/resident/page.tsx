"use client";

import { useAuthStore } from "@/store/authStore";
import { Search, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";
import { DashboardContent } from "./_components/DashboardContent";
import { SidebarNav } from "./_components/SidebarNav";
import { ProfileCard } from "./_components/ProfileCard";
import { HealthStats } from "./_components/HealthStats";
import { CurrentPermissions } from "./_components/CurrentPermissions";

// Mock data to simulate fetching from a context/API
const MOCK_USER = {
  name: "Joshua Aladeloye",
  did: "345EUQX",
  dob: "25-10-2023",
  gender: "MALE",
  region: "Nigeria / Abuja",
  profileComplete: 70, // 70% complete
};

// Mock data for the two states (Active vs. Empty)
const MOCK_ACTIVE_PERMISSIONS = [
  { clinic: "Suntec Medical Centre", role: "Read/Write", expires: "in 3 hours" },
  { clinic: "Emerald Hospital", role: "Read/Write", expires: "in 3 days" },
  { clinic: "Harmony Care Clinic", role: "Write Only", expires: "in 7 days" },
  // ... more
];

const MOCK_EMPTY_PERMISSIONS: any[] = [];

// Mock data for the Active State's Alerts and Missions
const MOCK_ACTIVE_ALERTS = [
  { type: "Vaccination Overdue", severity: "High", time: "2 hours ago" },
  { type: "New Clinic Update", severity: "Low", time: "Yesterday" },
  { type: "Malaria Outbreak", severity: "High", time: "3 days ago" },
  { type: "Vaccination Overdue", severity: "Medium", time: "1 week ago" },
];

const MOCK_LEARN_CARDS = [
  { title: "Understanding Vaccination Schedules", status: "Work on Task" },
  { title: "How HealthChain Protects Your Data", status: "View Lesson", comingSoon: true },
  { title: "Preventive Health Care Tips", status: "View Lesson" },
];


export default function ResidentDashboardPage() {
  const { userRole } = useAuthStore();
  const hasActiveRecords = MOCK_ACTIVE_ALERTS.length > 0; // Determine state based on activity

  return (
    <div className="flex min-h-screen bg-gray-50 text-foreground">

      {/* 1. Sidebar */}
      <SidebarNav user={MOCK_USER} />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[250px]">

        {/* 2a. Header/Search Bar (Only visible above mobile) */}
        <header className="sticky top-0 z-10 hidden h-24 items-center justify-between border-b border-muted-foreground bg-white p-4 shadow-sm md:flex">
          <div className="relative flex items-center w-full max-w-md">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search For Anything"
              className="w-full rounded-lg border border-border bg-secondary py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3 justify-between">
            <div className="w-full">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            {/* User Icon Placeholder */}
            <div className="h-10 w-full rounded-full bg-primary/20 flex items-center justify-between gap-3 px-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Image
                  src="/images/avatar.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/32x32/6002ee/ffffff?text=U")}
                />
              </div>
              <span className="pr- text-lg font-medium text-primary">|</span>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* 2b. Dashboard Content */}
        <div className="p-4 md:px-8 md:py-4">
          <DashboardContent
            user={MOCK_USER}
            hasActiveRecords={hasActiveRecords}
            permissions={hasActiveRecords ? MOCK_ACTIVE_PERMISSIONS : MOCK_EMPTY_PERMISSIONS}
            alerts={MOCK_ACTIVE_ALERTS}
            learnCards={MOCK_LEARN_CARDS}
          />
        </div>
      </div>
    </div>
  );
}