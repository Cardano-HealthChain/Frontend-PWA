import { Button } from "@/components/ui/button";
import Link from "next/link"

export const CTA = () => {
  return (
    <section
      className="py-20 md:py-32 bg-[#00000080] bg-blend-overlay"
      style={{
        backgroundImage: "url('/images/cta-img.jpg')", // From /public/images
        backgroundColor: "#00000080",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Take Control of Your
            <br />
            Health Data Today.
          </h2>
          <Link href="/roles" className="cursor-pointer">
            <Button size="lg" variant="secondary" className="mt-8 font-semibold">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
