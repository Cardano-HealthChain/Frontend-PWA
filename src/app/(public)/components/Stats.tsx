"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// Helper component for a consistent card layout
const StatCard = ({
  value,
  description,
  iconSrc,
  iconAlt,
  size = "small",
}) => {
  const isLarge = size === "large"
  const iconSize = isLarge ? 80 : 56
  const valueClass = isLarge ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
  const cardHeight = isLarge ? "min-h-[240px] md:min-h-[320px]" : "min-h-[180px] md:min-h-[200px]"

  return (
    <Card className={`flex flex-col shadow-lg transition-shadow duration-300 hover:shadow-xl w-full ${cardHeight}`}>
      <CardContent className="flex flex-col items-center justify-center text-center p-4 md:p-6 flex-1">
        {/* Visual Icon */}
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={iconSize}
          height={iconSize}
          className="object-contain mb-3"
          onError={(e) =>
            (e.currentTarget.src = `https://placehold.co/${iconSize}x${iconSize}/f0f4ff/6002ee?text=Stat`)
          }
        />

        {/* Statistic Value */}
        <div className="space-y-1 mt-2">
          <div className={`${valueClass} font-bold text-foreground whitespace-nowrap`}>
            {value}
          </div>

          {/* Description/Label */}
          <p className="text-xs md:text-sm text-muted-foreground font-medium leading-tight max-w-[140px] mx-auto">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export const Stats = () => {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container max-w-7xl px-4">
        {/* Main Title - Centered at the top */}
        <div className="text-center mb-12 md:mb-1">
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl lg:text-4xl max-w-4xl mx-auto leading-tight">
            Building Trust in Community Health.{" "}
            <br className="hidden md:block" />
            One Record at a Time
          </h2>
        </div>

        {/* Card Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: 5 columns with alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto items-end">
          {/* Card 1: 85%+ Pie Chart - LARGE */}
          <StatCard
            value="85%+"
            description="User utility per digital health records"
            iconSrc="/images/stat-pie.svg"
            iconAlt="Pie Chart"
            size="large"
          />
          
          {/* Card 2: 300+ Certificate - SMALL */}
          <StatCard
            value="300+"
            description="Registered clinics and health workers"
            iconSrc="/images/stat-doc.png"
            iconAlt="Clinics"
            size="small"
          />
          
          {/* Card 3: 4.9 Star - SMALL */}
          <StatCard
            value="4.9⭐"
            description="Trusted by thousands of residents and families"
            iconSrc="/images/stat-user.png"
            iconAlt="User Rating"
            size="small"
          />
          
          {/* Card 4: 10,000+ Coins - SMALL */}
          <StatCard
            value="10,000+"
            description="Encrypted health records safely stored"
            iconSrc="/images/stat-coin.png"
            iconAlt="Records Count"
            size="small"
          />
          
          {/* Card 5: 120+ Video - LARGE */}
          <StatCard
            value="120+"
            description="tags/health clients served by verified partners"
            iconSrc="/images/stat-video.png"
            iconAlt="Communities"
            size="large"
          />
        </div>
      </div>
    </section>
  )
}