"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CircleCheck, ArrowRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

const roles = [
  {
    name: "Resident",
    id: "resident",
    icon: "/images/id.png",
    description: "Take control of your health data and earn rewards.",
    features: [
      "Create your digital health ID",
      "Store encrypted health records",
      "Receive geo-targeted alerts",
      "Access AI health assistant",
    ],
  },
  {
    name: "Clinic",
    id: "clinic",
    icon: "/images/clinic.png",
    description: "Verify patients instantly and access authorized records.",
    features: [
      "Instant patient verification",
      "Secure record access",
      "Blockchain audit trail",
      "Streamlined workflows",
    ],
  },
  {
    name: "Health Authority",
    id: "authority",
    icon: "/images/alert.png",
    description: "Monitor community health and send targeted alerts.",
    features: [
      "Community health analysis",
      "Geo-targeted alert system",
      "Outbreak monitoring",
      "Anonymized data insights",
    ],
  },
]

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState("resident")
  const router = useRouter()

  const handleContinue = () => {
    // Navigate to the correct registration page based on role
    router.push(`/sign-up/${selectedRole}`)
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full bg-transparent max-w-4xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Choose your Role</CardTitle>
          <CardDescription>
            Select how you will be using HealthChain to get personalized
            onboarding.
          </CardDescription>
        </CardHeader>
        <CardContent className="capitalize">
          <RadioGroup
            defaultValue="resident"
            onValueChange={setSelectedRole}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {roles.map((role) => (
              <Label
                key={role.id}
                htmlFor={role.id}
                className={cn(
                  "relative cursor-pointer rounded-lg border-2 bg-background p-6 shadow-md transition-all capitalize hover:border-primary",
                  selectedRole === role.id
                    ? "border-primary ring-2 ring-primary"
                    : "border-border"
                )}
              >
                <RadioGroupItem
                  value={role.id}
                  id={role.id}
                  className="absolute right-4 top-4"
                />
                <Image
                  src={role.icon}
                  alt={role.name}
                  width={40}
                  height={40}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/40x40/f0f4ff/6002ee?text=H")
                  }
                />
                <h3 className="mt-4 text-xl font-semibold">{`I'm a ${role.name}`}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {role.description}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {role.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CircleCheck className="h-5 w-5 flex-shrink-0 text-white fill-primary" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      <Button
        size="full"
        className="mt-8 w-full max-w-md font-semibold"
        onClick={handleContinue}
      >
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <p className="mt-8 text-sm text-muted-foreground">
        Already have an Account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-primary underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
