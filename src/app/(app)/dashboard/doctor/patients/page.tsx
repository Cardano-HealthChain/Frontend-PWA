// app/dashboard/doctor/patients/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  MoreVertical,
  AlertCircle,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatientRow = ({ patient }: { patient: any }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'Stable': return 'bg-green-100 text-green-700';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <tr className="border-b border-primary hover:bg-secondary/50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
            {patient.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <p className="font-semibold">{patient.name}</p>
            <p className="text-xs text-muted-foreground">{patient.id}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <p className="text-sm">{patient.age} years</p>
        <p className="text-xs text-muted-foreground">{patient.gender}</p>
      </td>
      <td className="py-4 px-4">
        <p className="text-sm font-medium">{patient.condition}</p>
      </td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
      </td>
      <td className="py-4 px-4">
        <p className="text-sm">{patient.lastVisit}</p>
      </td>
      <td className="py-4 px-4">
        <p className="text-sm">{patient.nextAppointment || 'Not scheduled'}</p>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/doctor/patients/${patient.id}`}>
            <Button size="sm" variant="ghost">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/dashboard/doctor/patients/${patient.id}`}>View Details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
              <DropdownMenuItem>Create Record</DropdownMenuItem>
              <DropdownMenuItem>View History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
};

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data - replace with API call
  const patients = [
    {
      id: "PT-001",
      name: "John Doe",
      age: 45,
      gender: "Male",
      condition: "Hypertension",
      status: "Stable",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-15"
    },
    {
      id: "PT-002",
      name: "Jane Smith",
      age: 38,
      gender: "Female",
      condition: "Diabetes Type 2",
      status: "Critical",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-18"
    },
    {
      id: "PT-003",
      name: "Michael Brown",
      age: 52,
      gender: "Male",
      condition: "Asthma",
      status: "Stable",
      lastVisit: "2024-01-12",
      nextAppointment: null
    },
    {
      id: "PT-004",
      name: "Sarah Johnson",
      age: 29,
      gender: "Female",
      condition: "Arthritis",
      status: "Monitoring",
      lastVisit: "2024-01-14",
      nextAppointment: "2024-01-20"
    },
    {
      id: "PT-005",
      name: "David Lee",
      age: 61,
      gender: "Male",
      condition: "Heart Disease",
      status: "Critical",
      lastVisit: "2024-01-13",
      nextAppointment: "2024-01-17"
    },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: patients.length,
    critical: patients.filter(p => p.status === 'Critical').length,
    stable: patients.filter(p => p.status === 'Stable').length,
    monitoring: patients.filter(p => p.status === 'Monitoring').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Patients</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your patient roster
          </p>
        </div>
        <Link href="/dashboard/doctor/patients/new">
          <Button className="rounded-xl">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.critical}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stable</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{stats.stable}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitoring</p>
                <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.monitoring}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 sm:justify-between">
            <div className="flex-1 relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-none">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary bg-secondary/50">
                  <th className="py-3 px-4 text-left text-sm font-semibold">Patient</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Age/Gender</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Condition</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Last Visit</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Next Appointment</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <PatientRow key={patient.id} patient={patient} />
                ))}
              </tbody>
            </table>
            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No patients found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}