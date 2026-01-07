"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function DoctorNotificationsPage() {
  const notifications = [
    { id: 1, type: "alert", title: "Critical Lab Results", message: "Abnormal results for John Doe", time: "5 mins ago", icon: AlertCircle, color: "text-red-500" },
    { id: 2, type: "success", title: "Appointment Confirmed", message: "Patient Alice Cooper confirmed", time: "1 hour ago", icon: CheckCircle, color: "text-green-500" },
    { id: 3, type: "info", title: "New Message", message: "Message from clinic administration", time: "2 hours ago", icon: Info, color: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground mt-1">Stay updated with important alerts</p>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full bg-secondary ${notif.color}`}>
                  <notif.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{notif.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}