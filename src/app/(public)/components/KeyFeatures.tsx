
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const features = [
  {
    title: "Our Key Features",
    description:
      "A simple, secure way to manage health records for residents, clinics,and communities",
    color: "bg-none",
    text: "text-black"
  },
  {
    title: "Secure DID Wallet",
    description:
      "A self-sovereign digital identity anchored on Cardano that gives you complete ownership of your health data, allowing you to securely access and manage your information from any device without relying on centralized systems.",
    color: "bg-feature-blue",
    BdColor: "border-blue-200",
    text: "text-blue-400"
  },
  {
    title: "Encrypted Health Records",
    description:
      "You stay in total control by choosing who can view or edit your records. Permissions can be time-limited, role-specific, and instantly revoked anytime with a single action.",
    color: "bg-feature-orange",
    BdColor: "border-orange-200",
    text: "text-orange-400"
  },
  {
    title: "Revocable Permissions",
    description:
      "You stay in total control by choosing who can view or edit your records. Permissions can be time-limited, role-specific, and instantly revoked anytime with a single action.",
    color: "bg-feature-orange",
    BdColor: "border-orange-200",
    text: "text-orange-400"
  },
  {
    title: "Clinic Write Access",
    description:
      "Every medical update, whether a vaccination, diagnosis, or lab result, is encrypted end-to-end and stored off-chain, ensuring your personal health information remains private, tamper-proof, and accessible only to you.",
    color: "bg-feature-blue",
    BdColor: "border-blue-200",
    text: "text-blue-400"
  },
  {
    title: "Emergency Health Alerts",
    description:
      "Receive real-time, authenticated alerts from your local health authority, covering outbreaks, vaccination drives, and urgent community notices, based on your region and health profile.",
    color: "bg-feature-cyan",
    BdColor: "border-cyan-200",
    text: "text-cyan-400"
  },
  {
    title: "Authority Dashboard",
    description:
      "Health authorities gain access to anonymized, real-time insights such as vaccination coverage, alert performance, and clinic activity, helping them make faster, data-driven public health decisions.",
    color: "bg-feature-yellow",
    BdColor: "border-yellow-200",
    text: "text-yellow-400"
  },
  {
    title: "Revocable Permissions",
    description:
      "You stay in total control by choosing who can view or edit your records. Permissions can be time-limited, role-specific, and instantly revoked anytime with a single action.",
    color: "bg-feature-orange",
    BdColor: "border-orange-200",
    text: "text-orange-400"
  },
]

export const KeyFeatures = () => {
  return (
    <section id="features" className="px-10 lg:px-28 py-20 md:py-20">
      {/* <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Our Key Features
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A simple, secure way to manage health records for residents, clinics,
          and communities.
        </p>
      </div> */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {features.map((feature, i) => (
          // We use cn() to merge the default card style with our
          // custom theme color from globals.css
          <Card key={i} className={cn("border-0 shadow-md", feature.text, feature.color ? feature.color : "", feature.BdColor ? `border ${feature.BdColor}` : "")}>
            <CardHeader>
              <CardTitle className="text-xl lg:text-3xl">{feature.title}</CardTitle>
              <CardDescription className="pt-2 text-foreground/80 text-md lg:text-xl">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
