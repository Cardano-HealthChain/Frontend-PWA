"use client"
import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button" // From shadcn
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Import Sheet components
import { Menu } from "lucide-react"; // Import Menu icon

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];


export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Assuming you have a logo.svg in public/images */}
          <Image
            src="/images/logo.png"
            alt="HealthChain Logo"
            width={150}
            height={150}
          />
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/sign-up" >
        <Button size="full" className="lg:flex hidden">
          Get Started
        </Button>
        </Link>
        {/* Mobile Nav - UPDATED */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            {" "}
            {/* <-- UPDATED from "right" to "left" */}
            {/* Add a header inside the sheet */}
            <div className="border-b border-primary pb-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/images/logo.png"
                  alt="HealthChain Logo"
                  width={80}
                  height={80}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/30x30/6002ee/ffffff?text=H")
                  }
                />
              </Link>
            </div>
            {/* Navigation links */}
            <nav className="flex flex-col gap-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/sign-up" className="cursor-pointer">
              <Button
                size="full"
                className="mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
