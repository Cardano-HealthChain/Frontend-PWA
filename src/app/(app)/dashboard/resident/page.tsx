"use client";

import { useAuthStore } from "@/store/authStore";
import { DashboardContent } from "./_components/DashboardContent";

// Mock data to simulate fetching from a context/API
const MOCK_USER = {
  name: "Joshua Aladeloye",
  did: "345EUQX",
  dob: "25-10-2023",
  gender: "MALE",
  region: "Nigeria / Abuja",
  profileComplete: 70,
};

const MOCK_ACTIVE_PERMISSIONS = [
  { clinic: "Suntec Medical Centre", role: "Read/Write", expires: "in 3 hours" },
  { clinic: "Emerald Hospital", role: "Read/Write", expires: "in 3 days" },
  { clinic: "Harmony Care Clinic", role: "Write Only", expires: "in 7 days" },
];

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
  { title: "Preventive Health Care Tips", status: "View Lesson" },
  { title: "Understanding Vaccination Schedules", status: "Work on Task" },
  { title: "How HealthChain Protects Your Data", status: "View Lesson", comingSoon: true },
];

export default function ResidentDashboardPage() {
  const { userRole } = useAuthStore();
  const hasActiveRecords = MOCK_ACTIVE_ALERTS.length > 0;

  return (
    <DashboardContent
      user={MOCK_USER}
      hasActiveRecords={hasActiveRecords}
      permissions={hasActiveRecords ? MOCK_ACTIVE_PERMISSIONS : []}
      alerts={MOCK_ACTIVE_ALERTS}
      learnCards={MOCK_LEARN_CARDS}
    />
  );
}