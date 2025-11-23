import { Button } from "@/components/ui/button";
import { Calendar, PlusCircle } from "lucide-react";
import { DetailHeader, DetailSection } from "./DetailUtils";

export const ReminderDetail = ({ onClose }: { onClose: () => void }) => (
    <>
        <DetailHeader title="Annual Checkup Due Soon" subInfo="Recommended Date: Next 14 days" onClose={onClose} />

        <DetailSection title="Purpose">
            <p className="text-sm font-medium">Baseline physical examination</p>
            <p className="text-sm font-medium">Radiologist: <span className="text-muted-foreground">Dr. Tara Onafowora</span></p>
        </DetailSection>

        <DetailSection title="What to Expect">
            <ul className="text-sm text-muted-foreground space-y-1">
                <li>Vitals check, blood work</li>
                <li>Lifestyle assessment</li>
            </ul>
        </DetailSection>

        <DetailSection title="HealthChain AI Insight">
            <p className="text-sm text-muted-foreground">You’ve completed 4 out of 5 recommended screenings this year.</p>
        </DetailSection>

        <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="default" className="w-full sm:w-auto"><Calendar className="mr-2 h-4 w-4" /> Book Appointment</Button>
            <Button variant="outline" className="w-full sm:w-auto"><PlusCircle className="mr-2 h-4 w-4" /> Set Reminder</Button>
        </div>
    </>
);