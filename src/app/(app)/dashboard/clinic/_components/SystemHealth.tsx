// SystemHealth.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const SystemHealth = ({ activeUsers }: { activeUsers: number }) => (
    <Card className="shadow-lg border-none">
        <CardHeader className="border-b border-gray-300">
            <CardTitle className="text-lg font-bold">System Health</CardTitle>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
            <div>
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                        Database Performance
                    </span>
                    <span className="text-sm font-semibold text-green-600">Optimal</span>
                </div>
                <Progress value={98} className="h-2" />
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Active Users</span>
                    <span className="text-sm font-semibold">{activeUsers}</span>
                </div>
                <Progress value={75} className="h-2" />
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Storage Used</span>
                    <span className="text-sm font-semibold">67%</span>
                </div>
                <Progress value={67} className="h-2" />
            </div>
        </CardContent>
    </Card>
);
