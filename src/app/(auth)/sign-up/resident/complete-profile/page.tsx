"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Import the form components we will create next
import { PersonalDetailsForm } from "./_components/PersonalDetailsForm"
import { HealthInfoForm } from "./_components/HealthInfoForm"
import { EmergencyContactForm } from "./_components/EmergencyContactForm"
import { LocationForm } from "./_components/LocationForm"
import { useRouter } from "next/navigation"

const steps = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Basic Health Information" },
  { id: 3, name: "Emergency Contact" },
  { id: 4, name: "Location / Region" },
]

export default function CompleteProfilePage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      // This is the final step, navigate to the app dashboard
      router.push("/dashboard") // Or wherever the app starts
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      // Go back to the previous page in the signup flow
      router.back()
    }
  }

  return (
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
        {/* Render the correct form based on the current step */}
        {currentStep === 1 && <PersonalDetailsForm />}
        {currentStep === 2 && <HealthInfoForm />}
        {currentStep === 3 && <EmergencyContactForm />}
        {currentStep === 4 && <LocationForm />}

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between">
          <Button size="full" variant="outline" className="border-primary" onClick={handleBack}>
            Back
          </Button>
          <Button size="full" className="font-semibold" onClick={handleNext}>
            {currentStep === 4 ? "Finish" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
