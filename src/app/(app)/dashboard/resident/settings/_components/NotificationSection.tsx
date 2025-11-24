import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SectionContainer } from "./SectionContainer";
import * as React from "react";

export const NotificationSection = () => (
    <div className="space-y-6">
        <SectionContainer title="Notification Preferences">
            <h4 className="font-semibold mb-3">Alert Types</h4>
            <div className="space-y-2">
                {[
                    "Critical Alerts", "Lab Result Updates", "Imaging Updates",
                    "Visit Summaries", "Vaccination Reminders", "Medication Reminders",
                    "Access Changes (Permissions)", "System Updates", "Push Notifications"
                ].map((type, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-sm">{type}</span>
                        <Switch defaultChecked={i < 5} />
                    </div>
                ))}
            </div>

            <h4 className="font-semibold mt-6 mb-3">Delivery Channels</h4>
            <div className="space-y-2">
                {["Email", "SMS", "Push Notifications", "In-App Alerts"].map((channel, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-sm">{channel}</span>
                        <Switch defaultChecked={i < 3} />
                    </div>
                ))}
            </div>
        </SectionContainer>
    </div>
);