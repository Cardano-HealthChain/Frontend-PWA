import type { Metadata } from "next"
import { Urbanist } from "next/font/google" // Import Urbanist
import "./globals.css"
import { cn } from "@/lib/utils" // Make sure you have this util from shadcn

// Setup the font with weights and a CSS variable
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "HealthChain",
  description: "Decentralized Community Health Records.",
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
      </body>
    </html>
  )
}
