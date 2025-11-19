"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function AdminAccountForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="admin-name">Admin Full Name</Label>
        <Input id="admin-name" placeholder="Enter Admin Name" className="border-primary" />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="role">Official Role (e.g Disease Surveillance Officer )</Label>
        <Input id="role" placeholder="Enter Official Role" className="border-primary" />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter Email Address" className="border-primary" />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="phone">Phone Number</Label>
        {/* Simple phone input, internationalization is complex, so we keep it simple for now */}
        <Input id="phone" type="tel" placeholder="Enter Phone Number" className="border-primary" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Create Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="pr-10 border-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            className="pr-10 border-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters and identical
        </p>
      </div>

      <div className="flex items-center gap-2 md:col-span-2">
        <Checkbox id="primary-admin" defaultChecked />
        <Label htmlFor="primary-admin" className="font-normal">
          Make this person the primary admin
        </Label>
      </div>
      <p className="text-xs text-muted-foreground mt-1 md:col-span-2">
        You can add more officers and departments after registration.
      </p>
    </div>
  );
}