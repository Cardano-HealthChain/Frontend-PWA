// app/dashboard/resident/records/vaccinations/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, ArrowLeft, Loader2, Ribbon } from "lucide-react";
import { useRecords } from "@/hooks/useRecords";
import { MedicalRecord } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function VaccinationsPage() {
    const [selectedVaccination, setSelectedVaccination] = useState<MedicalRecord | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { records, isLoading, loadMore, hasMore } = useRecords({
        category: "Vaccination",
        autoFetch: true,
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const filteredRecords = records.filter(record =>
        record.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.uploaded_by?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.record_data?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const downloadRecord = (record: MedicalRecord) => {
        const dataStr = JSON.stringify(record, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vaccination_${record.record_id}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadAllRecords = () => {
        const dataStr = JSON.stringify(filteredRecords, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `all_vaccinations_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    if (isLoading && records.length === 0) {
        return <VaccinationsPageSkeleton />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/resident/records">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Vaccinations</h1>
                        <p className="text-muted-foreground">
                            {filteredRecords.length} vaccination record{filteredRecords.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <Button onClick={downloadAllRecords} disabled={filteredRecords.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search vaccinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            <Card className="shadow-lg border-none">
                <CardContent className="p-6">
                    {filteredRecords.length === 0 ? (
                        <div className="text-center py-12">
                            <Ribbon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                                {searchQuery ? "No vaccinations found matching your search" : "No vaccination records found"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead>DATE ADMINISTERED</TableHead>
                                            <TableHead>VACCINE NAME</TableHead>
                                            <TableHead>ADMINISTERED BY</TableHead>
                                            <TableHead>PATIENT</TableHead>
                                            <TableHead>STATUS</TableHead>
                                            <TableHead className="text-right">ACTIONS</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRecords.map((record) => (
                                            <TableRow
                                                key={record.record_id}
                                                className="cursor-pointer hover:bg-muted/50"
                                                onClick={() => setSelectedVaccination(record)}
                                            >
                                                <TableCell className="font-medium">
                                                    {formatDate(record.created_at)}
                                                </TableCell>
                                                <TableCell>{record.record_type || "Vaccination"}</TableCell>
                                                <TableCell>{record.uploaded_by || "Unknown"}</TableCell>
                                                <TableCell>{record.patientName || "N/A"}</TableCell>
                                                <TableCell>
                                                    <Badge variant={record.verified ? "default" : "secondary"}>
                                                        {record.verified ? "Verified" : "Pending"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            downloadRecord(record);
                                                        }}
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {hasMore && (
                                <div className="flex justify-center mt-6">
                                    <Button
                                        variant="outline"
                                        onClick={loadMore}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            "Load More"
                                        )}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            <VaccinationModal
                vaccination={selectedVaccination}
                open={!!selectedVaccination}
                onClose={() => setSelectedVaccination(null)}
                onDownload={downloadRecord}
            />
        </div>
    );
}

function VaccinationModal({
    vaccination,
    open,
    onClose,
    onDownload
}: {
    vaccination: MedicalRecord | null;
    open: boolean;
    onClose: () => void;
    onDownload: (record: MedicalRecord) => void;
}) {
    if (!vaccination) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const parseRecordData = (recordData: string) => {
        try {
            return JSON.parse(recordData);
        } catch {
            return null;
        }
    };

    const parsedData = parseRecordData(vaccination.record_data);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <Ribbon className="h-6 w-6" />
                        {vaccination.record_type || "Vaccination Record"}
                    </DialogTitle>
                    <DialogDescription>
                        Administered on {formatDate(vaccination.created_at)}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <div className={cn(
                        "flex items-center gap-2 p-3 rounded-lg",
                        vaccination.verified
                            ? "bg-green-50 border border-green-200"
                            : "bg-yellow-50 border border-yellow-200"
                    )}>
                        <span className={cn(
                            "h-2 w-2 rounded-full",
                            vaccination.verified ? "bg-green-500" : "bg-yellow-500"
                        )}></span>
                        <span className={cn(
                            "text-sm font-medium",
                            vaccination.verified ? "text-green-900" : "text-yellow-900"
                        )}>
                            {vaccination.verified ? "Verified on Blockchain" : "Pending Verification"}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Patient Name" value={vaccination.patientName} />
                        <InfoItem label="Vaccine Type" value={vaccination.record_type} />
                        <InfoItem label="Administered By" value={vaccination.uploaded_by} />
                        <InfoItem label="Date Administered" value={formatDate(vaccination.created_at)} />
                    </div>

                    {parsedData && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Vaccination Details</h3>
                            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                {Object.entries(parsedData).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground capitalize">
                                            {key.replace(/_/g, ' ')}:
                                        </span>
                                        <span className="font-medium">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!parsedData && vaccination.record_data && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Details</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {vaccination.record_data}
                            </p>
                        </div>
                    )}

                    {vaccination.verified && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Blockchain Verification</h3>
                            <div className="space-y-2">
                                <div className="bg-muted/50 p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                                    <p className="text-xs font-mono break-all">{vaccination.blockchainTransactionID}</p>
                                </div>
                                <div className="bg-muted/50 p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Hash</p>
                                    <p className="text-xs font-mono break-all">{vaccination.hash_local}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                        <Button
                            className="flex-1"
                            onClick={() => onDownload(vaccination)}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download Record
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium">{value || "N/A"}</p>
        </div>
    );
}

function VaccinationsPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <div>
                        <Skeleton className="h-8 w-[200px] mb-2" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                </div>
                <Skeleton className="h-10 w-[150px]" />
            </div>
            <Skeleton className="h-10 w-[300px]" />
            <Card className="p-6">
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </Card>
        </div>
    );
}