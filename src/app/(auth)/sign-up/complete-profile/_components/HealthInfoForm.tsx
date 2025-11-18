"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

const allergyOptions = [
  { value: "penicillin", label: "Penicillin" },
  { value: "sulfa", label: "Sulfa drugs" },
  { value: "latex", label: "Latex" },
  { value: "nuts", label: "Nuts" },
  { value: "shellfish", label: "Shellfish" },
  { value: "pollen", label: "Pollen" },
  { value: "dust", label: "Dust" },
];

const conditionOptions = [
  { value: "diabetes", label: "Diabetes" },
  { value: "hypertension", label: "Hypertension" },
  { value: "asthma", label: "Asthma" },
  { value: "sickle-cell", label: "Sickle Cell" },
  { value: "heart-condition", label: "Heart Condition" },
];

export function HealthInfoForm() {
  const [bloodType, setBloodType] = React.useState("");
  const [genoType, setGenoType] = React.useState("");
  const [allergies, setAllergies] = React.useState<string[]>([
    "penicillin",
    "latex",
  ]);
  const [conditions, setConditions] = React.useState<string[]>([
    "diabetes",
    "asthma",
  ]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="blood-type">Blood Type</Label>
        <Select onValueChange={setBloodType}>
          <SelectTrigger className="border-primary" id="blood-type">
            <SelectValue placeholder="Select Blood Type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
            <SelectItem value="unknown">I don't know</SelectItem>
          </SelectContent>
        </Select>
        {bloodType === "unknown" && (
          <p className="text-xs text-muted-foreground">
            You can update this later after a clinic visit.
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="genotype">Genotype</Label>
        <Select onValueChange={setGenoType}>
          <SelectTrigger className="border-primary" id="genotype">
            <SelectValue placeholder="Select Genotype" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="AA">AA</SelectItem>
            <SelectItem value="AS">AS</SelectItem>
            <SelectItem value="SS">SS</SelectItem>
            <SelectItem value="AC">AC</SelectItem>
            <SelectItem value="unknown">I don't know</SelectItem>
          </SelectContent>
        </Select>
        {genoType === "unknown" && (
          <p className="text-xs text-muted-foreground">
            You can update this later after a clinic visit.
          </p>
        )}
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label>Known Allergies</Label>
        <MultiSelect
          options={allergyOptions}
          selected={allergies}
          onChange={setAllergies}
          placeholder="Add Allergy"
        />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <Label>Pre-existing Conditions (Optional)</Label>
        <MultiSelect
          options={conditionOptions}
          selected={conditions}
          onChange={setConditions}
          placeholder="Add Condition"
        />
        <p className="text-xs text-muted-foreground">
          Used for the AI Assistant into Phase 2 and for alert personalization.
        </p>
      </div>
    </div>
  );
}