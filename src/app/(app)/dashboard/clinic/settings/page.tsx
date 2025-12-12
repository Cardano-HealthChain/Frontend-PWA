"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ClinicSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Clinic Settings</h1>
        <p className="text-muted-foreground mt-1">Manage clinic information and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clinic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Clinic Name</Label>
            <Input placeholder="HealthChain Medical Center" />
          </div>
          <div>
            <Label>Location</Label>
            <Input placeholder="Lagos, Nigeria" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="info@healthchain.com" />
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
          <CardTitle>Operating Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Opening Time</Label>
              <Input type="time" defaultValue="09:00" />
            </div>
            <div>
              <Label>Closing Time</Label>
              <Input type="time" defaultValue="17:00" />
            </div>
          </div>
          <Button variant="outline">Update Hours</Button>
        </CardContent>
      </Card>
    </div>
  );
}