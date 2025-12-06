"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
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

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT (Abuja)",
];

// Zod Schema for Location
const locationSchema = z.object({
  country: z.string().default("Nigeria"),
  state: z.string().min(1, "Please select a state or region"),
});

export type LocationFormData = z.infer<typeof locationSchema>;

interface LocationFormProps {
  onSubmit: (data: LocationFormData) => void;
  defaultValues?: Partial<LocationFormData>;
}

export function LocationForm({ onSubmit, defaultValues }: LocationFormProps) {
  const form = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: defaultValues?.country || "Nigeria",
      state: defaultValues?.state || "",
    },
  });

  return (
    <Form {...form}>
      <form id="step-4-form" onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <p className="text-sm text-primary md:col-span-2">
          This determines geotargeted alerts, vaccination drives, and outbreak notices.
        </p>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State / Region</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-primary">
                      <SelectValue placeholder="Select State / Region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state.toLowerCase()}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}