"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Calendar, FileText } from "lucide-react";

export default function ClinicAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">Comprehensive clinic performance metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Patient Growth</p>
                                <p className="text-2xl font-bold mt-1">+15%</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Appointments</p>
                                <p className="text-2xl font-bold mt-1">1,247</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active Doctors</p>
                                <p className="text-2xl font-bold mt-1">12</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Records Created</p>
                                <p className="text-2xl font-bold mt-1">1,856</p>
                            </div>
                            <FileText className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Department Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm">Cardiology</span>
                            <span className="text-sm font-semibold">92%</span>
                        </div>
                        <Progress value={92} />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm">Pediatrics</span>
                            <span className="text-sm font-semibold">87%</span>
                        </div>
                        <Progress value={87} />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm">Dermatology</span>
                            <span className="text-sm font-semibold">95%</span>
                        </div>
                        <Progress value={95} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}