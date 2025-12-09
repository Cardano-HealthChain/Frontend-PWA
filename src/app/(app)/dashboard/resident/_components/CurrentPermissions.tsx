"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Trash2, ArrowRight, MoreVertical, XCircle, Clock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { revokePermission } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type Permission = {
    icon?: string;
    clinic: string;
    role: string;
    expires: string;
    active?: boolean;
    clinic_id?: string;
};

type CurrentPermissionsProps = {
    permissions: Permission[];
    hasActiveRecords: boolean;
    onRefresh?: () => void;
};

export const CurrentPermissions = ({
    permissions,
    hasActiveRecords,
    onRefresh
}: CurrentPermissionsProps) => {
    const hasPermissions = permissions.length > 0;
    const { toast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);

    const handleRevokeAccess = async (permission: Permission) => {
        if (!permission.clinic_id) {
            toast({
                title: "Error",
                description: "Cannot revoke: Clinic ID not found",
                variant: "destructive",
            });
            return;
        }

        try {
            setLoading(permission.clinic_id);
            await revokePermission(permission.clinic_id);

            toast({
                title: "Access Revoked",
                description: `Access to ${permission.clinic} has been revoked.`,
            });

            // Refresh data
            if (onRefresh) {
                onRefresh();
            }
        } catch (error: any) {
            console.error("Revoke error:", error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to revoke access",
                variant: "destructive",
            });
        } finally {
            setLoading(null);
        }
    };

    const handleExtendAccess = (permission: Permission) => {
        toast({
            title: "Coming Soon",
            description: "Extend access feature will be available soon.",
        });
    };

    const handleDelete = (permission: Permission) => {
        toast({
            title: "Confirm Delete",
            description: "This will permanently delete this permission record.",
        });
    };

    return (
        <Card className="shadow-lg h-full border-none">
            <CardHeader className="border-b border-gray-100 py-1">
                <CardTitle className="text-lg font-bold text-primary">
                    Active Permissions
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
                {hasPermissions ? (
                    <div className="space-y-2">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                                        Clinic
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                                        Role
                                    </th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">
                                        Duration
                                    </th>
                                    <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {permissions.slice(0, 3).map((permission, index) => (
                                    <tr key={index} className="hover:bg-muted/50">
                                        <td className="py-3 px-1">
                                            <p className="text-xs whitespace-nowrap font-medium">
                                                {permission.clinic}
                                            </p>
                                        </td>
                                        <td className="py-3 px-1">
                                            <span
                                                className="text-xs rounded-full px-2 py-0.5 inline-block font-medium"
                                                style={{
                                                    backgroundColor:
                                                        permission.role === "Read/Write"
                                                            ? "#ffdfdb"
                                                            : permission.role === "Write Only"
                                                                ? "#fff3cd"
                                                                : "#e0f7fa",
                                                    color:
                                                        permission.role === "Read/Write"
                                                            ? "#d32f2f"
                                                            : permission.role === "Write Only"
                                                                ? "#856404"
                                                                : "#00bcd4",
                                                }}
                                            >
                                                {permission.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-1">
                                            <span className="text-xs text-muted-foreground/80">
                                                {permission.active === false
                                                    ? "Revoked"
                                                    : `Expires ${permission.expires}`
                                                }
                                            </span>
                                        </td>
                                        <td className="py-3 px-1 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        disabled={loading === permission.clinic_id}
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-white border-none">
                                                    <DropdownMenuItem
                                                        onClick={() => handleRevokeAccess(permission)}
                                                        className="cursor-pointer text-yellow-600 focus:text-yellow-600"
                                                        disabled={permission.active === false}
                                                    >
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        <span>Revoke Access</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleExtendAccess(permission)}
                                                        className="cursor-pointer text-green-600 focus:text-green-600"
                                                    >
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        <span>Extend Access</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(permission)}
                                                        className="cursor-pointer text-destructive focus:text-destructive"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link href="/dashboard/resident/permissions">
                            <Button variant="link" className="p-0 pt-2 text-sm h-auto font-semibold w-full justify-end">
                                See All Permissions <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                            <Lock className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">No Active Permissions</h3>
                        <p className="mt-2 text-sm text-muted-foreground px-4">
                            You haven&apos;t shared access with any clinic yet.
                        </p>
                        <Link href="/dashboard/resident/permissions">
                            <Button className="mt-6 font-semibold" size="lg">
                                Share Access
                            </Button>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};