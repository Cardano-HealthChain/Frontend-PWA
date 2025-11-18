"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function ClinicIntroPage() {
  const router = useRouter()

  return (
    // Note: I'm wrapping the entire page content in a single container to handle the two-column layout from the design
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl h-full md:h-[600px] bg-background rounded-xl overflow-hidden">
      {/* Left Column - Text and Button */}
      <div className="flex flex-col justify-center p-8 md:p-12">
        <h1 className="text-xl lg:text-3xl font-extrabold tracking-tight">
          Welcome, Healthcare Provider
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Verify patients instantly and update medical records securely.
        </p>

        <div className="mt-6 space-y-3 text-sm text-primary">
          <p>• Instant patient verification</p>
          <p>• Blockchain credential issuance</p>
          <p>• Add diagnoses, prescriptions & vaccination records</p>
          <p className="mt-2">
            Encrypted data: your clinic never sees records without permission.
          </p>
        </div>

        <Button
          size="full"
          className="mt-12 font-semibold max-w-xs"
          // Route to the new stepper page
          onClick={() => router.push("/sign-up/clinic/onboard")}
        >
          Begin Registration <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:flex relative">
        <Image
          src="/images/clinic-1.png"
          alt="Healthcare Provider graphic"
          fill
          style={{ objectFit: "cover" }}
          onError={(e) =>
            (e.currentTarget.src =
              "https://placehold.co/400x600/6002ee/ffffff?text=Healthcare+Provider")
          }
        />
      </div>
    </div>
  )
}
