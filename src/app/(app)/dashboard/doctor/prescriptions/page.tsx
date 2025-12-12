"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pill, Calendar } from "lucide-react";
import Link from "next/link";

export default function DoctorPrescriptionsPage() {
  const prescriptions = [
    { id: "RX-001", patient: "Alice Cooper", medication: "Lisinopril 10mg", dosage: "Once daily", date: "2024-01-15" },
    { id: "RX-002", patient: "Bob Wilson", medication: "Metformin 500mg", dosage: "Twice daily", date: "2024-01-14" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground mt-1">Manage patient prescriptions</p>
        </div>
        <Link href="/dashboard/doctor/prescriptions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((rx) => (
          <Card key={rx.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Pill className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{rx.patient}</p>
                    <p className="text-sm text-muted-foreground">{rx.id}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm"><strong>Medication:</strong> {rx.medication}</p>
                <p className="text-sm"><strong>Dosage:</strong> {rx.dosage}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{rx.date}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}