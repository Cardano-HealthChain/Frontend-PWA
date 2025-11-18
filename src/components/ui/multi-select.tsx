"use client"

import * as React from "react"
import { X, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandGroup,
  CommandItem,
    CommandList,
  CommandInput,
} from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { Button } from "@/components/ui/button"

type Option = {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  className?: string
  placeholder?: string
  createText?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  className,
  placeholder = "Select...",
  createText = "Add item",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const selectables = options.filter(
    (option) => !selected.includes(option.value)
  )

  const addSelectable = (value: string) => {
    onChange([...selected, value])
  }

  const removeSelectable = (value: string) => {
    onChange(selected.filter((s) => s !== value))
  }

  const addCustom = (value: string) => {
    if (!value || selected.includes(value)) return
    onChange([...selected, value])
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-wrap gap-2 rounded-md border border-input p-2">
        {selected.map((value) => (
          <Badge
            variant="secondary"
            key={value}
            className="flex items-center gap-1"
          >
            {options.find((o) => o.value === value)?.label || value}
            <button
              aria-label={`Remove selected item ${
                options.find((o) => o.value === value)?.label || value
              }`}
              className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeSelectable(value)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}

        <CommandPrimitive>
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue) {
                e.preventDefault()
                addCustom(inputValue)
                setInputValue("")
              }
            }}
            placeholder={placeholder}
            className="flex-1 border-0 shadow-none outline-none ring-0 focus:ring-0"
          />
          <div className="relative">
            {open && selectables.length > 0 && (
              <CommandList className="absolute top-2 w-full rounded-md border bg-popover shadow-md outline-none animate-in data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                <CommandGroup>
                  {selectables.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => e.preventDefault()}
                      onSelect={() => {
                        addSelectable(option.value)
                        setInputValue("")
                      }}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </div>
        </CommandPrimitive>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2 text-primary"
        onClick={() => {
          if (!inputValue) return
          addCustom(inputValue)
          setInputValue("")
        }}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Condition
      </Button>
    </div>
  )
}
