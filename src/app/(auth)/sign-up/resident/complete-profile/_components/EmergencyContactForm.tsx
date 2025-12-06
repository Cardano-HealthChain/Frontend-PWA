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

// Zod Schema for Emergency Contact
const emergencyContactSchema = z.object({
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  relationship: z.enum(["parent", "spouse", "sibling", "friend", "other"], {
    message: "Please select a relationship",
  }),
});

export type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>;

interface EmergencyContactFormProps {
  onSubmit: (data: EmergencyContactFormData) => void;
  defaultValues?: Partial<EmergencyContactFormData>;
}

export function EmergencyContactForm({ onSubmit, defaultValues }: EmergencyContactFormProps) {
  const form = useForm<EmergencyContactFormData>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      contactName: defaultValues?.contactName || "",
      contactPhone: defaultValues?.contactPhone || "",
      relationship: defaultValues?.relationship,
    },
  });

  return (
    <Form {...form}>
      <form id="step-3-form" onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid gap-2 md:col-span-2">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who should we contact in an emergency?</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Who should we contact in an emergency?"
                    className="border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-primary">
                      <SelectValue placeholder="Select Relationship" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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