"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export default function DoctorSchedulePage() {
  const schedule = [
    { day: "Monday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { day: "Tuesday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { day: "Wednesday", slots: ["9:00 AM - 1:00 PM"] },
    { day: "Thursday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    { day: "Friday", slots: ["9:00 AM - 12:00 PM"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Schedule</h1>
          <p className="text-muted-foreground mt-1">Manage your availability</p>
        </div>
        <Button>Edit Schedule</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((day) => (
          <Card key={day.day}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                {day.day}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {day.slots.map((slot, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{slot}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}