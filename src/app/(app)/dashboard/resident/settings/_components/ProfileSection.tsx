import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Edit, Trash2, Lock } from "lucide-react";
import Image from "next/image";
import { SectionContainer } from "./SectionContainer";
import { mockProfile } from "../_data/SettingsData";
import * as React from "react";

export const ProfileSection = () => (
    <div className="space-y-6 border-none bg-white rounded-lg p-4">
        <div className="border-b border-gray-200">
            <p className="text-lg font-semibold">Profile Information</p>
        </div>
        {/* Profile Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Image
                    src="/images/avatar.png"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-primary"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/80x80/6002ee/ffffff?text=U")}
                />
                <div>
                    <h4 className="font-semibold">{mockProfile.fullName}</h4>
                    <p className="text-sm text-muted-foreground">{mockProfile.email}</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                <Button variant="outline" size="lg" className="h-8 border-primary">Revoke</Button>
                <Button variant="outline" size="lg" className="h-8 border-primary">Limit Access</Button>
            </div>
        </div>

        {/* Basic Info */}
        <SectionContainer title="Basic Info">
            {[
                { label: "Full Name", value: mockProfile.fullName },
                { label: "Date of Birth", value: mockProfile.dob },
                { label: "Gender", value: mockProfile.gender },
                { label: "Blood Group", value: mockProfile.bloodGroup },
                { label: "Genotype", value: mockProfile.genotype },
            ].map((item, i) => (
                <div key={i} className="flex justify-between py-1 text-sm border-b border-gray-200 last:border-b-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                </div>
            ))}
        </SectionContainer>

        {/* Contact Info */}
        <SectionContainer title="Contact Info">
            {[
                { label: "Phone Number", value: mockProfile.phone },
                { label: "Email", value: mockProfile.email },
            ].map((item, i) => (
                <div key={i} className="flex justify-between py-1 text-sm border-b border-gray-200 last:border-b-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                </div>
            ))}
        </SectionContainer>

        {/* Emergency Contact */}
        <SectionContainer title="Emergency Contact">
            {[
                { label: "Name", value: mockProfile.emergencyContact.name },
                { label: "Relationship", value: mockProfile.emergencyContact.relationship },
                { label: "Phone", value: mockProfile.emergencyContact.phone },
            ].map((item, i) => (
                <div key={i} className="flex justify-between py-1 text-sm border-b border-gray-200 last:border-b-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                </div>
            ))}
        </SectionContainer>

        {/* HealthChain ID */}
        <SectionContainer title="HealthChain ID">
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">DID Number</span>
                <span className="font-medium">{mockProfile.did}</span>
            </div>
            <div className="mt-4 flex justify-end gap-3">
                <Button variant="outline" size="lg" className="border-primary"><Lock className="mr-2 h-4 w-4 " /> Limit Access</Button>
            </div>
        </SectionContainer>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
            <Button variant="outline" size="lg" className="border-primary"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
            <Button variant="default" size="lg"><CheckCircle className="mr-2 h-4 w-4" /> Save Changes</Button>
            <Button variant="destructive" size="lg"><Trash2 className="mr-2 h-4 w-4" /> Delete Account</Button>
        </div>
    </div>
);