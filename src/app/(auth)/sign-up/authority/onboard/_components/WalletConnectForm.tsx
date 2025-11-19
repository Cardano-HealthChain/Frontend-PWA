"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Wallet, PlusCircle } from "lucide-react"

const walletOptions = [
  {
    id: "create-new",
    title: "Create New Wallet",
    icon: <PlusCircle className="h-8 w-8 text-primary" />,
    description: "Create a new wallet for the clinic's verifiable credentials.",
  },
  {
    id: "connect-existing",
    title: "Connect Existing Wallet",
    icon: <Wallet className="h-8 w-8 text-primary" />,
    description:
      "Connect existing wallet (for clinics or Cardano professionals).",
  },
]

export function WalletConnectForm() {
  const [selectedOption, setSelectedOption] = useState("create-new")

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm text-muted-foreground mb-8 text-center">
        Your DID secures administrative actions such as sending alerts and approving clinic registrations.
      </p>
      <RadioGroup
        defaultValue="create-new"
        onValueChange={setSelectedOption}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full"
      >
        {walletOptions.map((option) => (
          <Label
            key={option.id}
            htmlFor={option.id}
            className={cn(
              "relative cursor-pointer rounded-lg border-2 bg-background capitalize p-6 transition-all",
              selectedOption === option.id
                ? "border-primary ring-2 ring-primary"
                : "border-border hover:bg-secondary/50"
            )}
          >
            <RadioGroupItem
              value={option.id}
              id={option.id}
              className="absolute right-4 top-4"
            />
            <Card className="flex h-full flex-col items-center justify-center p-8 border-none shadow-none">
              {option.icon}
              <h3 className="mt-4 text-lg font-semibold">{option.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                {option.description}
              </p>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      <p className="mt-12 text-xs max-w-lg text-center text-muted-foreground">
        Your wallet secures cryptographic signatures used when sending alerts.
      </p>
    </div>
  )
}
