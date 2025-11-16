'use client'

import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Features", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
  { label: "Terms", href: "#terms" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#000103] text-background">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo0.png" // Requires a white/light version of your logo
              alt="HealthChain Logo"
              width={150}
              height={150}
              onError={(e) => (e.currentTarget.src = "https://placehold.co/30x30/ffffff/6002ee?text=H")}
            />  
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-background/20 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            Copyright © {new Date().getFullYear()} HealthChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};