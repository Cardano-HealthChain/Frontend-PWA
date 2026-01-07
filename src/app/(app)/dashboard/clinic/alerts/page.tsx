"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

export default function ClinicAlertsPage() {
  const alerts = [
    { id: 1, type: "critical", title: "System Maintenance Required", message: "Database backup needed", icon: AlertCircle },
    { id: 2, type: "warning", title: "Doctor Availability Low", message: "Only 3 doctors scheduled tomorrow", icon: AlertTriangle },
    { id: 3, type: "info", title: "New Patient Registration", message: "15 new patients this week", icon: Info },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Critical Alerts</h1>
        <p className="text-muted-foreground mt-1">Monitor important system alerts</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`border-none ${getAlertColor(alert.type)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <alert.icon className={`h-6 w-6 ${alert.type === 'critical' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                  }`} />
                <div className="flex-1">
                  <h3 className="font-semibold">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}