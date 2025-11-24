"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

// Import the new components and data
import { SettingsNav } from "./_components/SettingsNav";
import { ProfileSection } from "./_components/ProfileSection";
import { SecuritySection } from "./_components/SecuritySection";
import { NotificationSection } from "./_components/NotificationSection";
import { User, Lock, Shield, Bell, Share2, Settings, LogOut, Info } from "lucide-react";


// Map component IDs to the imported components
const settingsComponents: { [key: string]: React.FC } = {
    'profile': ProfileSection,
    'security': SecuritySection,
    'notifications': NotificationSection,
    // Placeholder components for sections not yet implemented
    'privacy': () => <div className="p-6 text-muted-foreground">Privacy Controls content coming soon.</div>,
    'permissions': () => <div className="p-6 text-muted-foreground">Permissions & Sharing quick links coming soon.</div>,
    'app': () => <div className="p-6 text-muted-foreground">App Preferences content coming soon.</div>,
    'about': () => <div className="p-6 text-muted-foreground">About HealthChain info coming soon.</div>,
    'logout': () => <div className="p-6 text-muted-foreground">Logout confirmation coming soon.</div>,
};

export default function SettingsPage() {
    // Default to the Profile section
    const [activeSection, setActiveSection] = useState('profile');

    // Dynamically select the component to render based on the activeSection state
    const ActiveComponent = settingsComponents[activeSection] || ProfileSection;

    return (
        <div className="p-4 md:p-4">
            <h1 className="text-xl lg:text-4xl font-extrabold tracking-tight mb-3">Settings</h1>
            <p className="text-lg text-muted-foreground mb-10">Manage your profile, privacy, notifications, and security preferences.</p>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Left Column: Navigation Menu (Now a dedicated component) */}
                <SettingsNav
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />

                {/* Right Column: Active Content */}
                <div className="lg:col-span-2">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
}