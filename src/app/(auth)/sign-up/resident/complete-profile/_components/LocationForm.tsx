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
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const form = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: defaultValues?.country || "Nigeria",
      state: defaultValues?.state || "",
    },
  });

  const filteredStates = nigerianStates.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-primary w-full">
                      <SelectValue placeholder="Select State / Region">
                        {field.value ? nigerianStates.find(s => s.toLowerCase() === field.value) || field.value : "Select State / Region"}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
                    {/* Search input */}
                    <div className="sticky top-0 z-10 bg-white p-2 border-b">
                      <Input
                        placeholder="Search states..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    
                    {/* Filtered states */}
                    {filteredStates.length > 0 ? (
                      filteredStates.map((state) => (
                        <SelectItem 
                          key={state} 
                          value={state.toLowerCase()}
                          className="cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                        >
                          {state}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No states found matching "{searchTerm}"
                      </div>
                    )}
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