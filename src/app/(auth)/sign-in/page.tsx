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
import { login as apiLogin, walletLogin } from "@/lib/api";
import { z } from 'zod';
import { useAuthStore } from "@/store/authStore";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { useToast } from "@/hooks/use-toast";

// Zod Schema for Login
const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const storeLogin = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState("Authenticating Credentials...");

  // Wallet authentication hook
  const {
    isLaceInstalled,
    isConnecting: isWalletConnecting,
    connectWallet,
    signMessage,
  } = useWalletAuth();

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
      case 'doctor':
        return '/dashboard/doctor';
      case 'authority':
        return '/dashboard/authority';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/dashboard';
    }
  };

  // Traditional email/password login
  const handleEmailLogin = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    setLoadingText("Authenticating Credentials...");

    try {
      const response = await apiLogin({
        email: data.email,
        password: data.password,
      });

      const { token, role } = response.data;

      if (token && role) {
        storeLogin(token, role as any);

        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', role);
          localStorage.setItem('auth_method', 'email');
        }

        router.push(getDashboardPath(role));
      } else {
        setError("Login failed. Please try again later.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Invalid email or password.");
      } else if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Wallet-based login
  const handleWalletLogin = async () => {
    try {
      setIsLoading(true);
      setLoadingText("Connecting to Lace Wallet...");

      // Check if Lace is installed
      if (!isLaceInstalled()) {
        toast({
          title: "Lace Wallet Not Found",
          description: "Please install Lace wallet from lace.io to continue.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Connect wallet and get address
      const connectionResult = await connectWallet();

      if (!connectionResult.success) {
        toast({
          title: "Connection Failed",
          description: connectionResult.error || "Failed to connect wallet",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setLoadingText("Signing Authentication Message...");

      // Generate a unique message to sign
      const authMessage = `HealthChain Authentication\nTimestamp: ${Date.now()}\nAction: Login\nAddress: ${connectionResult.walletAddress}`;

      // Sign the message with wallet
      const signResult = await signMessage(authMessage);

      if (!signResult.success) {
        toast({
          title: "Signature Failed",
          description: signResult.error || "Failed to sign message",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setLoadingText("Verifying Blockchain Identity...");

      // Call wallet login API endpoint
      const response = await walletLogin({
        walletAddress: connectionResult.walletAddress!,
        signature: signResult.signature!,
        message: authMessage,
        publicKey: signResult.publicKey!,
        stakeAddress: connectionResult.stakeAddress || undefined,
      });

      const { token, role } = response.data;

      if (token && role) {
        storeLogin(token, role as any);

        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', role);
          localStorage.setItem('wallet_address', connectionResult.walletAddress!);
          localStorage.setItem('auth_method', 'wallet');
        }

        toast({
          title: "Login Successful! 🎉",
          description: "Welcome back to HealthChain.",
        });

        router.push(getDashboardPath(role));
      } else {
        setError("Wallet login failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Wallet login error:", err);

      let errorMessage = "Wallet not registered. Please sign up first.";

      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.message || errorMessage;
      }

      toast({
        title: "Wallet Login Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };

  const onSubmit = (data: LoginFormData) => {
    handleEmailLogin(data);
  };

  return (
    <>
      {isLoading && <HealthChainLoader loadingText={loadingText} />}
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
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-md"
                disabled
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2 text-xs lg:text-base"
                />
                Google
              </Button>

              {/* Lace Wallet Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-md bg-black text-white hover:bg-gray-800 border-none"
                onClick={handleWalletLogin}
                disabled={isLoading || isWalletConnecting}
              >
                <Image
                  src="/images/lace1.png"
                  alt="Lace Wallet"
                  width={20}
                  height={20}
                  className="mr-2 text-xs lg:text-base"
                />
                {isWalletConnecting ? "Connecting..." : "Lace Wallet"}
              </Button>
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