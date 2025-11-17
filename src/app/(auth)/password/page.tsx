"use client"

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

export default function SecureAccountPage() {
  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">
          Secure Your Account
        </CardTitle>
        <CardDescription>
          Create a 6-digit PIN to secure your Account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <div className="flex items-center gap-2">
          <Checkbox id="biometrics" />
          <Label htmlFor="biometrics" className="font-normal">
            Enable Biometrics (Mobile Version Only)
          </Label>
        </div>

        <Button className="w-full font-semibold">Continue</Button>
      </CardContent>
    </Card>
  )
}
