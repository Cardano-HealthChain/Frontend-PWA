import Image from "next/image"
import { Button } from "@/components/ui/button"

export const Hero = () => {
  return (
    <section className="px-10 lg:px-24 grid grid-cols-1 gap-12 py-20 md:grid-cols-2 md:py-32 bg-[#EFF0FB]">
      {/* Left Column (Text) */}
      <div className="flex flex-col items-start justify-center text-left">
        <div className="flex items-center w-full md:w-1/2 justify-between mb-4 rounded-full px-3 py-2 shadow-md border border-gray-50 bg-white">
          <p className="text-xs text-muted-foreground">Have a Question?</p>
          <Button size='sm'>Ask AI</Button>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-4xl lg:text-6xl">
          <span className="text-primary">Decentralized </span> Community Health
          Records, Powered by <span className="text-primary">You.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          HealthChain lets you securely store your medical records, share them
          with clinics only when you choose, and receive essential health alerts
          that protect your community.
        </p>
        <Button size="lg" className="mt-8">
          Learn More
        </Button>
      </div>
      {/* Right Column (Image) */}
      <div className="flex items-center justify-center">
        {/* Assuming hero-graphic.png is in public/images */}
        <Image
          src="/images/bg-img.png"
          alt="HealthChain Dashboard"
          width={600}
          height={500}
          priority
        />
      </div>
    </section>
  )
}
