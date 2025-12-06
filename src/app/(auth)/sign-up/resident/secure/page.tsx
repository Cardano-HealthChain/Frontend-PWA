"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { HealthChainLoader } from "@/components/ui/HealthChainLoader"

export default function SecureAccountPage() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const handleContinue = () => {
    setIsLoading(true); // Show the loader
    // Simulate a delay for loading (e.g., waiting for an API response)
    setTimeout(() => {
      router.push("/sign-up/resident/complete-profile"); // Navigate after loading
    }, 2000); // 2 seconds delay
  }
  return (
    <>
      {isLoading && <HealthChainLoader loadingText="Securing Your Account..." />}
      <Card className="w-full max-w-3xl border-none bg-transparent my-12">
        <CardHeader className="text-center mb-8">
          <CardTitle className="text-2xl lg:text-4xl font-bold">
            Secure Your Account
          </CardTitle>
          <CardDescription>
            Create a 6-digit PIN to secure your Account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <InputOTP maxLength={6}>
            <InputOTPGroup className="gap-4">
              <InputOTPSlot
                index={0}
                className="w-14 h-18 border-primary bg-white rounded-lg"
              />
              <InputOTPSlot
                index={1}
                className="w-14 h-18 border-primary bg-white rounded-lg"
              />
              <InputOTPSlot
                index={2}
                className="w-14 h-18 border-primary bg-white rounded-lg"
              />
              <InputOTPSlot
                index={3}
                className="w-14 h-18 border-primary bg-white rounded-lg"
              />
              <InputOTPSlot
                index={4}
                className="w-14 h-18 border-primary bg-white rounded-lg"
              />
              <InputOTPSlot
                index={5}
                className="w-14 h-18 border-primary bg-white rounded-lg"
              />
            </InputOTPGroup>
          </InputOTP>

          <div className="flex items-center justify-start gap-2">
            <Checkbox id="biometrics" />
            <Label htmlFor="biometrics" className="font-normal">
              Enable Biometrics (Mobile Version Only)
            </Label>
          </div>

          <Button size="full" className="w-full font-semibold" onClick={handleContinue}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </>
  )
}