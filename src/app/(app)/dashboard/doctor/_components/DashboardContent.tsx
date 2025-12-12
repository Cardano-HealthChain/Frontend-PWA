// DashboardContent.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Users,
    FileText,
    Calendar,
    Activity,
    AlertCircle,
    RefreshCw
} from "lucide-react";
import Link from "next/link";

import { AppointmentCard } from "./AppointmentCard";
import { ActivityItem } from "./ActivityFeed";
import { PatientListItem } from "./PatientsList";
import { QuickActions } from "./QuickActions";
import { PerformanceMetrics } from "./PerformanceMetrics";

interface DoctorDashboardStats {
    totalPatients: number;
    activePatients: number;
    appointmentsToday: number;
    recordsCreated: number;
    criticalCases: number;
    completedToday: number;
}

export const DoctorDashboardContent = ({
    doctor,
    stats,
    patients,
    appointments,
    activities,
    onRefresh
}: {
    doctor: any;
    stats: DoctorDashboardStats;
    patients: any[];
    appointments: any[];
    activities: any[];
    onRefresh?: () => void;
}) => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const statsData = [
        {
            icon: Users,
            title: "Total Patients",
            value: stats.totalPatients,
            subValue: `${stats.activePatients} active patients`,
            trend: "+12%",
            bgColor: "bg-blue-50",
            color: "text-blue-500"
        },
        {
            icon: Calendar,
            title: "Appointments Today",
            value: stats.appointmentsToday,
            subValue: `${stats.completedToday} completed`,
            trend: "+5%",
            bgColor: "bg-green-50",
            color: "text-green-500"
        },
        {
            icon: FileText,
            title: "Records Created",
            value: stats.recordsCreated,
            subValue: "This month",
            trend: "+18%",
            bgColor: "bg-purple-50",
            color: "text-purple-500"
        },
        {
            icon: AlertCircle,
            title: "Critical Cases",
            value: stats.criticalCases,
            subValue: "Requires attention",
            trend: "-3%",
            bgColor: "bg-red-50",
            color: "text-red-500"
        }
    ];

    return (
        <div className="mt-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
                        {getGreeting()}, <br />
                        <span className="mt-2 text-primary">
                            Dr. {doctor?.name?.split(" ")[0] || "Doctor"} 👨‍⚕️
                        </span>
                    </h1>
                    <p className="mt-2 text-muted-foreground text-xl">
                        {doctor?.specialty || "Healthcare Professional"} •{" "}
                        {doctor?.clinic || "HealthChain"}
                    </p>
                </div>

                {onRefresh && (
                    <Button variant="outline" size="icon" onClick={onRefresh} className="bg-primary text-white flex items-center gap-2 w-auto p-3 rounded-md">
                        <RefreshCw className="h-4 w-4 " /> Refresh
                    </Button>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, i) => (
                    <Card key={i} className="shadow-sm border-none">
                        <CardContent className="py-4 px-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend.startsWith("+")
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {stat.trend}
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground mb-1">
                                {stat.title}
                            </p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.subValue}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Appointments */}
                    <Card className="shadow-lg border-none">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Today's Appointments
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-4 space-y-3">
                            {appointments.length ? (
                                appointments.slice(0, 4).map((apt, i) => (
                                    <AppointmentCard key={i} appointment={apt} />
                                ))
                            ) : (
                                <p className="text-center text-muted-foreground py-6">
                                    No appointments scheduled for today
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Activity Log */}
                    <Card className="shadow-lg border-none">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-4 space-y-2">
                            {activities.slice(0, 5).map((a, i) => (
                                <ActivityItem key={i} activity={a} />
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                    <QuickActions />

                    {/* Patients */}
                    <Card className="shadow-lg border-none">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-lg font-bold">Recent Patients</CardTitle>
                        </CardHeader>

                        <CardContent className="pt-4 space-y-2">
                            {patients.slice(0, 5).map((p, i) => (
                                <PatientListItem key={i} patient={p} />
                            ))}
                        </CardContent>
                    </Card>

                    <PerformanceMetrics />
                </div>
            </div>
        </div>
    );
};
