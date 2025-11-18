"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import * as React from "react"

export function EmergencyContactForm() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="contact-name">Emergency Contact Name</Label>
        <Input
          id="contact-name"
          placeholder="Who should we contact in an emergency?"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-phone">Emergency Phone Number</Label>
        <Input id="contact-phone" type="tel" placeholder="+234 800 000 0000" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="relationship">Relationship</Label>
        <Select>
          <SelectTrigger id="relationship">
            <SelectValue placeholder="Select Relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="parent">Parent</SelectItem>
            <SelectItem value="spouse">Spouse</SelectItem>
            <SelectItem value="sibling">Sibling</SelectItem>
            <SelectItem value="friend">Friend</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
