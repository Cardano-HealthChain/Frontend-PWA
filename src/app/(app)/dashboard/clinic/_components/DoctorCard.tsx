// DoctorCard.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Eye } from "lucide-react";

export const DoctorCard = ({ doctor }: { doctor: any }) => (
  <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Dr. {doctor.name}</p>
            <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
          </div>
        </div>

        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            doctor.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {doctor.status}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Patients</span>
          <span className="font-semibold">{doctor.patientCount}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Appointments Today</span>
          <span className="font-semibold">{doctor.appointmentsToday}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Satisfaction</span>
          <span className="font-semibold">{doctor.satisfaction}%</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1 bg-primary text-white rounded-md">
          <Eye className="h-3 w-3 mr-1" /> View
        </Button>

        <Button size="sm" variant="outline" className="flex-1 border-primary rounded-md">
          Edit
        </Button>
      </div>
    </CardContent>
  </Card>
);
