// app/dashboard/doctor/appointments/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video, MapPin, Plus, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const AppointmentCard = ({ appointment }: { appointment: any }) => {
  const getTypeIcon = (type: string) => {
    if (type === 'Video') return <Video className="h-4 w-4" />;
    return <MapPin className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{appointment.patientName}</h3>
              <p className="text-sm text-muted-foreground">{appointment.reason}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getTypeIcon(appointment.type)}
            <span>{appointment.type} Consultation</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            View Details
          </Button>
          {appointment.status === 'Scheduled' && (
            <Button size="sm" className="flex-1">
              Start Consultation
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function DoctorAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("today");

  // Sample data
  const todayAppointments = [
    {
      id: 1,
      patientName: "Alice Cooper",
      reason: "Follow-up Consultation",
      date: "Today",
      time: "10:00 AM - 10:30 AM",
      type: "In-Person",
      status: "Scheduled"
    },
    {
      id: 2,
      patientName: "Bob Wilson",
      reason: "Initial Consultation",
      date: "Today",
      time: "11:00 AM - 11:45 AM",
      type: "Video",
      status: "Scheduled"
    },
    {
      id: 3,
      patientName: "Carol White",
      reason: "Lab Results Review",
      date: "Today",
      time: "2:00 PM - 2:30 PM",
      type: "In-Person",
      status: "Completed"
    },
  ];

  const upcomingAppointments = [
    {
      id: 4,
      patientName: "Daniel Garcia",
      reason: "Prescription Renewal",
      date: "Tomorrow",
      time: "9:00 AM - 9:30 AM",
      type: "Video",
      status: "Scheduled"
    },
    {
      id: 5,
      patientName: "Emma Davis",
      reason: "Annual Check-up",
      date: "Jan 20, 2024",
      time: "10:00 AM - 10:45 AM",
      type: "In-Person",
      status: "Scheduled"
    },
  ];

  const pastAppointments = [
    {
      id: 6,
      patientName: "Frank Miller",
      reason: "Flu Symptoms",
      date: "Jan 10, 2024",
      time: "3:00 PM - 3:30 PM",
      type: "Video",
      status: "Completed"
    },
    {
      id: 7,
      patientName: "Grace Lee",
      reason: "Blood Pressure Check",
      date: "Jan 8, 2024",
      time: "11:00 AM - 11:20 AM",
      type: "In-Person",
      status: "Completed"
    },
  ];

  const stats = {
    today: todayAppointments.length,
    upcoming: upcomingAppointments.length,
    completed: [...todayAppointments, ...pastAppointments].filter(a => a.status === 'Completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your consultation schedule
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{stats.today}</p>
              <p className="text-sm text-muted-foreground mt-1">Today's Appointments</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.upcoming}</p>
              <p className="text-sm text-muted-foreground mt-1">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-muted-foreground mt-1">Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayAppointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingAppointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastAppointments.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}