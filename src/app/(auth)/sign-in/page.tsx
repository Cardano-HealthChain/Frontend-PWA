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
// import { loginUser } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import axios from "axios";

// --- TEMPORARY MOCK LOGIN FUNCTION ---
/**
 * Simulates a successful login request and returns a user role based on the email.
 */
const mockLogin = (email: string) => {
    return new Promise<{ token: string, role: string }>((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            const lowerEmail = email.toLowerCase();
            
            if (lowerEmail.startsWith('resident')) {
                resolve({ token: 'mock-jwt-resident-123', role: 'resident' });
            } else if (lowerEmail.startsWith('clinic')) {
                resolve({ token: 'mock-jwt-clinic-456', role: 'clinic' });
            } else if (lowerEmail.startsWith('authority')) {
                resolve({ token: 'mock-jwt-authority-789', role: 'authority' });
            } else {
                // Simulate failed login for any other email
                reject({ 
                    response: { 
                        data: { message: "Mock Login Failed: Invalid credentials or role." }
                    }
                });
            }
        }, 1200); // 1.2 second delay to show the loader
    });
};

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
  const router = useRouter();
  // Get the login action from the store
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to determine which dashboard to route to based on role
  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'resident':
        return '/dashboard/resident';
      case 'clinic':
        return '/dashboard/clinic';
      case 'authority':
        return '/dashboard/authority';
      default:
        return '/dashboard'; // Default generic dashboard
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);

    try {
      // Call the MOCK LOGIN function (or replace with real API call)
      const response = await mockLogin(email);
      // mockLogin returns { token, role }
      const { token, role } = response;

      if (token && role) {
        // Save the token and role to the Zustand store
        login(token, role as any);
        // Redirect to the correct, protected dashboard
        router.push(getDashboardPath(role));
      } else {
        // Handle unexpected response shape
        setError("Login failed. Invalid response structure from server.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (axios.isAxiosError(err) && err.response) {
        // Handle server errors (e.g., 401 Unauthorized)
        setError(err.response.data?.message || "Invalid email or password.");
      } else {
        // Handle mock failures or network/unknown errors
        setError("Invalid email/role. Try: resident@hc.com, clinic@hc.com, or authority@hc.com");
      }
    } finally {
      setIsLoading(false);
    }
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
        <form onSubmit={handleLogin}>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email or Username</Label>
            <Input
              id="email"
                type="email"
                value={email}
              placeholder="ace.designs@gmail.com"
              className="border-primary bg-white"
                onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
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
              value={password}
                className="border-primary bg-white"
                onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
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
          <Button size="full" className="w-full font-semibold" disabled={isLoading} type="submit" onClick={handleLogin}>
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
