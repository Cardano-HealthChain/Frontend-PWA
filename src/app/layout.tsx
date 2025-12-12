import type { Metadata } from "next"
import { Urbanist } from "next/font/google" // Import Urbanist
import "./globals.css"
import { cn } from "@/lib/utils" // Make sure you have this util from shadcn
import { Toaster } from "@/components/ui/toaster"
// import { BackendWarmup } from "@/components/backendWarmup.tsx

// Setup the font with weights and a CSS variable
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "HealthChain – Decentralized Community Health Records",
  description: "HealthChain is a Cardano-powered decentralized medical record system enabling secure, user-owned health data.",
  keywords: [
    "HealthChain",
    "Health Chain",
    "HealthChain Cardano",
    "Cardano healthcare",
    "Cardano medical records",
    "decentralized health records",
    "blockchain healthcare app"
  ],
  openGraph: {
    title: "HealthChain – Cardano-Powered Health Records",
    description: "A decentralized, user-owned health data platform built on Cardano.",
    url: "https://healthchain-cardano.vercel.app",
    type: "website"
  },
  manifest: "/manifest.json",
  themeColor: "#4F46E5",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-512x512.png"
  }
} 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          urbanist.variable // Apply the font variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
