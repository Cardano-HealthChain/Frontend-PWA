"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PersonalDetailsForm, PersonalDetailsFormData } from "./_components/PersonalDetailsForm";
import { HealthInfoForm, HealthInfoFormData } from "./_components/HealthInfoForm";
import { EmergencyContactForm, EmergencyContactFormData } from "./_components/EmergencyContactForm";
import { LocationForm, LocationFormData } from "./_components/LocationForm";
import { useRouter } from "next/navigation";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import {
  updatePersonalDetails,
  updateHealthInfo,
  updateEmergencyContact,
  updateLocation
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Basic Health Information" },
  { id: 3, name: "Emergency Contact" },
  { id: 4, name: "Location / Region" },
];

type FormData = {
  personalDetails?: PersonalDetailsFormData;
  healthInfo?: HealthInfoFormData;
  emergencyContact?: EmergencyContactFormData;
  location?: LocationFormData;
};

export default function CompleteProfilePage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();
  const { toast } = useToast();

  // STEP 1: Handle Personal Details submission
  const handlePersonalDetailsSubmit = async (data: PersonalDetailsFormData) => {
    try {
      setIsLoading(true);
      console.log("Step 1 data:", data);

      // Call API to update personal details
      await updatePersonalDetails({
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dateOfBirth,
        gender: data.gender === "male" ? "Male" : data.gender === "female" ? "Female" : "Prefer not to say",
      });

      // Save data locally for reference
      setFormData((prev) => ({ ...prev, personalDetails: data }));

      toast({
        title: "Step 1 Complete",
        description: "Personal details saved successfully.",
      });

      // Move to next step
      setCurrentStep(2);
    } catch (error: any) {
      console.error("Step 1 error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save personal details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Handle Health Info submission
  const handleHealthInfoSubmit = async (data: HealthInfoFormData) => {
    try {
      setIsLoading(true);
      console.log("Step 2 data:", data);

      // Call API to update health information
      await updateHealthInfo({
        blood_type: data.bloodType,
        genotype: data.genotype,
        known_allergies: data.allergies.join(", ") || "",
        pre_existing_conditions: data.conditions.join(", ") || "",
      });

      // Save data locally
      setFormData((prev) => ({ ...prev, healthInfo: data }));

      toast({
        title: "Step 2 Complete",
        description: "Health information saved successfully.",
      });

      // Move to next step
      setCurrentStep(3);
    } catch (error: any) {
      console.error("Step 2 error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save health information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3: Handle Emergency Contact submission
  const handleEmergencyContactSubmit = async (data: EmergencyContactFormData) => {
    try {
      setIsLoading(true);
      console.log("Step 3 data:", data);

      // Call API to update emergency contact
      await updateEmergencyContact({
        name: data.contactName,
        phone_number: data.contactPhone,
        relationship: data.relationship.charAt(0).toUpperCase() + data.relationship.slice(1),
      });

      // Save data locally
      setFormData((prev) => ({ ...prev, emergencyContact: data }));

      toast({
        title: "Step 3 Complete",
        description: "Emergency contact saved successfully.",
      });

      // Move to next step
      setCurrentStep(4);
    } catch (error: any) {
      console.error("Step 3 error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save emergency contact.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 4: Handle Location submission (FINAL STEP)
  const handleLocationSubmit = async (data: LocationFormData) => {
    try {
      setIsLoading(true);
      console.log("Step 4 data:", data);

      // Call API to update location (FINAL step)
      await updateLocation({
        country: data.country,
        state: data.state.charAt(0).toUpperCase() + data.state.slice(1), // Capitalize state
      });

      // Save data locally
      setFormData((prev) => ({ ...prev, location: data }));

      toast({
        title: "Profile Complete! 🎉",
        description: "Your profile has been completed successfully.",
      });

      // Navigate to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard/resident");
      }, 1500);
    } catch (error: any) {
      console.error("Step 4 error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save location.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  return (
    <>
      {isLoading && <HealthChainLoader loadingText={`Saving Step ${currentStep}...`} />}
      <Card className="w-full max-w-6xl border-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-center text-xl lg:text-4xl font-bold">
            Complete your Profile
          </CardTitle>
          <CardDescription>
            <nav className="mt-6 flex items-center justify-center gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center",
                    step.id === currentStep
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="text-sm">{step.name}</span>
                  {step.id === currentStep && (
                    <div className="mt-1 h-0.5 w-20 rounded-full bg-primary" />
                  )}
                </div>
              ))}
            </nav>
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6 lg:px-28">
          {/* STEP 1: Personal Details Form */}
          {currentStep === 1 && (
            <PersonalDetailsForm
              onSubmit={handlePersonalDetailsSubmit}
              defaultValues={formData.personalDetails}
            />
          )}

          {/* STEP 2: Health Info Form */}
          {currentStep === 2 && (
            <HealthInfoForm
              onSubmit={handleHealthInfoSubmit}
              defaultValues={formData.healthInfo}
            />
          )}

          {/* STEP 3: Emergency Contact Form */}
          {currentStep === 3 && (
            <EmergencyContactForm
              onSubmit={handleEmergencyContactSubmit}
              defaultValues={formData.emergencyContact}
            />
          )}

          {/* STEP 4: Location Form */}
          {currentStep === 4 && (
            <LocationForm
              onSubmit={handleLocationSubmit}
              defaultValues={formData.location}
            />
          )}

          {/* Navigation Buttons - OUTSIDE the forms */}
          <div className="mt-10 flex justify-between">
            <Button
              type="button"
              size="full"
              variant="outline"
              className="border-primary"
              onClick={handleBack}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              type="submit"
              size="full"
              className="font-semibold"
              disabled={isLoading}
              form={`step-${currentStep}-form`}
            >
              {currentStep === 4 ? "Finish" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}