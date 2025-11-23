"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertsDetailWrapper } from './_components/AlertDetailWrapper';
import { AlertsListTable } from './_components/AlertListTable';
import { ALL_ALERTS, alertTabs } from './_data/alertData'; // Import data

export default function AlertsPage() {
    const [activeTab, setActiveTab] = useState('all');
    
    // 1. Filter alerts based on the active tab
    const filteredAlerts = useMemo(() => {
        return ALL_ALERTS.filter(alert => 
            activeTab === 'all' ? true : alert.category.toLowerCase().replace(/\s/g, '-') === activeTab 
        );
    }, [activeTab]);
    
    const [selectedAlert, setSelectedAlert] = useState<any>(filteredAlerts[0] || null);

    // 2. Auto-select the first alert in the new tab when switching
    useEffect(() => {
        if (filteredAlerts.length > 0) {
            setSelectedAlert(filteredAlerts[0]);
        } else {
            setSelectedAlert(null);
        }
    }, [activeTab, filteredAlerts]);

    return (
        <div className="flex h-full w-full">
            {/* Main Content Area */}
            <div className={cn("flex-1 transition-all duration-300 p-4 md:p-8", selectedAlert ? "lg:w-2/3" : "w-full")}>
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Alerts & Notifications</h1>
                <p className="text-lg text-muted-foreground mb-6">Stay updated on your health activities and important medical updates.</p>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 border border-gray-200 bg-white p-4 mb-6 rounded-lg">
                    {alertTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={cn(
                                "pb-3 text-sm font-semibold transition-colors",
                                activeTab === tab.id
                                    ? "border-b-2 border-primary text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Alerts List Table */}
                <AlertsListTable 
                    alerts={filteredAlerts}
                    selectedAlert={selectedAlert}
                    onSelect={setSelectedAlert}
                />
                
                <div className="flex justify-end mt-4">
                    <Button variant="link" className="text-sm font-semibold">See More</Button>
                </div>
            </div>

            {/* Detail Panel */}
            {selectedAlert && (
                <AlertsDetailWrapper 
                    alert={selectedAlert} 
                    onClose={() => setSelectedAlert(null)}
                />
            )}
        </div>
    );
}