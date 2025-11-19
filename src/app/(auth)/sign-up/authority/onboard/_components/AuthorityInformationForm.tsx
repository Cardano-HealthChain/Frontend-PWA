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
import { Info } from "lucide-react";

const officialemailTypes = ["info@lagoshealth1", "info@lagoshealth2", "info@lagoshealth3", "info@lagoshealth4", "info@lagoshealth5"];
const nigerianStates = ["Lagos", "Oyo", "Ogun", "Abuja", "Kano", "Rivers", "Delta"]; // Limited list for demo
const localGovernments = ["LGA 1", "LGA 2", "LGA 3"]; // Placeholder

export function AuthorityInformationForm() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="clinic-name">
          Authority/Organization Name <br />{" "}
          <span className="text-xs text-primary capitalize">
            (e.g Lagos State Ministry of Health)
          </span>
        </Label>
        <Input
          id="clinic-name"
          placeholder="Enter Authority/Organization Name"
          className="border-primary"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="officialemail-type">Official Email Address</Label>
        <Select>
          <SelectTrigger className="border-primary" id="officialemail-type">
            <SelectValue placeholder="Select Organization Email Address" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {officialemailTypes.map((type) => (
              <SelectItem
                key={type}
                value={type.toLowerCase().replace(/\s/g, "-")}
              >
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="authority-phone">Official Phone Number</Label>
        <Input
          id="authority-phone"
          type="tel"
          placeholder="Enter Phone Number"
          className="border-primary"
        />
      </div>

      {/* <div className="grid gap-2">
        <Label htmlFor="registration-number">
          Registration Number{" "}
          <Info className="h-3 w-3 inline text-muted-foreground" />
        </Label>
        <Input
          id="registration-number"
          placeholder="Enter Registration Number"
          className="border-primary"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="clinic-email">Clinic Email Address</Label>
        <Input
          id="clinic-email"
          type="email"
          placeholder="Enter Clinic Email Address"
          className="border-primary"
        />
      </div> */}

      <div className="grid gap-2">
        <Label htmlFor="state">State / Region</Label>
        <Select>
          <SelectTrigger className="border-primary" id="state">
            <SelectValue placeholder="Select State" />
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

      <div className="grid gap-2">
        <Label htmlFor="lga">LGA / District</Label>
        <Select>
          <SelectTrigger className="border-primary" id="lga">
            <SelectValue placeholder="Select LGA" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {localGovernments.map((lga) => (
              <SelectItem key={lga} value={lga.toLowerCase()}>
                {lga}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter Clinic Address"
          className="border-primary"
        />
      </div>

      <p className="text-xs text-muted-foreground mt-4 md:col-span-2">
        This information is required to grant administrative access to regional
        oversight tools.
      </p>
    </div>
  )
}