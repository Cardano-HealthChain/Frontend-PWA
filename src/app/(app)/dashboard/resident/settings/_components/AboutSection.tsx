import { Button } from "@/components/ui/button";
import { SectionContainer } from "./SectionContainer";
import * as React from "react";

export const AboutSection = () => (
    <div className="space-y-6 border-none bg-white rounded-lg p-4">
        <SectionContainer title="Application Information">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium">Version</span>
                <span className="text-sm text-muted-foreground">1.0.0 (MVP Build)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium">Built on</span>
                <span className="text-sm text-muted-foreground">Cardano & Atala PRISM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium">Support Email</span>
                <span className="text-sm text-primary">support@healthchain.io</span>
            </div>
        </SectionContainer>

        <SectionContainer title="Legal & Compliance">
            <div className="flex flex-col gap-3">
                <Button variant="link" className="p-0 h-auto justify-start text-sm">Terms of Service</Button>
                <Button variant="link" className="p-0 h-auto justify-start text-sm">Privacy Policy</Button>
                <Button variant="link" className="p-0 h-auto justify-start text-sm">Open Source Licenses</Button>
            </div>
        </SectionContainer>

        <SectionContainer title="Developer Information">
            <p className="text-sm text-muted-foreground">This application is a verifiable credential issuer and holder. DID resolution is handled off-chain via your chosen wallet.</p>
            <div className="flex justify-end pt-4">
                <Button variant="outline" size="lg" className="rounded-lg border-primary">View API Documentation</Button>
            </div>
        </SectionContainer>
    </div>
);