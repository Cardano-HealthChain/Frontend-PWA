"use client";

import { Button } from "@/components/ui/button"; 
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ClinicUnderReviewPage() {
    const router = useRouter();

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl h-full md:h-[600px] bg-background rounded-xl overflow-hidden">
        {/* Left Column - Information */}
        <Card className="flex flex-col justify-center p-12 bg-transparent border-0">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Your Clinic is Under Review
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your clinic details and documents have been submitted to the Health
            Authority for verification.
          </p>
          <p className="mt-2 text-primary font-semibold">
            This usually takes 24–48 hours.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-4 w-4" />
              <span>Authority reviews documents</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-4 w-4" />
              <span>DID is checked</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="h-4 w-4" />
              <span>Clinic added to registry</span>
            </div>
          </div>

          <p className="mt-10 text-muted-foreground">
            We'll notify you once your clinic is approved.
          </p>

          <Button
            size="full"
            variant="outline"
            className="mt-6 w-full max-w-xs border-primary"
            onClick={() => router.push("/dashboard/clinic")}
          >
            Go to Dashboard (Read-only mode)
          </Button>
        </Card>

        {/* Right Column - Image */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/images/clinic-1.png"
            alt="Healthcare Provider graphic"
            width={500}
            height={600}
            className="object-cover rounded-lg shadow-xl"
            onError={(e) =>
              (e.currentTarget.src =
                "https://placehold.co/500x600/6002ee/ffffff?text=Verification+Process")
            }
          />
        </div>
      </div>
    )
}