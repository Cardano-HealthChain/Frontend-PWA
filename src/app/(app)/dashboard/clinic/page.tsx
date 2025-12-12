"use client";

import { useEffect } from "react";
import { DashboardContent } from "./_components/DashboardContent";
import { useClinicDashboard } from "@/hooks/useClinicDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import {
  UserPlus,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Activity as ActivityIcon
} from "lucide-react";

export default function ClinicDashboardPage() {
  const { data, isLoading, error, refetch } = useClinicDashboard(true);

  // Debug logging
  useEffect(() => {
    if (data?.clinic) {
      console.log("=== CLINIC DASHBOARD DATA ===");
      console.log("Clinic:", data.clinic);
      console.log("Stats:", data.stats);
      console.log("Doctors:", data.doctors);
      console.log("============================");
    }
  }, [data]);

  // Loading State
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Error State
  if (error && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Failed to Load Dashboard</h2>
        <p className="text-muted-foreground">
          We couldn't load your clinic dashboard. Please try again.
        </p>
        <Button onClick={refetch}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  // Transform API data
  const clinic = data?.clinic ? {
    name: data.clinic.name || "HealthChain Clinic",
    location: data.clinic.location || "Lagos, Nigeria",
    verified: data.clinic.verified,
  } : null;

  // Sample doctors data (replace with actual API data)
  const doctors = data?.doctors || [
    {
      name: "Sarah Johnson",
      specialty: "Cardiology",
      status: "Active",
      patientCount: 45,
      appointmentsToday: 8,
      satisfaction: 95
    },
    {
      name: "Michael Chen",
      specialty: "Pediatrics",
      status: "Active",
      patientCount: 62,
      appointmentsToday: 12,
      satisfaction: 98
    },
    {
      name: "Emily Rodriguez",
      specialty: "Dermatology",
      status: "Active",
      patientCount: 38,
      appointmentsToday: 6,
      satisfaction: 92
    },
    {
      name: "James Wilson",
      specialty: "Orthopedics",
      status: "Active",
      patientCount: 51,
      appointmentsToday: 9,
      satisfaction: 96
    },
    {
      name: "Lisa Anderson",
      specialty: "Internal Medicine",
      status: "Active",
      patientCount: 73,
      appointmentsToday: 15,
      satisfaction: 94
    },
    {
      name: "David Martinez",
      specialty: "Neurology",
      status: "Inactive",
      patientCount: 29,
      appointmentsToday: 0,
      satisfaction: 91
    }
  ];

  // Patient distribution by doctor
  const patientDistribution = [
    {
      doctor: "Dr. Lisa Anderson",
      count: 73,
      percentage: 24
    },
    {
      doctor: "Dr. Michael Chen",
      count: 62,
      percentage: 20
    },
    {
      doctor: "Dr. James Wilson",
      count: 51,
      percentage: 17
    },
    {
      doctor: "Dr. Sarah Johnson",
      count: 45,
      percentage: 15
    },
    {
      doctor: "Dr. Emily Rodriguez",
      count: 38,
      percentage: 12
    },
    {
      doctor: "Others",
      count: 36,
      percentage: 12
    }
  ];

  // Activity logs with proper icon data
  const activities = data?.activities || [
    {
      icon: UserPlus,
      title: "New doctor added",
      description: "Dr. David Martinez joined as Neurologist",
      timestamp: "10 minutes ago",
      bgColor: "bg-blue-50",
      color: "text-blue-500"
    },
    {
      icon: FileText,
      title: "Bulk records uploaded",
      description: "127 patient records imported successfully",
      timestamp: "1 hour ago",
      bgColor: "bg-green-50",
      color: "text-green-500"
    },
    {
      icon: AlertTriangle,
      title: "System alert",
      description: "Database backup completed successfully",
      timestamp: "2 hours ago",
      bgColor: "bg-yellow-50",
      color: "text-yellow-500"
    },
    {
      icon: Calendar,
      title: "Appointments scheduled",
      description: "53 appointments scheduled for tomorrow",
      timestamp: "3 hours ago",
      bgColor: "bg-purple-50",
      color: "text-purple-500"
    },
    {
      icon: UserCheck,
      title: "Patient onboarding",
      description: "15 new patients registered today",
      timestamp: "4 hours ago",
      bgColor: "bg-orange-50",
      color: "text-orange-500"
    },
    {
      icon: TrendingUp,
      title: "Performance milestone",
      description: "Reached 1000+ total appointments this month",
      timestamp: "5 hours ago",
      bgColor: "bg-green-50",
      color: "text-green-500"
    },
    {
      icon: ActivityIcon,
      title: "Doctor activity",
      description: "Dr. Sarah Johnson completed 12 consultations",
      timestamp: "6 hours ago",
      bgColor: "bg-blue-50",
      color: "text-blue-500"
    },
    {
      icon: FileText,
      title: "Report generated",
      description: "Monthly performance report is ready",
      timestamp: "8 hours ago",
      bgColor: "bg-purple-50",
      color: "text-purple-500"
    }
  ];

  const stats = {
    totalDoctors: data?.stats?.totalDoctors || 15,
    activeDoctors: data?.stats?.activeDoctors || 12,
    totalPatients: data?.stats?.totalPatients || 305,
    newPatientsThisMonth: data?.stats?.newPatientsThisMonth || 47,
    totalAppointments: data?.stats?.totalAppointments || 1247,
    appointmentsToday: data?.stats?.appointmentsToday || 52,
    totalRecords: data?.stats?.totalRecords || 1856,
    recordsThisMonth: data?.stats?.recordsThisMonth || 234,
    criticalAlerts: data?.stats?.criticalAlerts || 3
  };

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
          <Button variant="outline" size="sm" onClick={refetch} className="bg-primary text-white flex items-center gap-2 w-auto p-3 rounded-md">
            <RefreshCw className="h-4 w-4 " /> Refresh
          </Button>
        </div>
      )}

      <DashboardContent
        clinic={clinic}
        stats={stats}
        doctors={doctors}
        patientDistribution={patientDistribution}
        activities={activities}
        onRefresh={refetch}
      />
    </>
  );
}

// Loading Skeleton
function DashboardSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex justify-between">
        <div>
          <Skeleton className="h-12 w-[400px] mb-2 border-none" />
          <Skeleton className="h-6 w-[300px] border-none" />
        </div>
        <Skeleton className="h-10 w-[150px] border-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-12 w-12 rounded-lg mb-3 border-none" />
            <Skeleton className="h-4 w-[120px] mb-2 border-none" />
            <Skeleton className="h-8 w-[60px] mb-1 border-none" />
            <Skeleton className="h-3 w-[140px] border-none" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <Skeleton className="h-6 w-[250px] mb-4 border-none" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full border-none" />
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Skeleton className="h-6 w-[200px] mb-4 border-none" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full border-none" />
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-[150px] mb-4 border-none" />
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-12 w-full border-none" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}