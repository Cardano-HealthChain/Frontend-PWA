'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const stats = [
  {
    value: "85%+",
    label: "Trust Rating",
    image: "/images/stat-pie.svg",
  },
  {
    value: "200+",
    label: "Clinics",
    image: "/images/stat-doc.png",
  },
  {
    value: "4.9",
    label: "User Rating",
    image: "/images/stats-rating.png",
  },
  {
    value: "10,000+",
    label: "Users",
    image: "/images/stats-users.png",
  },
  {
    value: "120+",
    label: "Communities",
    image: "/images/stats-communities.png",
  },
]

export const Stats = () => {
  return (
    <section className="bg-secondary py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Building Trust in Community Health.
            <br />
            One Record at a Time.
          </h2>
        </div>
        <Card className="mt-16 w-full shadow-lg">
          <CardContent className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-12 p-8 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3"
              >
                <Image
                  src={stat.image}
                  alt={stat.label}
                  width={80}
                  height={80}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/80x80/f0f4ff/6002ee?text=Stat")
                  }
                />
                <div className="text-center">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
