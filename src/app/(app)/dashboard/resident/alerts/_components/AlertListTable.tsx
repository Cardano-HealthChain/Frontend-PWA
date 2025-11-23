import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const AlertRow = ({ alert, onClick, isActive }: { alert: any, onClick: () => void, isActive: boolean }) => {
    // Determine icon color based on severity
    const iconColor = alert.severity === 'Critical' ? 'text-destructive' : 'text-yellow-500';

    return (
        <TableRow
            onClick={onClick}
            className={cn("cursor-pointer hover:bg-primary/5 transition-colors bg-white p-4", isActive && "bg-primary text-white hover:text-gray-500")}
        >
            <TableCell className="w-[40px]">
                <AlertTriangle className={cn("h-5 w-5", iconColor)} />
            </TableCell>
            <TableCell className="font-semibold text-sm">{alert.title}</TableCell>
            <TableCell className="hidden text-muted-foreground md:table-cell">{alert.description}</TableCell>
            <TableCell className="text-muted-foreground text-xs">{alert.timestamp}</TableCell>
            <TableCell className="text-xs font-semibold text-destructive">{alert.severity}</TableCell>
        </TableRow>
    );
};

interface AlertsListTableProps {
    alerts: any[];
    selectedAlert: any;
    onSelect: (alert: any) => void;
}

export const AlertsListTable: React.FC<AlertsListTableProps> = ({ alerts, selectedAlert, onSelect }) => {
    return (
        <Card className="shadow-lg border-gray-200">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table className="border-separate border-spacing-y-2">
                        <TableHeader>
                            <TableRow className="bg-secondary hover:bg-secondary uppercase">
                                <TableHead className="w-[40px]"></TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Severity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {alerts.map((alert, i) => (
                                <AlertRow
                                    key={i}
                                    alert={alert}
                                    onClick={() => onSelect(alert)}
                                    isActive={selectedAlert?.title === alert.title}
                                />
                            ))}
                            {alerts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        No alerts found in this category.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};