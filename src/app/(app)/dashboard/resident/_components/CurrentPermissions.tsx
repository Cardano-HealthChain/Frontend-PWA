import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PermissionItem = ({ permission }: { permission: any }) => (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
        <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-primary/70" />
            <div>
                <p className="text-sm font-medium">{permission.clinic}</p>
                <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs rounded-full px-2 py-0.5"
                        style={{ backgroundColor: permission.role === 'Read/Write' ? '#ffdfdb' : '#e0f7fa', color: permission.role === 'Read/Write' ? '#d32f2f' : '#00bcd4' }}>
                        {permission.role}
                    </span>
                    <span className="text-xs text-muted-foreground/80">
                        Expires {permission.expires}
                    </span>
                </div>
            </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive">
            <Trash2 className="h-4 w-4" />
        </Button>
    </div>
);

export const CurrentPermissions = ({ permissions, hasActiveRecords }: { permissions: any[], hasActiveRecords: boolean }) => {

    const hasPermissions = permissions.length > 0;

    return (
        <Card className="shadow-lg h-full border-none">
            <CardHeader className="border-b">
                <CardTitle className="text-xl font-bold">Active Permissions</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {hasPermissions ? (
                    // ACTIVE STATE
                    <div className="space-y-2">
                        {permissions.slice(0, 3).map((p, i) => (
                            <PermissionItem key={i} permission={p} />
                        ))}
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