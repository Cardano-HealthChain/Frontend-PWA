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
        <Label htmlFor="contact-name">Who should we contact in an emergency?</Label>
        <Input
          id="contact-name"
          placeholder="Who should we contact in an emergency?"
          className="border-primary"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-phone">Emergency Phone Number</Label>
        <Input id="contact-phone" type="tel" placeholder="+234 800 000 0000" className="border-primary" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="relationship">Relationship</Label>
        <Select>
          <SelectTrigger className="border-primary" id="relationship">
            <SelectValue placeholder="Select Relationship" />
          </SelectTrigger>
          <SelectContent className="bg-white">
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
