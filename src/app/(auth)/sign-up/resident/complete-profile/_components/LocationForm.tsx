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

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT (Abuja)",
]

export function LocationForm() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <p className="text-sm text-primary md:col-span-2">
        This determines geotargeted alerts, vaccination drives, and outbreak
        notices.
      </p>

      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" defaultValue="Nigeria" readOnly className="border-primary" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="state">State / Region</Label>
        <Select>
          <SelectTrigger className="border-primary" id="state">
            <SelectValue placeholder="Select State / Region" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {nigerianStates.map((state) => (
              <SelectItem key={state} value={state.toLowerCase()}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
