"use client";

import { useEffect, useState } from "react";
import { DashboardContent } from "./_components/DashboardContent";
import { useDashboard } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function ResidentDashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard(true);

  // Loading State
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Error State (but allow partial data to show)
  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Failed to Load Dashboard</h2>
        <p className="text-muted-foreground">
          We couldn't load your dashboard data. Please try again.
        </p>
        <Button onClick={refetch}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  // Transform API data to match component props
  const user = data?.profile ? {
    name: `${data.profile.firstname} ${data.profile.lastname}`,
    did: data.profile.email?.substring(0, 7).toUpperCase() || "N/A", // Generate DID from email
    dob: data.profile.dob || "Not provided",
    gender: data.profile.gender || "Not specified",
    region: data.profile.state_of_origin 
      ? `${data.profile.nationality || "Nigeria"} / ${data.profile.state_of_origin}`
      : "Not provided",
    profileComplete: 70, // You can calculate this based on filled fields
    email: data.profile.email,
    phone: data.profile.phone_number,
    bloodType: data.profile.blood_type,
    genotype: data.profile.genotype,
    allergies: data.profile.known_allergies,
    conditions: data.profile.pre_existing_conditions,
    verified: data.profile.verified,
  } : null;

  // Transform permissions
  const permissions = data?.permissions?.map(p => ({
    clinic: p.clinic_name,
    role: p.access_type.replace("READANDWRITE", "Read/Write").replace("READ", "Read Only").replace("WRITE", "Write Only"),
    expires: p.granted_at ? calculateExpiry(p.granted_at) : "Unknown",
    active: p.granted && !p.revoked,
  })) || [];

  // Transform notifications to alerts
  const alerts = data?.notifications?.map(n => ({
    type: n.title,
    severity: mapSeverity(n.notification_level),
    time: formatTime(n.sent_at),
    message: n.message,
  })) || [];

  // Keep learn cards as mock for now (unless you have an endpoint)
  const learnCards = [
    { title: "Understanding Vaccination Schedules", status: "Work on Task" },
    { title: "How HealthChain Protects Your Data", status: "View Lesson", comingSoon: true },
    { title: "Preventive Health Care Tips", status: "View Lesson" },
  ];

  const hasActiveRecords = (data?.records?.length || 0) > 0 || alerts.length > 0;

  // Show partial error message if some data failed to load
  const hasPartialError = error && data;

  return (
    <>
      {hasPartialError && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Some dashboard data couldn't be loaded. Showing available information.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={refetch}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}

      <DashboardContent
        user={user}
        hasActiveRecords={hasActiveRecords}
        permissions={hasActiveRecords ? permissions : []}
        alerts={alerts}
        learnCards={learnCards}
        stats={{
          totalRecords: data?.records?.length || 0,
          verifiedRecords: data?.verifiedRecordsCount || 0,
          clinicsVisited: data?.clinicsVisitedCount || 0,
          notifications: data?.notifications?.length || 0,
        }}
        onRefresh={refetch}
      />
    </>
  );
}

// Helper Functions
function calculateExpiry(grantedAt: string): string {
  const granted = new Date(grantedAt);
  const now = new Date();
  const diffMs = now.getTime() - granted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function mapSeverity(level: string): string {
  const mapping: Record<string, string> = {
    "HIGH": "High",
    "CRITICAL": "High",
    "MEDIUM": "Medium",
    "LOW": "Low",
    "INFO": "Low",
  };
  return mapping[level?.toUpperCase()] || "Medium";
}

function formatTime(sentAt: string): string {
  const sent = new Date(sentAt);
  const now = new Date();
  const diffMs = now.getTime() - sent.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return sent.toLocaleDateString();
}

// Loading Skeleton
function DashboardSkeleton() {
  return (
    <div className="mt-8 space-y-8">
      {/* Header */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Skeleton className="h-12 w-[300px] mb-2" />
          <Skeleton className="h-6 w-[250px]" />
          <div className="flex gap-2 mt-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>
        </div>
        <Card className="p-6">
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[150px]" />
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <Skeleton className="h-6 w-[150px] mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="p-6">
          <Skeleton className="h-6 w-[150px] mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <Skeleton className="h-6 w-[150px] mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </Card>
        </div>
        <Card className="p-6">
          <Skeleton className="h-6 w-[150px] mb-4" />
          <Skeleton className="h-32 w-full" />
        </Card>
      </div>
    </div>
  );
}