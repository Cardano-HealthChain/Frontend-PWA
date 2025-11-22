import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Trash2, ArrowRight, MoreVertical, XCircle, Clock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

// Define the Permission type
type Permission = {
    icon?: string;
    clinic: string;
    role: string;
    expires: string;
};

type CurrentPermissionsProps = {
    permissions: Permission[];
    hasActiveRecords: boolean;
};

export const CurrentPermissions = ({ permissions, hasActiveRecords }: CurrentPermissionsProps) => {
    const hasPermissions = permissions.length > 0;

    // Handler functions
    const handleRevokeAccess = (permission: Permission) => {
        console.log("Revoke access for:", permission.clinic);
        // Add your revoke logic here
    };

    const handleExtendAccess = (permission: Permission) => {
        console.log("Extend access for:", permission.clinic);
        // Add your extend logic here
    };

    const handleDelete = (permission: Permission) => {
        console.log("Delete:", permission.clinic);
        // Add your delete logic here
    };

    return (
        <Card className="shadow-lg h-full border-none">
            <CardHeader className="border-b border-gray-100 py-1">
                <CardTitle className="text-lg font-bold text-primary">Active Permissions</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-2">
                {hasPermissions ? (
                    // ACTIVE STATE
                    <div className="space-y-2">
                        <table className="w-full">
                            <thead>
                                <tr className="">
                                    {/* <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Icon</th> */}
                                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Clinic</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Role</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Duration</th>
                                    <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {permissions.slice(0, 3).map((permission, index) => (
                                    <tr key={index} className="hover:bg-muted/50">
                                        {/* Icon Column */}
                                        {/* <td className="py-3 px-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                {permission.icon ? (
                                                    <Image
                                                        src={permission.icon}
                                                        alt={permission.clinic}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <Shield className="h-5 w-5 text-primary/70" />
                                                )}
                                            </div>
                                        </td> */}

                                        {/* Clinic Column */}
                                        <td className="py-3 px-1">
                                            <p className="text-xs whitespace-nowrap font-medium">{permission.clinic}</p>
                                        </td>

                                        {/* Role Column */}
                                        <td className="py-3 px-1">
                                            <span
                                                className="text-xs rounded-full px-2 py-0.5 inline-block font-medium"
                                                style={{
                                                    backgroundColor: permission.role === 'Read/Write' ? '#ffdfdb' : '#e0f7fa',
                                                    color: permission.role === 'Read/Write' ? '#d32f2f' : '#00bcd4',
                                                    borderColor: permission.role === 'Read/Write' ? '#d32f2f' : '#005cd4ff',
                                                }}
                                            >
                                                {permission.role}
                                            </span>
                                        </td>

                                        {/* Duration Column */}
                                        <td className="py-3 px-1">
                                            <span className="text-xs text-muted-foreground/80">
                                                Expires {permission.expires}
                                            </span>
                                        </td>

                                        {/* Actions Column - Dropdown Menu */}
                                        <td className="py-3 px-1 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-white border-none">
                                                    <DropdownMenuItem
                                                        onClick={() => handleRevokeAccess(permission)}
                                                        className="cursor-pointer text-yellow-300 focus:text-yellow-300"
                                                    >
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        <span>Revoke Access</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleExtendAccess(permission)}
                                                        className="cursor-pointer text-green-300 focus:text-green-300"
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
                        <Button variant="link" className="p-0 pt-2 text-sm h-auto font-semibold w-full justify-end">
                            See All Permissions <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    // EMPTY STATE
                    <div className="flex flex-col items-center justify-center text-center py-12">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                            <Lock className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">No Active Permissions</h3>
                        <p className="mt-2 text-sm text-muted-foreground px-4">
                            You haven&apos;t shared access with any clinic yet.
                        </p>
                        <Button className="mt-6 font-semibold" size="lg">
                            Share Access
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};