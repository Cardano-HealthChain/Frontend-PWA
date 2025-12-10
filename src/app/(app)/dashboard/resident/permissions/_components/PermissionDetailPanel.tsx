// app/dashboard/resident/permissions/_components/PermissionDetailPanel.tsx
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, X, AlertCircle } from "lucide-react";
import { Permission } from "@/lib/api";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type PermissionDetailPanelProps = {
    permission: Permission;
    onClose: () => void;
    onRevoke: (permission: Permission) => Promise<void>;
};

const getAccessLevelDisplay = (accessType: string) => {
    const mapping: Record<string, string> = {
        'READ': 'Read-Only Access',
        'WRITE': 'Write-Only Access',
        'READANDWRITE': 'Full Access (Read & Write)',
    };
    return mapping[accessType] || accessType;
};

const getAccessScope = (accessType: string): string[] => {
    if (accessType === 'READANDWRITE') {
        return [
            "Lab Tests",
            "Imaging",
            "Vital Notes",
            "Vaccinations",
            "Medications",
            "Allergies",
            "Chronic Conditions",
            "Emergency Data"
        ];
    } else if (accessType === 'READ') {
        return ["Read access to all medical records"];
    } else if (accessType === 'WRITE') {
        return ["Write access to medical records"];
    }
    return [];
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

const calculateDaysRemaining = (grantedAt: string): string => {
    // This is a placeholder - you'd need actual expiry date from backend
    const granted = new Date(grantedAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - granted.getTime()) / (1000 * 60 * 60 * 24));

    return `Granted ${diffDays} days ago`;
};

export const PermissionDetailPanel = ({
    permission,
    onClose,
    onRevoke
}: PermissionDetailPanelProps) => {
    const [showRevokeDialog, setShowRevokeDialog] = useState(false);
    const [isRevoking, setIsRevoking] = useState(false);

    const handleRevoke = async () => {
        setIsRevoking(true);
        try {
            await onRevoke(permission);
            setShowRevokeDialog(false);
        } catch (error) {
            console.error("Failed to revoke permission:", error);
        } finally {
            setIsRevoking(false);
        }
    };

    const accessScope = getAccessScope(permission.access_type);

    return (
        <>
            <div className="h-full bg-white border-none rounded-lg shadow-xl overflow-y-auto">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start pb-4 border-b border-gray-200">
                        <h3 className="text-xl font-bold">{permission.clinic_name}</h3>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Status Badge */}
                    {permission.revoked && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <div>
                                <p className="text-sm font-medium text-red-900">Access Revoked</p>
                                <p className="text-xs text-red-700">
                                    Revoked on {formatDate(permission.revoked_at!)}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Basic Info */}
                    <div className="space-y-3 text-sm">
                        <InfoRow label="Clinic ID" value={permission.clinic_id} />
                        <InfoRow
                            label="Status"
                            value={permission.revoked ? "Revoked" : permission.granted ? "Active" : "Inactive"}
                        />
                    </div>

                    {/* Access Level */}
                    <Section
                        title="Access Level"
                        content={getAccessLevelDisplay(permission.access_type)}
                    />

                    {/* Access Scope */}
                    <div className="space-y-3">
                        <h4 className="font-semibold border-b border-gray-200 pb-2">Access Scope</h4>
                        <div className="flex flex-wrap gap-2">
                            {accessScope.map((scope, i) => (
                                <span
                                    key={i}
                                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                                    {scope}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3">
                        <h4 className="font-semibold border-b border-gray-200 pb-2">Timeline</h4>
                        <div className="space-y-2 text-sm">
                            <InfoRow
                                label="Granted On"
                                value={formatDate(permission.granted_at)}
                            />
                            {permission.revoked_at && (
                                <InfoRow
                                    label="Revoked On"
                                    value={formatDate(permission.revoked_at)}
                                />
                            )}
                            <InfoRow
                                label="Duration"
                                value={calculateDaysRemaining(permission.granted_at)}
                            />
                        </div>
                    </div>

                    {/* Permission ID */}
                    <div className="space-y-2">
                        <h4 className="font-semibold border-b border-gray-200 pb-2">Permission Details</h4>
                        <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-xs text-muted-foreground">Permission ID</p>
                            <p className="text-sm font-mono break-all">{permission.permissions_id}</p>
                        </div>
                    </div>

                    {/* AI Insight Placeholder */}
                    {!permission.revoked && (
                        <Section
                            title="HealthChain AI Insight"
                            content="This clinic has standard access patterns consistent with medical care delivery."
                        />
                    )}

                    {/* Actions */}
                    {!permission.revoked && (
                        <div className="space-y-3">
                            <h4 className="font-semibold border-b border-gray-200 pb-2">Actions</h4>
                            <div className="grid grid-cols-1 gap-2">
                                <Button
                                    variant="destructive"
                                    className="w-full justify-start rounded-lg"
                                    onClick={() => setShowRevokeDialog(true)}
                                    disabled={isRevoking}
                                >
                                    <Lock className="mr-2 h-4 w-4" />
                                    {isRevoking ? "Revoking..." : "Revoke Access"}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start rounded-lg border-primary"
                                    disabled
                                >
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Extend Access (Coming Soon)
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Revoked Message */}
                    {permission.revoked && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                                This permission has been revoked and the clinic no longer has access to your records.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Revoke Confirmation Dialog */}
            <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Revoke Access</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to revoke access for <strong>{permission.clinic_name}</strong>?
                            <br /><br />
                            They will immediately lose all access to your medical records. This action cannot be undone,
                            but you can grant them access again later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isRevoking}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRevoke}
                            disabled={isRevoking}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isRevoking ? "Revoking..." : "Revoke Access"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
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