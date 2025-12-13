"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { signup, setAuthToken, walletSignup, getWalletChallenge, linkWallet } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

// Zod Schema for Signup
const signupSchema = z.object({
  firstname: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(100, "First name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'.'-]+$/, "First name can only contain letters, spaces, apostrophes, dots, and hyphens"),
  lastname: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'.'-]+$/, "Last name can only contain letters, spaces, apostrophes, dots, and hyphens"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
    .regex(/^\S*$/, "Password must not contain spaces"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function ResidentSignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Creating Your Account...");
  const storeLogin = useAuthStore((state) => state.login);
  // Wallet authentication hook
  const {
    isLaceInstalled,
    isConnecting: isWalletConnecting,
    connectWallet,
    signMessage,
  } = useWalletAuth();


  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
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
  }

  // Traditional email/password signup
  const handleEmailSignup = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      setLoadingText("Creating Your Account...");

      // Call signup API
      const response = await signup({
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
      });

      // Store JWT token
      setAuthToken(response.data.token);

      // Store user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_email', response.data.user_email);
        localStorage.setItem('auth_method', 'email');
      }

      toast({
        title: "Account Created! 🎉",
        description: "Welcome to HealthChain. Let's complete your profile.",
      });

      // Navigate to complete profile page
      setTimeout(() => {
        router.push("/sign-up/resident/complete-profile");
      }, 1000);

    } catch (error: any) {
      console.error("Signup error:", error);

      let errorMessage = "Failed to create account. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid input. Please check your details.";
      } else if (error.response?.data?.email) {
        errorMessage = "This email is already registered.";
      }

      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };
  const [selectedRole, setSelectedRole] = useState<string>('resident');
  //Wallet Signup
  const handleWalletSignup = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setLoadingText("Connecting to Lace Wallet...")

      // Validate role is selected
      if (!selectedRole) {
        toast({
          title: "Role Required",
          description: "Please select your role before signing up.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Check if Lace is installed
      if (!isLaceInstalled()) {
        toast({
          title: "Lace Wallet Not Found",
          description: "Please install Lace wallet from lace.io to continue.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Connect wallet
      const connectionResult = await connectWallet()

      if (!connectionResult.success || !connectionResult.walletAddress) {
        toast({
          title: "Connection Failed",
          description: connectionResult.error || "Failed to connect wallet",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Validate stake address
      if (!connectionResult.stakeAddress) {
        toast({
          title: "Stake Address Required",
          description: "Your wallet must have a stake address to sign up.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      setLoadingText("Requesting Authentication Challenge...")

      // Get challenge
      const challenge = await getWalletChallenge(connectionResult.walletAddress)

      setLoadingText("Please Sign Message in Your Wallet...")

      // Sign challenge
      const signResult = await signMessage(challenge)

      if (!signResult.success || !signResult.signature || !signResult.publicKey) {
        toast({
          title: "Signature Failed",
          description: signResult.error || "Failed to sign message",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      setLoadingText("Creating Your Account...")

      // Call signup API
      const response = await walletSignup({
        walletAddress: connectionResult.walletAddress,
        stakeAddress: connectionResult.stakeAddress,
        publicKey: signResult.publicKey,
        signature: signResult.signature,
        message: challenge,
        role: selectedRole,
      })

      const { token, role } = response.data

      if (token && role) {
        storeLogin(token, role as any)

        if (typeof window !== 'undefined') {
          localStorage.setItem('wallet_address', connectionResult.walletAddress)
          localStorage.setItem('stake_address', connectionResult.stakeAddress)
          localStorage.setItem('auth_method', 'wallet')
        }

        toast({
          title: "Account Created! 🎉",
          description: "Welcome to HealthChain.",
        })

        await new Promise(resolve => setTimeout(resolve, 100))

        router.push(getDashboardPath(role))
      } else {
        setError("Signup failed. Please try again.")
        setIsLoading(false)
      }
    } catch (err: any) {
      console.error("Wallet signup error:", err)

      let errorMessage = "Failed to create account. Please try again."

      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.message || errorMessage

        if (err.response.status === 409) {
          errorMessage = "This wallet is already registered. Please login instead."
        }
      }

      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      })

      setError(errorMessage)
      setIsLoading(false)
    }
  }

  // Link wallet to existing account (for users who signed up with email)
  const handleLinkWallet = async () => {
    try {
      // Get current auth token
      const currentToken = localStorage.getItem('auth_token');

      if (!currentToken) {
        toast({
          title: "Authentication Required",
          description: "Please login first to link a wallet.",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      setLoadingText("Connecting to Lace Wallet...");

      // Connect wallet
      const connectionResult = await connectWallet();

      if (!connectionResult.success || !connectionResult.walletAddress) {
        toast({
          title: "Connection Failed",
          description: connectionResult.error || "Failed to connect wallet",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setLoadingText("Requesting Authentication Challenge...");

      // Get challenge
      const challenge = await getWalletChallenge(connectionResult.walletAddress);

      setLoadingText("Please Sign Message in Your Wallet...");

      // Sign challenge
      const signResult = await signMessage(challenge);

      if (!signResult.success) {
        throw new Error(signResult.error || "Failed to sign message");
      }

      setLoadingText("Linking Wallet to Your Account...");

      // Link wallet
      const response = await linkWallet(
        {
          walletAddress: connectionResult.walletAddress,
          stakeAddress: connectionResult.stakeAddress || null,
          publicKey: signResult.publicKey!,
          signature: signResult.signature!,
          message: challenge,
        },
        currentToken
      );

      if (response.data.success) {
        // Store wallet info
        if (typeof window !== 'undefined') {
          localStorage.setItem('wallet_address', connectionResult.walletAddress);
          if (connectionResult.stakeAddress) {
            localStorage.setItem('stake_address', connectionResult.stakeAddress);
          }
        }

        toast({
          title: "Wallet Linked! 🎉",
          description: "Your wallet has been successfully linked to your account.",
        });

        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Link wallet error:", err);

      let errorMessage = "Failed to link wallet. Please try again.";

      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data?.message || errorMessage;
      }

      toast({
        title: "Link Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };


  return (
    <>
      {isLoading && <HealthChainLoader loadingText={loadingText} />}
      <Card className="w-full max-w-xl bg-transparent border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl lg:text-4xl font-bold">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Join HealthChain to manage your medical records securely on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEmailSignup)} className="grid gap-6">

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Joshua"
                          className="border-primary bg-white"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Bryan"
                          className="border-primary bg-white"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="ace.designs@gmail.com"
                        className="border-primary bg-white"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pr-10 border-primary bg-white"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Must be 8+ characters with uppercase, lowercase, number, and special character
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                size="full"
                className="font-semibold mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-primary"
                  disabled
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>

                {/* Lace Wallet Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="bg-black text-white hover:bg-gray-800 border-none"
                  onClick={handleWalletSignup}
                  disabled={isLoading || isWalletConnecting}
                >
                  <Image
                    src="/images/lace1.png"
                    alt="Lace"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {isWalletConnecting ? "Connecting..." : "Lace Wallet"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-primary underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}