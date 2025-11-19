"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Download, Info } from "lucide-react";
import Image from "next/image";

export function DIDGenerationForm() {
  const did = "345EUQX-CLINIC-DID";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid gap-2 w-full max-w-sm">
        <Label htmlFor="did-display" className="flex items-center gap-1">
          Your DID <Info className="h-3 w-3 text-muted-foreground" />
        </Label>
        <div className="relative">
          <Input
            id="did-display"
            type="text"
            defaultValue={did}
            readOnly
            className="pr-10 text-center border-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Large QR Code Placeholder */}
      <div className="mt-2 mb-2 border border-border p-4 rounded-lg bg-background shadow-xl">
        <Image
          src="/images/qrcode.png" // Replace with real QR code component later
          alt="Clinic DID QR Code"
          width={256}
          height={256}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button size="lg" variant="outline" className="border-primary">
          <Copy className="mr-2 h-4 w-4" /> Copy Code
        </Button>
        <Button size="lg" variant="outline" className="border-primary">
          <Download className="mr-2 h-4 w-4" /> Download DID File
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mt-2 text-center max-w-md">
        This will create your verifiable digital identity used to authenticate
        your medical records.
      </p>
    </div>
  )
}