"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CTA } from "../components/CTA"; // Re-using the CTA component

const Section = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <section className={cn("container py-16 md:py-24", className)}>
        {children}
    </section>
);

const TextContent = ({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-4">
        <p className="font-semibold text-primary">{subtitle}</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">{title}</h2>
        <div className="space-y-4 text-muted-foreground text-md">{children}</div>
    </div>
);

export default function AboutPage() {
    return (
      <>
        {/* About Hero */}
        <section
          className="py-32 md:py-48"
          style={{
            backgroundColor: "#EFF0FB",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto max-w-xl">
                <div className="flex items-center w-full justify-between mb-4 rounded-full px-3 py-2 shadow-md border border-gray-50 bg-white">
                  <p className="text-xs text-muted-foreground">
                    Have a Question?
                  </p>
                  <Link href="/" className="">
                  <Button size="sm">Ask AI</Button>
                  </Link>
                </div>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
                Empowering{" "}
                <span className="text-primary-foreground/80">Communities</span>{" "}
                Through Secure, Decentralized Health Data
              </h1>
              <p className="mt-6 text-lg text-primary/90">
                HealthChain is your partner in building a future where every
                individual has sovereign control over their health information.
              </p>
              <Link href="/sign-up" className="">
              <Button size="full" className="mt-8 font-semibold">
                Get Started
              </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why We Built It */}
        <Section className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              src="/images/about-img.svg"
              alt="Doctor using a futuristic interface"
              width={500}
              height={500}
              className="rounded-lg"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/500x500/f0f4ff/6002ee?text=Doctor")
              }
            />
          </div>
          <div className="flex flex-col justify-center gap-12">
            <TextContent
              subtitle="Our Purpose"
              title="Why We Built HealthChain"
            >
              <p>
                In many communities, a lack of consistent, reliable medical
                records leads to poor health outcomes and ineffective emergency
                response. Paper records are unreliable, and centralized data
                systems are often insecure or inaccessible.
              </p>
              <p>
                We built HealthChain to solve this. We provide a secure,
                low-cost digital infrastructure that empowers individuals and
                provides clinics with the reliable data they need.
              </p>
            </TextContent>
            <TextContent
              subtitle="Our Approach"
              title="A New Approach to Community Health"
            >
              <p>
                We leverage Cardano and Atala PRISM to anchor user-owned
                Decentralized Identifiers (DIDs) and manage smart-contract
                permissioned access to encrypted health data.
              </p>
              <p>
                This isn't just about technology; it's about building community
                resilience and shifting the ownership of data back to the
                individual.
              </p>
            </TextContent>
          </div>
        </Section>

        {/* Our Mission & Why Cardano */}
        <div className="px-10 lg:px-36">
          <Section className="grid grid-cols-1 gap-4 md:grid-cols-2 px-10 lg:px-36">
            <Card className="border-0 bg-feature-orange px-8 py-4">
              <CardHeader>
                <TextContent title="Our Mission">
                  <p>
                    To empower individuals in developing regions with
                    self-sovereign control over their health data and provide
                    local health authorities with reliable, real-time
                    intelligence for effective emergency response and
                    preventative care.
                  </p>
                </TextContent>
              </CardHeader>
            </Card>
            <Card className="border-0 bg-secondary px-8 py-4">
              <CardHeader>
                <TextContent
                  title="Why We Chose Cardano & Atala PRISM"
                >
                  <p>
                    Cardano provides a robust, established foundation for
                    Self-Sovereign Identity (SSI). Its low and predictable
                    transaction fees make it economically viable for residents
                    and clinics in developing regions, where high gas fees would
                    be a non-starter.
                  </p>
                </TextContent>
              </CardHeader>
            </Card>
            <Card className="flex items-center justify-center border-0 bg-secondary p-8">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/logo.png"
                  alt="HealthChain Logo"
                  width={300}
                  height={300}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/60x60/6002ee/ffffff?text=H")
                  }
                />
              </div>
            </Card>
            <Card className="border-0 bg-[#A892FF] p-8">
              <Image
                src="/images/cardano-img.png" // From /public/images
                alt="Cardano and Atala PRISM coins"
                width={600}
                height={400}
                className="mx-auto"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/400x200/f0f4ff/6002ee?text=Cardano")
                }
              />
            </Card>
          </Section>
        </div>
        {/* Re-use the CTA component */}
        <CTA />
      </>
    )
}
