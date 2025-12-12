// QuickActions.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, FileText, Stethoscope, Bell } from "lucide-react";
import Link from "next/link";

export const QuickActions = () => (
  <Card className="shadow-lg border-none">
    <CardHeader className="border-b border-gray-200">
      <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
    </CardHeader>

    <CardContent className="pt-4 space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <Link href="/dashboard/doctor/patients/new">
        <Button className="w-full justify-center text-primary border-primary rounded-md" variant="outline">
          <UserCheck className="mr-2 h-4 w-4" />
          Add New Patient
        </Button>
      </Link>

      <Link href="/dashboard/doctor/records/create">
        <Button className="w-full justify-center text-primary border-primary rounded-md" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Create Record
        </Button>
      </Link>

      <Link href="/dashboard/doctor/prescriptions">
        <Button className="w-full justify-center text-primary border-primary rounded-md" variant="outline">
          <Stethoscope className="mr-2 h-4 w-4" />
          Write Prescription
        </Button>
      </Link>

      <Link href="/dashboard/doctor/notifications">
        <Button className="w-full justify-center text-primary border-primary rounded-md" variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          View Notifications
        </Button>
      </Link>
    </CardContent>
  </Card>
);
