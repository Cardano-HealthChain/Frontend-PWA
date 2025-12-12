"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export default function ClinicAppointmentsPage() {
  const appointments = [
    { id: 1, patient: "Alice Cooper", doctor: "Dr. Sarah Johnson", time: "10:00 AM", status: "Scheduled" },
    { id: 2, patient: "Bob Wilson", doctor: "Dr. Michael Chen", time: "11:00 AM", status: "In Progress" },
    { id: 3, patient: "Carol White", doctor: "Dr. Emily Rodriguez", time: "2:00 PM", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Appointments</h1>
        <p className="text-muted-foreground mt-1">View appointments across all doctors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((apt) => (
          <Card key={apt.id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">{apt.patient}</p>
                  <p className="text-sm text-muted-foreground">{apt.doctor}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{apt.time}</span>
                </div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    apt.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                  }`}>
                  {apt.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}