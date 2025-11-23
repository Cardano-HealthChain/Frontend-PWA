import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, X } from "lucide-react";

type PermissionDetailPanelProps = {
    permission: any;
    onClose: () => void;
};

// This would normally come from an API based on the selected permission
const mockDetail = {
    name: "Sunrise Medical Centre",
    type: "Multi-specialty Clinic",
    address: "Lekki Phase 1, Lagos",
    assignedDoctor: "Dr. Ahmed Suleiman",
    accessLevel: "Full Access (All data categories)",
    accessScope: ["Lab Tests", "Imaging", "Vital Notes", "Vaccinations", "Medications", "Allergies", "Chronic Conditions", "Emergency Data"],
    validity: {
        start: "Jan 05, 2025",
        end: "Feb 24, 2025",
        remaining: "34 days"
    },
    auditLog: [
        { action: "Viewed CBC", date: "Today" },
        { action: "Viewed Chest X-ray", date: "Jan 22" },
        { action: "Downloaded LFT", date: "Jan 21" }
    ],
    aiInsight: "This clinic accesses your records frequently, frequently due to ongoing follow-up."
};

export const PermissionDetailPanel = ({ permission, onClose }: PermissionDetailPanelProps) => {
    return (
        <div className="h-full bg-white border-none rounded-lg shadow-xl overflow-y-auto">
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold">{mockDetail.name}</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Basic Info */}
                <div className="space-y-3 text-sm">
                    <InfoRow label="Type" value={mockDetail.type} />
                    <InfoRow label="Address" value={mockDetail.address} />
                    <InfoRow label="Assigned Doctor" value={mockDetail.assignedDoctor} />
                </div>

                {/* Access Level */}
                <Section title="Access Level" content={mockDetail.accessLevel} />

                {/* Access Scope */}
                <div className="space-y-3">
                    <h4 className="font-semibold border-b border-gray-200 pb-2">Access Scope</h4>
                    <div className="flex flex-wrap gap-2">
                        {mockDetail.accessScope.map((scope, i) => (
                            <span key={i} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                {scope}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Validity */}
                <div className="space-y-3">
                    <h4 className="font-semibold border-b border-gray-200 pb-2">Validity</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-muted-foreground block">Start</span>
                            <span className="font-medium">{mockDetail.validity.start}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block">End</span>
                            <span className="font-medium">{mockDetail.validity.end}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-muted-foreground block">Remaining</span>
                            <span className="font-medium">{mockDetail.validity.remaining}</span>
                        </div>
                    </div>
                </div>

                {/* Audit Log */}
                <div className="space-y-2">
                    <h4 className="font-semibold border-b border-gray-200 pb-2">Audit Log</h4>
                    <div className="space-y-2">
                        {mockDetail.auditLog.map((log, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{log.action}</span>
                                <span className="text-muted-foreground">{log.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Insight */}
                <Section title="HealthChain AI Insight" content={mockDetail.aiInsight} />

                {/* Actions */}
                <div className="space-y-3">
                    <h4 className="font-semibold border-b border-gray-200 pb-2">Actions</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                        <Button variant="destructive" className="w-full justify-start rounded-lg">
                            <Lock className="mr-2 h-4 w-4" /> Revoke
                        </Button>
                        <Button variant="outline" className="w-full justify-start rounded-lg border-primary lg:text-sm">
                            <Lock className="mr- h-4 w-4" /> Limit Access
                        </Button>
                        <Button variant="outline" className="w-full justify-start rounded-lg border-primary lg:text-sm">
                            <ArrowRight className="mr- h-4 w-4" /> Extend Access
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">{value}</span>
    </div>
);

const Section = ({ title, content }: { title: string; content: string }) => (
    <div className="space-y-2">
        <h4 className="font-semibold border-b border-gray-200 pb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{content}</p>
    </div>
);