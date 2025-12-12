"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DoctorSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Dr. John Smith" />
          </div>
          <div>
            <Label>Specialty</Label>
            <Input placeholder="Cardiology" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="doctor@healthchain.com" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input placeholder="+234 XXX XXX XXXX" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Current Password</Label>
            <Input type="password" />
          </div>
          <div>
            <Label>New Password</Label>
            <Input type="password" />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" />
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}