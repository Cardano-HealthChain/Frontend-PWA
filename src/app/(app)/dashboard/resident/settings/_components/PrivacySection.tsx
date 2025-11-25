import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SectionContainer } from "./SectionContainer";
import * as React from "react";

export const PrivacySection = () => (
    <div className="space-y-6 border-none bg-white rounded-lg p-4">
        <SectionContainer title="Data Visibility">
            <p className="font-medium mb-3">Choose who can see:</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                    "Lab Results", "Imaging", "Mental Health Records", "Visit Notes"
                ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <input type="checkbox" id={`data-vis-${i}`} className="h-4 w-4 rounded border-primary text-primary focus:ring-primary" defaultChecked={i < 2} />
                        <label htmlFor={`data-vis-${i}`} className="text-sm font-normal">{item}</label>
                    </div>
                ))}
            </div>
        </SectionContainer>

        <SectionContainer title="Auto-Cleanup">
            <p className="font-medium mb-3">Delete old records after:</p>
            <RadioGroup defaultValue="never" className="flex flex-col gap-3">
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="3-months" id="c1" />
                    <Label htmlFor="c1" className="font-normal">3 months</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="6-months" id="c2" />
                    <Label htmlFor="c2" className="font-normal">6 months</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="1-year" id="c3" />
                    <Label htmlFor="c3" className="font-normal">1 year</Label>
                </div>
                <div className="flex items-center space-x-3">
                    <RadioGroupItem value="never" id="c4" />
                    <Label htmlFor="c4" className="font-normal">Never</Label>
                </div>
            </RadioGroup>
        </SectionContainer>

        <SectionContainer title="Activity Tracking">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium">Record View Tracking</span>
                <Switch defaultChecked />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium">Device Identification</span>
                <Switch defaultChecked />
            </div>
        </SectionContainer>
    </div>
);