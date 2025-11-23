import { Button } from "@/components/ui/button";
import { Trash2, Lock } from "lucide-react";
import { DetailHeader, DetailSection } from "./DetailUtils";

export const SecurityDetail = ({ onClose }: { onClose: () => void }) => (
    <>
        <DetailHeader title="New Clinic Granted Access" subInfo="Access Granted To: Sunrise Clinic" onClose={onClose} />
        
        <DetailSection title="Access Details">
            <div className="grid grid-cols-2 gap-y-1 text-sm">
                <span className="text-muted-foreground">Access Level:</span>
                <span className="font-medium text-right">Full - All Records</span>
                <span className="text-muted-foreground">Valid Until:</span>
                <span className="font-medium text-right">25 Feb</span>
                <span className="text-muted-foreground">Reason:</span>
                <span className="font-medium text-right">Appointment booked on 25 Jan</span>
            </div>
        </DetailSection>

        <DetailSection title="Resident Control">
             <p className="text-sm text-muted-foreground mb-3">Keep access active if you&apos;re expecting follow-up results.</p>
            <div className="flex flex-wrap gap-3">
                <Button variant="destructive" className="w-full sm:w-auto"><Trash2 className="mr-2 h-4 w-4" /> Revoke Access</Button>
                <Button variant="outline" className="w-full sm:w-auto"><Lock className="mr-2 h-4 w-4" /> Limit Specific Records</Button>
            </div>
        </DetailSection>
    </>
);