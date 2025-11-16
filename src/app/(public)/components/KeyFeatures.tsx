
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Secure DID Wallet",
    description: "Your digital identity, secured on the blockchain.",
    color: "bg-feature-blue",
  },
  {
    title: "Encrypted Health Records",
    description: "All your data is encrypted with your unique key.",
    color: "bg-feature-orange",
  },
  {
    title: "Revocable Permissions",
    description: "Grant and revoke access to your records at any time.",
    color: "bg-feature-orange",
  },
  {
    title: "Clinic Write Access",
    description: "Allow verified clinics to securely update your file.",
    color: "bg-feature-blue",
  },
  {
    title: "Emergency Health Alerts",
    description: "Receive critical public health alerts from your authority.",
    color: "bg-feature-cyan",
  },
  {
    title: "Authority Dashboard",
    description: "View anonymized community health data and insights.",
    color: "bg-feature-yellow",
  },
]

export const KeyFeatures = () => {
  return (
    <section id="features" className="container py-20 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Our Key Features
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A simple, secure way to manage health records for residents, clinics,
          and communities.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          // We use cn() to merge the default card style with our
          // custom theme color from globals.css
          <Card key={i} className={cn("border-0", feature.color)}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription className="pt-2 text-foreground/80">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
