"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileText } from "lucide-react";

export default function ClinicRecordsPage() {
  const records = [
    { id: "REC-001", patient: "John Doe", doctor: "Dr. Sarah Johnson", type: "Lab Results", date: "2024-01-15" },
    { id: "REC-002", patient: "Jane Smith", doctor: "Dr. Michael Chen", type: "Prescription", date: "2024-01-14" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <p className="text-muted-foreground mt-1">Access all patient records</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records..." className="pl-10" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Record ID</th>
                  <th className="py-3 px-4 text-left">Patient</th>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-secondary/50">
                    <td className="py-3 px-4">{record.id}</td>
                    <td className="py-3 px-4">{record.patient}</td>
                    <td className="py-3 px-4">{record.doctor}</td>
                    <td className="py-3 px-4">{record.type}</td>
                    <td className="py-3 px-4">{record.date}</td>
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