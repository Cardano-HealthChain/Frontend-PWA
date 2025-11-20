"use client"

import React from "react"
import { Shield, GitCommit } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface HealthChainLoaderProps {
    // Optional text to display below the animation (e.g., "Securing DID...", "Encrypting Data...")
    loadingText?: string
}

export const HealthChainLoader: React.FC<HealthChainLoaderProps> = ({
    loadingText = "Loading Secure HealthChain...",
}) => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity duration-300">
            {/* 1. Main Animation Container (Shield + Network) */}
            <div className="relative h-28 w-28 md:h-36 md:w-36 animate-pulse">
                {/* Shield (Main Icon - Logo Placeholder) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/images/logo-icon.png"
                        alt="HealthChain Logo"
                        width={150}
                        height={150}
                        className=""
                        onError={(e) =>
                        (e.currentTarget.src =
                            "https://placehold.co/72x72/f0f4ff/6002ee?text=HC")
                        }
                    />
                </div>

                {/* Outer Orbiting Blocks (Decentralized Identity / Cardano) */}
                {/* <div className="relative w-full h-full animate-orbit-slow">
                    <div className="absolute top-0 left-1/2 -ml-2 h-4 w-4 rounded-full bg-primary shadow-xl animate-pulse-block">
                        <GitCommit className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div
                        className="absolute bottom-0 right-1/2 ml-2 h-4 w-4 rounded-full bg-primary/70 shadow-xl animate-pulse-block"
                        style={{ animationDelay: "0.5s" }}
                    >
                        <GitCommit className="h-4 w-4 text-primary-foreground" />
                    </div>
                </div> */}
            </div>

            {/* 2. Loading Text */}
            <div className="mt-8">
                <p className="text-lg font-semibold text-foreground/80 animate-fade-in-out">
                    {loadingText}
                </p>
            </div>
        </div>
    )
}
