import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Trash2 } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import { mockDevices } from "../_data/SettingsData";
import * as React from "react";

export const SecuritySection = () => (
    <div className="space-y-6 border-none bg-white rounded-lg p-4">
        <SectionContainer title="Password Management">
            <div className="flex gap-4">
                <Button variant="outline" className="border-primary rounded-lg"><Lock className="mr-2 h-4 w-4" /> Change Password</Button>
                <Button variant="outline" className="border-primary rounded-lg"><Trash2 className="mr-2 h-4 w-4" /> Reset Password</Button>
            </div>
        </SectionContainer>

        <SectionContainer title="List of recent logins">
            <div className="overflow-x-auto">
                <Table className="border-b border-separate border-spacing-y-2 border-gray-200">
                    <TableHeader>
                        <TableRow className="bg-secondary hover:bg-secondary">
                            <TableHead>Device</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead className="w-[100px] text-right">Days Ago</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockDevices.map((device, i) => (
                            <TableRow key={i} className="text-sm">
                                <TableCell className="font-medium">{device.device}</TableCell>
                                <TableCell>{device.ipAddress}</TableCell>
                                <TableCell>{device.location}</TableCell>
                                <TableCell>{device.lastUsed}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{device.daysAgo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </SectionContainer>

        <SectionContainer title="Active Sessions">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <p className="font-medium">Current active device</p>
                <span className="text-sm text-muted-foreground">Jan 05, 2025</span>
            </div>
            <div className="flex justify-end pt-3">
                <Button variant="outline" className="border-primary rounded-lg" size="sm">Sign Out from All Devices</Button>
            </div>
        </SectionContainer>

        <SectionContainer title="Two-Factor Authentication (2FA)">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <p className="font-medium">Turn ON/OFF</p>
                <Switch className="bg-" />
            </div>

            <h4 className="font-semibold mt-4 mb-2">Methods</h4>
            <RadioGroup defaultValue="email" className="space-y-3">
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="email" id="m1" />
                    <Label htmlFor="m1" className="font-normal">Email</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="sms" id="m2" />
                    <Label htmlFor="m2" className="font-normal">SMS</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="authenticator" id="m3" />
                    <Label htmlFor="m3" className="font-normal">Authenticator App</Label>
                </div>
            </RadioGroup>

            <h4 className="font-semibold mt-6 mb-2">Security Questions</h4>
            <div className="flex justify-end">
                <Button variant="outline" className="border-primary rounded-lg" size="sm">Set questions</Button>
            </div>
        </SectionContainer>
    </div>
);