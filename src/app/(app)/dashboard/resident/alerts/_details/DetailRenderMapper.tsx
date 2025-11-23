import * as React from 'react';
import { MalariaAlertDetail } from './MalariaAlertDetail';
import { HealthUpdateDetail } from './HealthUpdateDetail';
import { ReminderDetail } from './ReminderDetail';
import { SecurityDetail } from './SecurityDetail';

/**
 * Determines and renders the specific detail panel based on the alert title.
 * This replaces the complex switch logic in the main page.
 */
export const renderDetailPanel = (alert: any, onClose: () => void) => {
    if (alert.title.includes("Malaria Outbreak")) {
        return <MalariaAlertDetail onClose={onClose} />; 
    }
    if (alert.title.includes("X-Ray Result") || alert.category === 'Health Updates') {
        return <HealthUpdateDetail onClose={onClose} />;
    }
    if (alert.title.includes("Annual Physical") || alert.category === 'Reminders & Tasks') {
        return <ReminderDetail onClose={onClose} />;
    }
    if (alert.title.includes("Access Granted") || alert.title.includes("Access Ending") || alert.category === 'System & Security Alerts') {
        return <SecurityDetail onClose={onClose} />;
    }
    
    // Default fallback
    return (
        <div className="p-6">
            <h3 className="text-xl font-bold">Alert Detail</h3>
            <p className="text-muted-foreground mt-4">Details for "{alert.title}" not yet implemented.</p>
            <button onClick={onClose} className="text-primary mt-4 underline">Close</button>
        </div>
    );
};