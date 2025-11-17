'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Create Your Digital Health ID (DID)",
    description: "When you sign up, you receive a blockchain-powered digital ID that belongs entirely to you.",
    points: [
      "One-click setup.",
      "Secured on the blockchain.",
      "Only you control access.",
    ],
    BgColor: "bg-card1-lightblue",
    image: "/images/id.png",
    color: "bg-blue",
  },
  {
    title: "Get Verified Updates From Clinics",
    description:
      "At a clinic, your DID is scanned to confirm your identity. You then choose what the clinic can see or update by granting a Verifiable Credential.",
    points: [
      "Grant temporary write access.",
      "Clinics update your record.",
      "View your complete history.",
    ],
    BgColor: "bg-card2-lightorange",
    image: "/images/clinic.png",
    color: "bg-orange",
  },
  {
    title: "Stay Informed With Community Health Alerts",
    description:
      "At a clinic, your DID is scanned to confirm your identity. You then choose what the clinic can see or update by granting a Verifiable Credential.",
    points: [
      "Critical outbreak warnings.",
      "Vaccination drive info.",
      "Public safety notices.",
    ],
    BgColor: "bg-card3-lightgreen",
    image: "/images/alert.png",
    color: "bg-green",
  },
]

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="px-10 lg:px-28 py-20 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
          How HealthChain Works
        </h2>
        <p className="mt-2 text-lg text-muted-foreground whitespace-nowrap">
          A simple, secure way to manage health records for residents, clinics,
          and communities.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <Card key={i} className={cn("border-0 flex flex-col", step.BgColor)}>
            <CardHeader>
              <CardTitle className={cn("flex items-center justify-center px-3 py-2 rounded-md w-20 h-20", step.color)}>
                <Image src={step.image} alt={step.title} width={40} height={40} />
              </CardTitle>
              <CardTitle className="text-xl lg:text-3xl pt-2">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.description}</p>
              <ul className="mt-3 flex flex-col gap-3">
                {step.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CircleCheck className="h-5 w-5 flex-shrink-0 text-white fill-primary" />
                    <span className="text-sm font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};