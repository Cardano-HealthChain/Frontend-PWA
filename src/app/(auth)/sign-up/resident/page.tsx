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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Info, RotateCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ResidentSignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const handleContinue = () => {
    router.push("/sign-up/secure") // Navigate to the PIN screen
  }

  return (
    <Card className="w-full bg-transparent border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl lg:text-4xl font-bold">
          Register as a Resident
        </CardTitle>
        <CardDescription className="">
          Select how you will be using HealthChain to get personalized
          onboarding.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 max-w-xl">
        <div className="grid gap-2">
          <Label htmlFor="did" className="flex items-center gap-1">
            Your DID <Info className="h-3 w-3 text-muted-foreground" />
          </Label>
          <div className="relative">
            <Input
              id="did"
              type="text"
              defaultValue="345EUQX"
              readOnly
              className="pr-10 border-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              placeholder="Joshua"
              className="border-primary"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              placeholder="Bryan"
              className="border-primary"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email or Username</Label>
          <Input
            id="email"
            placeholder="ace.designs@gmail.com"
            className="border-primary"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="text-xs text-primary underline underline-offset-2"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="pr-10 border-primary"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-primary">
            Must be at least 8 characters
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="create-wallet" defaultChecked />
            <Label htmlFor="create-wallet" className="font-normal">
              Create New Wallet
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="connect-wallet" />
            <Label htmlFor="connect-wallet" className="font-normal">
              Connect Existing Wallet
            </Label>
          </div>
        </div>

        <Button size="full" className="font-semibold" onClick={handleContinue}>
          Continue
        </Button>

        {/* ----- OR CONTINUE WITH ----- */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            or continue with
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an Account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
