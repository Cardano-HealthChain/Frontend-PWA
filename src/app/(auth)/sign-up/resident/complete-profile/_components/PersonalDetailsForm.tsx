"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCw, Info } from "lucide-react";
import * as React from "react";

export function PersonalDetailsForm() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-xl">
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="did" className="flex items-center gap-1">
          Your DID <Info className="h-3 w-3 text-muted-foreground" />
        </Label>
        <div className="relative">
          <Input
            id="did"
            type="text"
            defaultValue="345EUQX"
            readOnly
            className="pr-10 border-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="first-name">First Name</Label>
        <Input
          id="first-name"
          placeholder="Joshua"
          className="border-primary"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="last-name">Last Name</Label>
        <Input id="last-name" placeholder="Bryan" className="border-primary" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          placeholder="02/12/2000"
          className="border-primary flex justify-between"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="gender">Gender</Label>
        <Select>
          <SelectTrigger className="border-primary" id="gender">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-center text-muted-foreground md:col-span-2">
        Used to personalize certain medical recommendations.
      </p>
    </div>
  )
}