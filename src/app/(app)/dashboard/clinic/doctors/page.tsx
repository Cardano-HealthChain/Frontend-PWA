"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope, Search, UserPlus, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ClinicDoctorsPage() {
  const doctors = [
    { id: 1, name: "Sarah Johnson", specialty: "Cardiology", patients: 45, status: "Active", satisfaction: 95 },
    { id: 2, name: "Michael Chen", specialty: "Pediatrics", patients: 62, status: "Active", satisfaction: 98 },
    { id: 3, name: "Emily Rodriguez", specialty: "Dermatology", patients: 38, status: "Active", satisfaction: 92 },
    { id: 4, name: "James Wilson", specialty: "Orthopedics", patients: 51, status: "Active", satisfaction: 96 },
    { id: 5, name: "Lisa Anderson", specialty: "Internal Medicine", patients: 73, status: "Active", satisfaction: 94 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medical Staff</h1>
          <p className="text-muted-foreground mt-1">Manage doctors and healthcare providers</p>
        </div>
        <Link href="/dashboard/clinic/doctors/add">
          <Button className="rounded-xl">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg border border-primary">
        <CardContent className="p-6">
          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search doctors..." className="pl-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="border-none shadow-sm">
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
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      {doctor.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Patients</span>
                      <span className="font-semibold">{doctor.patients}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Satisfaction</span>
                      <span className="font-semibold">{doctor.satisfaction}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}