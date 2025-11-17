"use client"

import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4"
      style={{
        background:
          "radial-gradient(circle at center, hsl(230, 100%, 98%), hsl(0, 0%, 100%) 60%)",
      }}
    >
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="HealthChain Logo"
          width={150}
          height={150}
          onError={(e) =>
            (e.currentTarget.src =
              "https://placehold.co/36x36/6002ee/ffffff?text=H")
          }
        />
      </Link>
      <main>{children}</main>
      <p className="mt-12 max-w-lg text-center text-xs text-muted-foreground">
        Your wallet stores the keys that protect your encrypted health data.
        HealthChain never sees your private keys.
      </p>
    </div>
  )
}
