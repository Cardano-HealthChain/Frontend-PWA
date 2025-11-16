import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button" // From shadcn

export const Navbar = () => {
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
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            About Us
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            FAQ
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <Button size='full'>Get Started</Button>
        {/* Add a Mobile Menu button here */}
      </div>
    </header>
  )
}
