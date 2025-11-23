import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { DetailHeader, DetailSection } from "./DetailUtils";

export const MalariaAlertDetail = ({ onClose }: { onClose: () => void }) => (
    <>
        <DetailHeader title="Malaria Outbreak – High Risk Area" subInfo="Issued By: Nigeria CDC, HealthChain Integrated Alert System" onClose={onClose} />

        <DetailSection title="Summary">
            <p className="text-sm text-muted-foreground">A rapid increase in malaria cases has been reported within a 3km radius of your home location.</p>
            <p className="text-sm font-medium pt-2">Reason for Test: <span className="text-muted-foreground">Persistent cough lasting 2 weeks</span></p>
            <p className="text-sm font-medium">Conclusion: <span className="text-green-600 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Normal chest radiograph</span></p>
        </DetailSection>

        <DetailSection title="Recommended Actions">
            <ul className="text-sm text-muted-foreground space-y-1">
                <li>Sleep under mosquito-treated nets</li>
                <li>Avoid stagnant water areas at night</li>
                <li>Consult a local clinic immediately</li>
            </ul>
        </DetailSection>

        <DetailSection title="HealthChain AI Insight">
            <p className="text-sm text-muted-foreground">You have had 3 malaria screenings in the last 6 months. No recent positive cases.</p>
        </DetailSection>

        <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="outline" size="sm">Learn More</Button>
            <Button variant="outline" size="sm">Preventive Tips</Button>
            <Button variant="default" size="sm">Mark as Read</Button>
        </div>
    </>
);