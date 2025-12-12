"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddDoctorPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Add New Doctor</h1>
        <p className="text-muted-foreground mt-1">Register a new healthcare provider</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctor Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input placeholder="John" />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input placeholder="Smith" />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="doctor@healthchain.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input placeholder="+234 XXX XXX XXXX" />
          </div>
          <div>
            <Label>Specialty</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="internal">Internal Medicine</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>License Number</Label>
            <Input placeholder="MD-XXXXX" />
          </div>
          <div className="flex gap-2">
            <Button>Add Doctor</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
