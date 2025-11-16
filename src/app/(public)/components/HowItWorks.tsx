'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

const steps = [
  {
    title: "Create Your Digital Health ID (DID)",
    description: "A single, secure, and self-owned ID for your health.",
    points: [
      "One-click setup.",
      "Secured on the blockchain.",
      "Only you control access.",
    ],
  },
  {
    title: "Get Verified Updates From Clinics",
    description: "Your health record, updated by verified professionals.",
    points: [
      "Grant temporary write access.",
      "Clinics update your record.",
      "View your complete history.",
    ],
  },
  {
    title: "Stay Informed With Community Health Alerts",
    description: "Receive real-time, verified alerts from your local health authority.",
    points: [
      "Critical outbreak warnings.",
      "Vaccination drive info.",
      "Public safety notices.",
    ],
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="container py-20 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          How HealthChain Works
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A simple, secure way to manage health records for residents, clinics,
          and communities.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <Card key={i} className="flex flex-col bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-primary">0{i + 1}</CardTitle>
              <CardTitle className="text-xl pt-2">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.description}</p>
              <ul className="mt-6 flex flex-col gap-3">
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