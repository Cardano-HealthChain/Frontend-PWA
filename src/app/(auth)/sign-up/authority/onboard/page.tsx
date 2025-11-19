"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Import the five form components from the correct relative path
import { AuthorityInformationForm } from "./_components/AuthorityInformationForm";
import { DocumentUploadForm } from "./_components/DocumentUploadForm";
import { AdminAccountForm } from "./_components/AdminAccountForm";
import { WalletConnectForm } from "./_components/WalletConnectForm";
import { DIDGenerationForm } from "./_components/DIDGenerationForm";

const steps = [
  { id: 1, name: "Authority Information" },
  { id: 2, name: "Upload Documents" },
  { id: 3, name: "Create Admin Account" },
  { id: 4, name: "Create or Connect Wallet" },
  { id: 5, name: "Generate Clinic DID" },
];

export default function ClinicStepperPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const router = useRouter();

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <AuthorityInformationForm />; 
      case 2:
        return <DocumentUploadForm />;
      case 3:
        return <AdminAccountForm />;
      case 4:
        return <WalletConnectForm />;
      case 5:
        return <DIDGenerationForm />;
      default:
        return <AuthorityInformationForm />;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step -> Navigate to the Under Review screen
      router.push("/sign-up/authority/under-review");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go back to the new Intro screen
      router.push("/signup/aithority");
    }
  };

  return (
    <Card className="w-full max-w-4xl bg-transparent border-none">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">
          Welcome, Health Authority
        </CardTitle>
        <CardDescription>
          <nav className="mt-6 flex items-center justify-center gap-4 flex-wrap">
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
                <span className="text-sm whitespace-nowrap">
                  {step.name}
                </span>
                {step.id === currentStep && (
                  <div className="mt-2 h-0.5 w-20 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </nav>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-6 lg:px-28">
        {renderForm()}

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between">
          <Button
            size="full"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="border-primary"
          >
            Back
          </Button>
          <Button size="full" className="font-semibold" onClick={handleNext}>
            {currentStep === 5 ? "Complete Registration" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}