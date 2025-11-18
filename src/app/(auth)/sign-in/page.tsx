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
import Image from "next/image"

// Simple social login button component
const SocialButton = ({
  provider,
  icon,
}: {
  provider: string
  icon: string
}) => (
  <Button variant="outline" className="w-full">
    <Image
      src={icon}
      alt={provider}
      width={20}
      height={20}
      className="mr-2 text-xs lg:text-base"
      onError={(e) =>
        (e.currentTarget.src = `https://placehold.co/20x20/f0f4ff/6002ee?text=${provider[0]}`)
      }
    />
    {provider}
  </Button>
)

export default function LoginPage() {
  return (
    <Card className="w-full max-w-lg bg-transparent border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl lg:text-4xl font-bold">
          Welcome Back
        </CardTitle>
        <CardDescription>Sign in to access your Health Data</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email or Username</Label>
          <Input
            id="email"
            type="email"
            placeholder="ace.designs@gmail.com"
            className="border-primary bg-white"
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
          <Input
            id="password"
            type="password"
            className="border-primary bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>
        <Button size="full" className="w-full font-semibold">
          Sign In
        </Button>

        {/* ----- OR CONTINUE WITH ----- */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            or continue with
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton provider="Google" icon="/images/google.svg" />
          <SocialButton
            provider="Connect with Metamask"
            icon="/images/metamask.svg"
          />
          {/* <Button variant="outline" className="w-full text-xs lg:text-base">
            <Image
              src="/images/metamask.svg"
              alt="Metamask"
              width={20}
              height={20}
              className="lg:mr-2 mr-0"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/20x20/f0f4ff/6002ee?text=M")
              }
            />
            Connect with Metamask
          </Button> */}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
