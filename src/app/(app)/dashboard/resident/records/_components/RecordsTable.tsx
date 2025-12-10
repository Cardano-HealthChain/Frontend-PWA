// app/dashboard/resident/records/_components/RecordsTable.tsx
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { MedicalRecord } from "@/lib/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type RecordsTableProps = {
    records: MedicalRecord[];
    onRecordSelect: (record: MedicalRecord) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: string) => void;
    isLoading?: boolean;
    onLoadMore?: () => void;
    hasMore?: boolean;
};

export const RecordsTable = ({
    records,
    onRecordSelect,
    searchQuery,
    onSearchChange,
    onCategoryChange,
    isLoading,
    onLoadMore,
    hasMore,
}: RecordsTableProps) => {
    const [localSearch, setLocalSearch] = useState(searchQuery);
    const [category, setCategory] = useState<string>("all");

    // Debounce search
    const handleSearchChange = (value: string) => {
        setLocalSearch(value);
        // Debounce the actual API call
        const timer = setTimeout(() => {
            onSearchChange(value);
        }, 500);
        return () => clearTimeout(timer);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        onCategoryChange(value === "all" ? "" : value);
    };

    // Get unique record types for filter
    const recordTypes = useMemo(() => {
        const types = new Set(records.map(r => r.record_type).filter(Boolean));
        return Array.from(types);
    }, [records]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div>
            {/* Search and Filter Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search records by title, clinic, or type..."
                        value={localSearch}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {recordTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Card className="shadow-lg border-none">
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Your Health Records</h2>
                        <span className="text-sm text-muted-foreground">
                            {records.length} record{records.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {records.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                {searchQuery ? "No records found matching your search" : "No medical records found"}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <Table className="border-separate border-spacing-y-2">
                                    <TableHeader className="border border-gray-100 rounded-lg">
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="font-semibold">DATE</TableHead>
                                            <TableHead className="font-semibold">TYPE</TableHead>
                                            <TableHead className="font-semibold">CLINIC</TableHead>
                                            <TableHead className="font-semibold">PATIENT</TableHead>
                                            <TableHead className="font-semibold">STATUS</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="border border-gray-100 rounded-lg">
                                        {records.map((record, i) => (
                                            <TableRow
                                                key={record.record_id}
                                                onClick={() => onRecordSelect(record)}
                                                className={cn(
                                                    "cursor-pointer transition-colors",
                                                    i === 0 && "bg-primary text-primary-foreground hover:bg-primary/90",
                                                    i !== 0 && "hover:bg-muted/50"
                                                )}
                                            >
                                                <TableCell className="font-medium">
                                                    {formatDate(record.created_at)}
                                                </TableCell>
                                                <TableCell>{record.record_type || "N/A"}</TableCell>
                                                <TableCell>{record.uploaded_by || "Unknown"}</TableCell>
                                                <TableCell className={cn(i !== 0 && "text-muted-foreground")}>
                                                    {record.patientName || "N/A"}
                                                </TableCell>
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
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Load More Button */}
                            {hasMore && (
                                <div className="flex justify-center mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={onLoadMore}
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
        </div>
    );
};