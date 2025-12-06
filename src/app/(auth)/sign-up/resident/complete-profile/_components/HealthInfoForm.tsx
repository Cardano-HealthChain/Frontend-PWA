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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

// Zod Schema for Health Information
const healthInfoSchema = z.object({
  bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"]).refine(
    (value) => value !== undefined,
    { message: "Please select a blood type" }
  ),
  genotype: z.enum(["AA", "AS", "SS", "AC", "unknown"]).refine(
    (value) => value !== undefined,
    { message: "Please select a genotype" }
  ),
  allergies: z.array(z.string()).default([]),
  conditions: z.array(z.string()).default([]),
});

export type HealthInfoFormData = z.infer<typeof healthInfoSchema>;

interface HealthInfoFormProps {
  onSubmit: (data: HealthInfoFormData) => void;
  defaultValues?: Partial<HealthInfoFormData>;
}

export function HealthInfoForm({ onSubmit, defaultValues }: HealthInfoFormProps) {
  const form = useForm({
    resolver: zodResolver(healthInfoSchema),
    defaultValues: {
      bloodType: defaultValues?.bloodType,
      genotype: defaultValues?.genotype,
      allergies: defaultValues?.allergies || [],
      conditions: defaultValues?.conditions || [],
    },
  });

  const bloodType = form.watch("bloodType");
  const genotype = form.watch("genotype");

  return (
    <Form {...form}>
      <form id="step-2-form" onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-primary">
                      <SelectValue placeholder="Select Blood Type" />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="genotype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genotype</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-primary">
                      <SelectValue placeholder="Select Genotype" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="AA">AA</SelectItem>
                    <SelectItem value="AS">AS</SelectItem>
                    <SelectItem value="SS">SS</SelectItem>
                    <SelectItem value="AC">AC</SelectItem>
                    <SelectItem value="unknown">I don't know</SelectItem>
                  </SelectContent>
                </Select>
                {genotype === "unknown" && (
                  <p className="text-xs text-muted-foreground">
                    You can update this later after a clinic visit.
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2 md:col-span-2">
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Known Allergies</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={allergyOptions}
                    selected={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Add Allergy"
                    className="border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2 md:col-span-2">
          <FormField
            control={form.control}
            name="conditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pre-existing Conditions (Optional)</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={conditionOptions}
                    selected={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="Add Condition"
                    className="border-primary"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  Used for the AI Assistant into Phase 2 and for alert personalization.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}