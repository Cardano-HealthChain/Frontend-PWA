// app/dashboard/resident/records/_components/RecordSummaryCards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TestTubeDiagonal, Ribbon, ClipboardPlus, Pill, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";
import { MedicalRecord } from "@/lib/api";
import { useMemo } from "react";

interface RecordSummaryCardsProps {
    records: MedicalRecord[];
}

const SummaryCard = ({
    title,
    count,
    subtitle,
    details,
    buttonLabel,
    color,
    status,
    timeline,
    icon: Icon,
    onClick
}: any) => (
    <Card className={cn("shadow-sm border-none", color)}>
        <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded bg-white/50 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium opacity-90 mt-3">{title}</p>
            </div>
            <div className="w-full bg-gray-100 mb-4 h-px"></div>
            <div>
                <p className="text-lg lg:text-xl font-bold">{count}</p>
                <div className="flex items-start justify-between">
                    <p className="text-xs mt-1 opacity-80">{subtitle}</p>
                    <p className="text-xs mt-1 opacity-80">{timeline}</p>
                </div>
                <div className="mt-1 flex items-start justify-between">
                    <p className="text-xs opacity-80">{status}</p>
                    <p className="text-xs opacity-80">{details}</p>
                </div>
            </div>
            <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 text-xs bg-white/80 hover:bg-white border-primary"
                onClick={onClick}
            >
                {buttonLabel} <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
        </CardContent>
    </Card>
);

export const RecordSummaryCards = ({ records }: RecordSummaryCardsProps) => {
    // Calculate statistics from actual records
    const stats = useMemo(() => {
        const byType: Record<string, MedicalRecord[]> = {};

        records.forEach(record => {
            const type = record.record_type || "Other";
            if (!byType[type]) byType[type] = [];
            byType[type].push(record);
        });

        // Get most recent record of each type
        const getLatest = (type: string) => {
            const typeRecords = byType[type] || [];
            if (typeRecords.length === 0) return null;
            return typeRecords.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )[0];
        };

        const formatTimeAgo = (dateString: string) => {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffWeeks = Math.floor(diffDays / 7);
            const diffMonths = Math.floor(diffDays / 30);

            if (diffDays === 0) return "Today";
            if (diffDays === 1) return "Yesterday";
            if (diffDays < 7) return `${diffDays} days ago`;
            if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
            return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
        };

        // Lab Tests
        const labTests = byType["Lab Result"] || byType["Laboratory"] || [];
        const latestLab = getLatest("Lab Result") || getLatest("Laboratory");

        // Vaccinations
        const vaccinations = byType["Vaccination"] || [];
        const latestVaccination = getLatest("Vaccination");

        // Clinic Visits
        const clinicVisits = byType["Clinic Visit"] || byType["Consultation"] || [];
        const latestVisit = getLatest("Clinic Visit") || getLatest("Consultation");

        // Medications
        const medications = byType["Prescription"] || byType["Medication"] || [];
        const latestMedication = getLatest("Prescription") || getLatest("Medication");

        // Imaging
        const imaging = byType["Imaging"] || byType["X-Ray"] || byType["MRI"] || byType["Ultrasound"] || [];
        const latestImaging = getLatest("Imaging") || getLatest("X-Ray");

        return {
            labTests: {
                count: labTests.length,
                latest: latestLab,
                timeline: latestLab ? formatTimeAgo(latestLab.created_at) : "No tests",
            },
            vaccinations: {
                count: vaccinations.length,
                latest: latestVaccination,
                timeline: latestVaccination ? formatTimeAgo(latestVaccination.created_at) : "No records",
            },
            clinicVisits: {
                count: clinicVisits.length,
                latest: latestVisit,
                timeline: latestVisit ? formatTimeAgo(latestVisit.created_at) : "No visits",
            },
            medications: {
                count: medications.length,
                latest: latestMedication,
                timeline: latestMedication ? formatTimeAgo(latestMedication.created_at) : "No medications",
            },
            imaging: {
                count: imaging.length,
                latest: latestImaging,
                timeline: latestImaging ? formatTimeAgo(latestImaging.created_at) : "No imaging",
            },
        };
    }, [records]);

    const summaryData = [
        {
            title: "Lab Tests",
            count: `${stats.labTests.count} Lab Test${stats.labTests.count !== 1 ? 's' : ''}`,
            subtitle: "Last test",
            details: "",
            status: "Status",
            timeline: stats.labTests.timeline,
            buttonLabel: "View Lab Tests",
            color: "bg-green-100 text-green-900",
            icon: TestTubeDiagonal,
            onClick: () => console.log("View lab tests")
        },
        {
            title: "Vaccinations",
            count: `${stats.vaccinations.count} Vaccination${stats.vaccinations.count !== 1 ? 's' : ''}`,
            subtitle: "Last vaccination",
            details: "",
            status: "",
            timeline: stats.vaccinations.timeline,
            buttonLabel: "View Vaccinations",
            color: "bg-blue-100 text-blue-900",
            icon: Ribbon,
            onClick: () => console.log("View vaccinations")
        },
        {
            title: "Clinic Visits",
            count: `${stats.clinicVisits.count} Visit${stats.clinicVisits.count !== 1 ? 's' : ''}`,
            subtitle: "Last visit",
            details: "",
            status: stats.clinicVisits.latest?.uploaded_by || "",
            timeline: stats.clinicVisits.timeline,
            buttonLabel: "View Visits",
            color: "bg-purple-100 text-purple-900",
            icon: ClipboardPlus,
            onClick: () => console.log("View visits")
        },
        {
            title: "Medications",
            count: `${stats.medications.count} Medication${stats.medications.count !== 1 ? 's' : ''}`,
            subtitle: "Last updated",
            details: "",
            status: "Status",
            timeline: stats.medications.timeline,
            buttonLabel: "View Medications",
            color: "bg-red-100 text-red-900",
            icon: Pill,
            onClick: () => console.log("View medications")
        },
        {
            title: "Imaging",
            count: `${stats.imaging.count} Imaging Record${stats.imaging.count !== 1 ? 's' : ''}`,
            subtitle: "Types",
            details: "",
            status: "Latest",
            timeline: stats.imaging.timeline,
            buttonLabel: "View Imaging",
            color: "bg-pink-100 text-pink-900",
            icon: Microscope,
            onClick: () => console.log("View imaging")
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {summaryData.map((card, i) => (
                <SummaryCard key={i} {...card} />
            ))}
        </div>
    );
};