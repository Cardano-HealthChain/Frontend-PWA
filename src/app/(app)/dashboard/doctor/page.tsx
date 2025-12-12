"use client";

import { useEffect } from "react";
import { DoctorDashboardContent } from "./_components/DashboardContent";
import { useDoctorDashboard } from "@/hooks/useDoctorDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";
import {
    FileText,
    UserCheck,
    AlertTriangle,
    Calendar,
    TrendingUp,
    Clock
} from "lucide-react";

export default function DoctorDashboardPage() {
    const { data, isLoading, error, refetch } = useDoctorDashboard(true);

    // Debug logging
    useEffect(() => {
        if (data?.doctor) {
            console.log("=== DOCTOR DASHBOARD DATA ===");
            console.log("Doctor:", data.doctor);
            console.log("Stats:", data.stats);
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
                    We couldn't load your dashboard data. Please try again.
                </p>
                <Button variant="outline" size="sm" onClick={refetch} className="bg-primary text-white flex items-center gap-2 w-auto p-3 rounded-md">
                    <RefreshCw className="mr-2 h-4" />
                    Retry
                </Button>
            </div>
        );
    }

    // Transform API data to match component props
    const doctor = data?.doctor ? {
        name: data.doctor.name || "Doctor",
        specialty: data.doctor.specialty || "General Medicine",
        clinic: data.doctor.clinic_name || "HealthChain Clinic",
        email: data.doctor.email,
        verified: data.doctor.verified,
    } : null;

    // Sample patients data (replace with actual API data)
    const patients = data?.patients || [
        {
            name: "John Doe",
            condition: "Hypertension",
            lastVisit: "2 days ago",
            status: "Stable"
        },
        {
            name: "Jane Smith",
            condition: "Diabetes Type 2",
            lastVisit: "1 week ago",
            status: "Critical"
        },
        {
            name: "Michael Brown",
            condition: "Asthma",
            lastVisit: "3 days ago",
            status: "Stable"
        },
        {
            name: "Sarah Johnson",
            condition: "Arthritis",
            lastVisit: "Today",
            status: "Monitoring"
        },
        {
            name: "David Lee",
            condition: "Heart Disease",
            lastVisit: "Yesterday",
            status: "Critical"
        }
    ];

    // Sample appointments (replace with actual API data)
    const appointments = data?.appointments || [
        {
            patientName: "Alice Cooper",
            type: "Follow-up Consultation",
            time: "10:00 AM - 10:30 AM"
        },
        {
            patientName: "Bob Wilson",
            type: "Initial Consultation",
            time: "11:00 AM - 11:45 AM"
        },
        {
            patientName: "Carol White",
            type: "Lab Results Review",
            time: "2:00 PM - 2:30 PM"
        },
        {
            patientName: "Daniel Garcia",
            type: "Prescription Renewal",
            time: "3:30 PM - 4:00 PM"
        }
    ];

    // Sample activities with proper icon data
    const activities = data?.activities || [
        {
            icon: FileText,
            title: "New medical record created",
            description: "Created health record for John Doe",
            time: "5 minutes ago",
            bgColor: "bg-blue-50",
            color: "text-blue-500"
        },
        {
            icon: UserCheck,
            title: "Patient appointment completed",
            description: "Completed consultation with Jane Smith",
            time: "1 hour ago",
            bgColor: "bg-green-50",
            color: "text-green-500"
        },
        {
            icon: AlertTriangle,
            title: "Critical alert received",
            description: "Abnormal lab results for Michael Brown",
            time: "2 hours ago",
            bgColor: "bg-red-50",
            color: "text-red-500"
        },
        {
            icon: Calendar,
            title: "New appointment scheduled",
            description: "Sarah Johnson - Tomorrow at 10:00 AM",
            time: "3 hours ago",
            bgColor: "bg-purple-50",
            color: "text-purple-500"
        },
        {
            icon: TrendingUp,
            title: "Patient progress updated",
            description: "David Lee showing improvement",
            time: "5 hours ago",
            bgColor: "bg-orange-50",
            color: "text-orange-500"
        },
        {
            icon: Clock,
            title: "Prescription refilled",
            description: "Refilled medication for Carol White",
            time: "6 hours ago",
            bgColor: "bg-yellow-50",
            color: "text-yellow-500"
        }
    ];

    const stats = {
        totalPatients: data?.stats?.totalPatients || 127,
        activePatients: data?.stats?.activePatients || 89,
        appointmentsToday: data?.stats?.appointmentsToday || 8,
        recordsCreated: data?.stats?.recordsCreated || 45,
        criticalCases: data?.stats?.criticalCases || 3,
        completedToday: data?.stats?.completedToday || 5
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
                    <Button variant="ghost" size="sm" onClick={refetch}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <DoctorDashboardContent
                doctor={doctor}
                stats={stats}
                patients={patients}
                appointments={appointments}
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
            <div>
                <Skeleton className="h-12 w-[400px] mb-2 border-none" />
                <Skeleton className="h-6 w-[300px] border-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="p-4">
                        <Skeleton className="h-12 w-12 rounded-lg mb-3 border-none" />
                        <Skeleton className="h-4 w-[100px] mb-2 border-none" />
                        <Skeleton className="h-8 w-[60px] mb-1 border-none" />
                        <Skeleton className="h-3 w-[120px] border-none" />
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <Card className="p-6">
                        <Skeleton className="h-6 w-[200px] mb-4 border-none" />
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-20 w-full border-none" />
                            ))}
                        </div>
                    </Card>
                </div>
                <Card className="p-6">
                    <Skeleton className="h-6 w-[150px] mb-4 border-none" />
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full border-none" />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}