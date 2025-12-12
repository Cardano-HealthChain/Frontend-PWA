// DashboardContent.tsx
"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Users,
  UserPlus,
  UserMinus,
  Stethoscope,
  Calendar,
  FileText,
  AlertCircle,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Activity
} from "lucide-react";
import Link from "next/link";

import { StatsOverview } from "./StatsOverview";
import { DoctorList } from "./DoctorsList";
import { PerformanceTargets } from "./PerformanceTargets";
import { PatientDistribution } from "./PatientDistribution";
import { SystemHealth } from "./SystemHealth";

export const DashboardContent = ({
  clinic,
  stats,
  doctors,
  patientDistribution,
  activities,
  onRefresh
}: any) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const overviewStats: Array<{
    icon: any;
    title: string;
    value: string | number;
    change: string;
    changeType: "increase" | "decrease";
    subtitle: string;
    bgColor: string;
    color: string;
  }> = [
      {
        icon: Stethoscope,
        title: "Total Doctors",
        value: stats.totalDoctors,
        change: "+12%",
        changeType: "increase",
        subtitle: `${stats.activeDoctors} active today`,
        bgColor: "bg-blue-50",
        color: "text-blue-500"
      },
      {
        icon: Users,
        title: "Total Patients",
        value: stats.totalPatients,
        change: "+8%",
        changeType: "increase",
        subtitle: `+${stats.newPatientsThisMonth} this month`,
        bgColor: "bg-green-50",
        color: "text-green-500"
      },
      {
        icon: Calendar,
        title: "Appointments",
        value: stats.totalAppointments,
        change: "+15%",
        changeType: "increase",
        subtitle: `${stats.appointmentsToday} scheduled today`,
        bgColor: "bg-purple-50",
        color: "text-purple-500"
      },
      {
        icon: FileText,
        title: "Health Records",
        value: stats.totalRecords,
        change: "+22%",
        changeType: "increase",
        subtitle: `${stats.recordsThisMonth} created this month`,
        bgColor: "bg-orange-50",
        color: "text-orange-500"
      }
    ];

  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-4xl font-extrabold">
            {getGreeting()},{" "}
            <span className="text-primary">{clinic?.name}</span>
          </h1>
          <p className="text-muted-foreground text-lg flex">
            {clinic?.location} • Clinic Management Dashboard
          </p>
        </div>

        <div className="flex gap-2 ">
          <Button variant="outline" className="border-primary rounded-md">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>

          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh} className="bg-primary text-white flex items-center gap-2 w-auto p-3 rounded-md">
              <RefreshCw className="h-4 w-4 " /> Refresh
            </Button>
          )}
        </div>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((s, i) => (
          <StatsOverview key={i} {...s} />
        ))}
      </div>

      {/* Doctors */}
      <Card className="shadow-lg border-none">
        <CardHeader className="border-b border-gray-300">
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Medical Staff Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          <DoctorList doctors={doctors} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance */}
        <Card className="shadow-lg border-none">
          <CardHeader className="border-b border-gray-300">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Monthly Performance Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <PerformanceTargets label="Appointments" value={847} target={1000} />
            <PerformanceTargets label="Records Created" value={632} target={800} />
            <PerformanceTargets label="Patient Satisfaction" value={94} target={95} />
          </CardContent>
        </Card>

        {/* Patient Distribution */}
        <Card className="shadow-lg border-none">
          <CardHeader className="border-b border-gray-300">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Patient Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {patientDistribution.map((item: any, i: number) => (
              <PatientDistribution key={i} {...item} />
            ))}
          </CardContent>
        </Card>
        {/* System Health */}
        <SystemHealth activeUsers={stats.activeDoctors + 5} />
      </div>

    </div>
  );
};
