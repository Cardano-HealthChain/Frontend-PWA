"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { HealthChainLoader } from "@/components/ui/HealthChainLoader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { savePin } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Zod Schema for PIN
const secureAccountSchema = z.object({
  pin: z.string().length(6, "PIN must be exactly 6 digits").regex(/^\d+$/, "PIN must contain only numbers"),
  enableBiometrics: z.boolean().default(false),
});

type SecureAccountFormData = z.infer<typeof secureAccountSchema>;

export default function SecureAccountPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(secureAccountSchema),
    defaultValues: {
      pin: "",
      enableBiometrics: false,
    },
  });

  const handleContinue = async (data: SecureAccountFormData) => {
    try {
      setIsLoading(true);

      // Get email from localStorage or session (assuming it was stored during signup)
      const email = localStorage.getItem("signup_email") || "";

      // Call API to save PIN
      await savePin({
        email,
        pin: data.pin,
        enableBiometrics: data.enableBiometrics,
      });

      toast({
        title: "Success",
        description: "Your account has been secured successfully.",
      });

      // Navigate to complete profile page
      setTimeout(() => {
        router.push("/sign-up/resident/complete-profile");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to secure account. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleContinue)} className="flex flex-col items-center gap-8 w-full">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableBiometrics"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-start gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Enable Biometrics (Mobile Version Only)
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Button type="submit" size="full" className="w-full font-semibold" disabled={isLoading}>
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}