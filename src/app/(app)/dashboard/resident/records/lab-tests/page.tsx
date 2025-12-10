// app/dashboard/resident/records/lab-tests/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, ArrowLeft, Loader2, TestTubeDiagonal } from "lucide-react";
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

export default function LabTestsPage() {
    const [selectedTest, setSelectedTest] = useState<MedicalRecord | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch only Lab Test records
    const { records, isLoading, error, refetch, loadMore, hasMore } = useRecords({
        category: "Lab Result", // Adjust based on your backend's category naming
        autoFetch: true,
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Filter records by search query
    const filteredRecords = records.filter(record =>
        record.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.uploaded_by?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.record_data?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Download single record
    const downloadRecord = (record: MedicalRecord) => {
        const dataStr = JSON.stringify(record, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lab_test_${record.record_id}_${formatDate(record.created_at)}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    // Download all records
    const downloadAllRecords = () => {
        const dataStr = JSON.stringify(filteredRecords, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `all_lab_tests_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    if (isLoading && records.length === 0) {
        return <LabTestsPageSkeleton />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/resident/records">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Lab Tests</h1>
                        <p className="text-muted-foreground">
                            {filteredRecords.length} lab test{filteredRecords.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                </div>
                <Button onClick={downloadAllRecords} disabled={filteredRecords.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                </Button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search lab tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Table */}
            <Card className="shadow-lg border-none">
                <CardContent className="p-6">
                    {filteredRecords.length === 0 ? (
                        <div className="text-center py-12">
                            <TestTubeDiagonal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                                {searchQuery ? "No lab tests found matching your search" : "No lab tests found"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="font-semibold">DATE</TableHead>
                                            <TableHead className="font-semibold">TEST NAME</TableHead>
                                            <TableHead className="font-semibold">CLINIC/LAB</TableHead>
                                            <TableHead className="font-semibold">PATIENT</TableHead>
                                            <TableHead className="font-semibold">STATUS</TableHead>
                                            <TableHead className="font-semibold text-right">ACTIONS</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRecords.map((record) => (
                                            <TableRow
                                                key={record.record_id}
                                                className="cursor-pointer hover:bg-muted/50"
                                                onClick={() => setSelectedTest(record)}
                                            >
                                                <TableCell className="font-medium">
                                                    {formatDate(record.created_at)}
                                                </TableCell>
                                                <TableCell>{record.record_type || "Lab Test"}</TableCell>
                                                <TableCell>{record.uploaded_by || "Unknown"}</TableCell>
                                                <TableCell>{record.patientName || "N/A"}</TableCell>
                                                <TableCell>
                                                    <span className={cn(
                                                        "text-xs font-semibold px-2 py-1 rounded-full",
                                                        record.verified
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    )}>
                                                        {record.verified ? "Verified" : "Pending"}
                                                    </span>
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

                            {/* Load More */}
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

            {/* Modal */}
            <LabTestModal
                test={selectedTest}
                open={!!selectedTest}
                onClose={() => setSelectedTest(null)}
                onDownload={downloadRecord}
            />
        </div>
    );
}

// Modal Component
function LabTestModal({
    test,
    open,
    onClose,
    onDownload
}: {
    test: MedicalRecord | null;
    open: boolean;
    onClose: () => void;
    onDownload: (record: MedicalRecord) => void;
}) {
    if (!test) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
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

    const parsedData = parseRecordData(test.record_data);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{test.record_type || "Lab Test"}</DialogTitle>
                    <DialogDescription>
                        {formatDate(test.created_at)}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Verification Badge */}
                    <div className={cn(
                        "flex items-center gap-2 p-3 rounded-lg",
                        test.verified
                            ? "bg-green-50 border border-green-200"
                            : "bg-yellow-50 border border-yellow-200"
                    )}>
                        <span className={cn(
                            "h-2 w-2 rounded-full",
                            test.verified ? "bg-green-500" : "bg-yellow-500"
                        )}></span>
                        <span className={cn(
                            "text-sm font-medium",
                            test.verified ? "text-green-900" : "text-yellow-900"
                        )}>
                            {test.verified ? "Verified on Blockchain" : "Pending Verification"}
                        </span>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Patient Name" value={test.patientName} />
                        <InfoItem label="Test Type" value={test.record_type} />
                        <InfoItem label="Laboratory" value={test.uploaded_by} />
                        <InfoItem label="Date Performed" value={formatDate(test.created_at)} />
                    </div>

                    {/* Test Results */}
                    {parsedData && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Test Results</h3>
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <pre className="text-sm whitespace-pre-wrap break-words">
                                    {JSON.stringify(parsedData, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Raw Data Fallback */}
                    {!parsedData && test.record_data && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Test Details</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {test.record_data}
                            </p>
                        </div>
                    )}

                    {/* Blockchain Information */}
                    {test.verified && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">Blockchain Details</h3>
                            <div className="space-y-2">
                                <div className="bg-muted/50 p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                                    <p className="text-xs font-mono break-all">{test.blockchainTransactionID}</p>
                                </div>
                                <div className="bg-muted/50 p-3 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Local Hash</p>
                                    <p className="text-xs font-mono break-all">{test.hash_local}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                        <Button
                            className="flex-1"
                            onClick={() => onDownload(test)}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download
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

// Helper Component
function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium">{value || "N/A"}</p>
        </div>
    );
}

// Loading Skeleton
function LabTestsPageSkeleton() {
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