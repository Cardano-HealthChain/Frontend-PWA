"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";

export default function ClinicPatientsPage() {
  const patients = [
    { id: "PT-001", name: "John Doe", doctor: "Dr. Sarah Johnson", lastVisit: "2024-01-15", status: "Active" },
    { id: "PT-002", name: "Jane Smith", doctor: "Dr. Michael Chen", lastVisit: "2024-01-14", status: "Active" },
    { id: "PT-003", name: "Mike Brown", doctor: "Dr. Emily Rodriguez", lastVisit: "2024-01-13", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Patients</h1>
        <p className="text-muted-foreground mt-1">View all patients across the clinic</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search patients..." className="pl-10" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Patient ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Assigned Doctor</th>
                  <th className="py-3 px-4 text-left">Last Visit</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-secondary/50">
                    <td className="py-3 px-4">{patient.id}</td>
                    <td className="py-3 px-4 font-medium">{patient.name}</td>
                    <td className="py-3 px-4">{patient.doctor}</td>
                    <td className="py-3 px-4">{patient.lastVisit}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}