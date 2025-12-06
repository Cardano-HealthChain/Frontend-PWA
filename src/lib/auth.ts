import * as z from "zod";

// Personal Details Schema
export const personalDetailsSchema = z.object({
    did: z.string().min(1, "DID is required"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female", "prefer-not-to-say"], {
        message: "Please select a gender",
    }),
});

// Health Info Schema
export const healthInfoSchema = z.object({
    bloodType: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "unknown"], {
        message: "Please select a blood type",
    }),
    genotype: z.enum(["AA", "AS", "SS", "AC", "unknown"], {
        message: "Please select a genotype",
    }),
    allergies: z.array(z.string()).default([]),
    conditions: z.array(z.string()).default([]),
});

// Emergency Contact Schema
export const emergencyContactSchema = z.object({
    contactName: z.string().min(2, "Contact name must be at least 2 characters"),
    contactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
    relationship: z.enum(["parent", "spouse", "sibling", "friend", "other"], {
        message: "Please select a relationship",
    }),
});

// Location Schema
export const locationSchema = z.object({
    country: z.string().default("Nigeria"),
    state: z.string().min(1, "Please select a state or region"),
});

// Secure Account Schema
export const secureAccountSchema = z.object({
    pin: z.string().length(6, "PIN must be exactly 6 digits").regex(/^\d+$/, "PIN must contain only numbers"),
    enableBiometrics: z.boolean().default(false),
});

// Combined Complete Profile Schema
export const completeProfileSchema = personalDetailsSchema
    .merge(healthInfoSchema)
    .merge(emergencyContactSchema)
    .merge(locationSchema);

// Export types
export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
export type HealthInfoFormData = z.infer<typeof healthInfoSchema>;
export type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>;
export type LocationFormData = z.infer<typeof locationSchema>;
export type SecureAccountFormData = z.infer<typeof secureAccountSchema>;
export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

// Allergy and Condition Options
export const allergyOptions = [
    { value: "penicillin", label: "Penicillin" },
    { value: "sulfa", label: "Sulfa drugs" },
    { value: "latex", label: "Latex" },
    { value: "nuts", label: "Nuts" },
    { value: "shellfish", label: "Shellfish" },
    { value: "pollen", label: "Pollen" },
    { value: "dust", label: "Dust" },
] as const;

export const conditionOptions = [
    { value: "diabetes", label: "Diabetes" },
    { value: "hypertension", label: "Hypertension" },
    { value: "asthma", label: "Asthma" },
    { value: "sickle-cell", label: "Sickle Cell" },
    { value: "heart-condition", label: "Heart Condition" },
] as const;

// Nigerian States
export const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT (Abuja)",
] as const;