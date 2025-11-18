"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Paperclip, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const FileDropZone = ({
  title,
  optional = false,
}: {
  title: string
  optional?: boolean
}) => (
  <div className="grid gap-2">
    <Label htmlFor={title.toLowerCase().replace(/\s/g, "-")}>
      {title}{" "}
      {optional && (
        <span className="text-xs font-normal text-muted-foreground">
          (OPTIONAL)
        </span>
      )}
    </Label>
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-md border-2 border-dashed border-primary p-8 text-center",
        "hover:bg-muted/50 transition-colors"
      )}
    >
      <Paperclip className="h-6 w-6 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">
        Drop Files Here To Upload
      </p>
      <Input
        type="file"
        className="sr-only"
        id={title.toLowerCase().replace(/\s/g, "-")}
      />
      <Button variant="outline" size="sm" className="mt-3">
        Select File
      </Button>
    </div>
  </div>
)

export function DocumentUploadForm() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:overflow-x-hidden">
      <FileDropZone title="Healthcare Facility License" />
      <FileDropZone title="Proof of Address" optional />
      <FileDropZone title="Medical Practitioner ID/Nurse ID Card" />
      <FileDropZone title="CAC Certificate" optional />

      <p className="text-xs text-muted-foreground mt-4 md:col-span-2 text-center">
        Documents are encrypted and stored securely. Only your Health Authority
        can view them.
      </p>
    </div>
  )
}
