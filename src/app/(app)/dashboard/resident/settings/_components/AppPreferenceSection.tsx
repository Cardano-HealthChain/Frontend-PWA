import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { SectionContainer } from "./SectionContainer";
import * as React from "react";

export const AppPreferencesSection = () => (
    <div className="space-y-6 border-none bg-white rounded-lg p-4">
        <SectionContainer title="Display Settings">
            <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="light">
                        <SelectTrigger id="theme">
                            <SelectValue placeholder="Select Theme" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none">
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark (Coming Soon)</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="english">
                        <SelectTrigger id="language">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none">
                            <SelectItem value="english">English (US)</SelectItem>
                            <SelectItem value="yoruba">Yoruba</SelectItem>
                            <SelectItem value="hausa">Hausa</SelectItem>
                            <SelectItem value="igbo">Igbo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </SectionContainer>

        <SectionContainer title="Regional Settings">
            <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="time-zone">Time Zone</Label>
                    <Input id="time-zone" defaultValue="Africa/Lagos (GMT+1)" readOnly />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="dmy">
                        <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select Format" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none">
                            <SelectItem value="dmy">DD/MM/YYYY (e.g., 25/11/2025)</SelectItem>
                            <SelectItem value="mdy">MM/DD/YYYY (e.g., 11/25/2025)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </SectionContainer>

        <SectionContainer title="Data Export">
            <p className="text-sm text-muted-foreground mb-4">You can export a copy of all your off-chain data (encrypted records, audit logs, and profile information) at any time.</p>
            <Button variant="default" className="rounded-lg"><Download className="mr-2 h-4 w-4" /> Export All Data</Button>
        </SectionContainer>
    </div>
);