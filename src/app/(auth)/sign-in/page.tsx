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
import { useState } from "react"
import { useRouter } from "next/navigation"
import React from "react"
import { login as apiLogin } from "@/lib/api";
import { z } from 'zod';
import { useAuthStore } from "@/store/authStore";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import axios from "axios";
// import { loginSchema, LoginFormData } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Zod Schema for Login
const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Password is required'),
});

const loginResponseSchema = z.object({
  token: z.string(),
  role: z.enum(['resident', 'clinic', 'authority', 'admin']), 
  user_id: z.string().optional(),
  email: z.string().email().optional(),
});

type LoginResponse = z.infer<typeof loginResponseSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

// Simple social login button component
const SocialButton = ({
  provider,
  icon,
  className,
}: {
  provider: string
  icon: string
  className: string | undefined
}) => (
  <Button variant="outline" className={`w-full rounded-md ${className}`}>
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
  const router = useRouter();
  // Get the login action from the store
  const storeLogin = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to determine which dashboard to route to based on role
  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'resident':
        return '/dashboard/resident';
      case 'clinic':
        return '/dashboard/clinic';
      case 'authority':
        return '/dashboard/authority';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard'; // Default generic dashboard
    }
  };

  const handleLogin = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      // Call login API
      const response = await apiLogin({
        email: data.email,
        password: data.password,
      });

      const { token, role } = response.data;

      if (token && role) {
        // Save the token and role to the Zustand store
        storeLogin(token, role as any);

        // Optionally store token in localStorage via your api utility
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', role);
        }

        // Redirect to the correct, protected dashboard
        router.push(getDashboardPath(role));
      } else {
        // Handle unexpected response shape
        setError("Login failed. Please try again later.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (axios.isAxiosError(err) && err.response) {
        // Handle server errors (e.g., 401 Unauthorized)
        setError(err.response.data?.message || "Invalid email or password.");
      } else if (err instanceof Error) {
        // Handle other errors
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: LoginFormData) => {
    handleLogin(data);
  };

  return (
    <>
      {isLoading && <HealthChainLoader loadingText="Authenticating Credentials..." />}
      <Card className="w-full max-w-lg bg-transparent border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl lg:text-4xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription>Sign in to access your Health Data</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ace.designs@gmail.com"
                className="border-primary bg-white"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
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
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>
            {/* Error Message Display */}
            {error && (
              <p className="text-sm text-destructive font-medium text-center">{error}</p>
            )}
            <Button
              size="full"
              className="w-full font-semibold"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? "Signing In..." : "Sign In"}
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
              <SocialButton provider="Google" icon="/images/google.svg" className="" />
              <SocialButton
                provider="Lace Wallet"
                icon="/images/lace1.png"
                className="bg-black text-white"
              />
            </div>
          </CardContent>
        </form>
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
    </>
  )
}