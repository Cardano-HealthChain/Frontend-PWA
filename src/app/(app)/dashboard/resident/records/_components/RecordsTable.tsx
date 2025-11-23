import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockRecords = [
    { date: "14 Jan 2025", title: "Complete Blood Count (CBC)", clinic: "Sunrise Medical Centre", description: "Blood cell values updated", status: "Verified" },
    { date: "20 Dec 2024", title: "Chest X-Ray", clinic: "Emerald Diagnostics", description: "No abnormalities detected", status: "Verified" },
    { date: "04 Dec 2024", title: "Malaria Rapid Test", clinic: "HavenPoint Clinic", description: "Negative", status: "Verified" },
    { date: "10 Oct 2024", title: "Liver Function Test", clinic: "Maplewood Community Hospital", description: "Dose 2 completed", status: "Verified" },
    { date: "03 Oct 2024", title: "Routine Clinic Visit", clinic: "Sunrise Medical Centre", description: "Annual physical examination", status: "Verified" },
    { date: "12 Sep 2024", title: "Liver Function Test", clinic: "Emerald Diagnostics", description: "Slight ALT elevation", status: "Needs Review" },
];

type RecordsTableProps = {
    onRecordSelect: (record: any) => void;
    searchQuery: string;
};

export const RecordsTable = ({ onRecordSelect }: RecordsTableProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRecords = mockRecords.filter(record =>
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.clinic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md border-primary">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search Records"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Card className="shadow-lg border-none">
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Your Health Records</h2>
                        <Button variant="link" className="text-primary">See More</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table className="border-separate border-spacing-y-2">
                            <TableHeader className="border border-gray-100 rounded-lg ">
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">DATE</TableHead>
                                    <TableHead className="font-semibold">TITLE</TableHead>
                                    <TableHead className="font-semibold">CLINIC</TableHead>
                                    <TableHead className="font-semibold">DESCRIPTION</TableHead>
                                    <TableHead className="font-semibold">STATUS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="border border-gray-100 rounded-lg">
                                {filteredRecords.map((record, i) => (
                                    <TableRow
                                        key={i}
                                        onClick={() => onRecordSelect(record)}
                                        className={cn(
                                            "cursor-pointer transition-colors",
                                            i === 0 && "bg-primary text-primary-foreground hover:bg-primary/90",
                                            i !== 0 && "hover:bg-muted/50"
                                        )}
                                    >
                                        <TableCell className="font-medium">{record.date}</TableCell>
                                        <TableCell>{record.title}</TableCell>
                                        <TableCell>{record.clinic}</TableCell>
                                        <TableCell className={cn(i !== 0 && "text-muted-foreground")}>{record.description}</TableCell>
                                        <TableCell>
                                            <span className={cn(
                                                "text-xs font-semibold px-2 py-1 rounded-full",
                                                record.status === "Verified"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            )}>
                                                {record.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};