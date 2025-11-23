import { Button } from "@/components/ui/button";
import { Download, Share2, Eye } from "lucide-react";
import Link from 'next/link';
import { DetailHeader, DetailSection } from "./DetailUtils";

export const HealthUpdateDetail = ({ onClose }: { onClose: () => void }) => (
    <>
        <DetailHeader title="New Chest X-Ray Result Ready" subInfo="Imaging Type: X-Ray (PA View)" onClose={onClose} />
        
        <DetailSection title="Summary">
            <p className="text-sm text-muted-foreground">Normal chest appearance, lungs clear.</p>
        </DetailSection>

        <DetailSection title="Attachments">
            <ul className="text-sm text-primary space-y-1">
                <li><Link href="#" className="underline">High-Resolution Image</Link></li>
                <li><Link href="#" className="underline">Radiologist Report (PDF)</Link></li>
            </ul>
        </DetailSection>

        <DetailSection title="HealthChain AI Insight">
            <p className="text-sm text-muted-foreground">High probability of clear lungs.</p>
        </DetailSection>

        <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="default" className="w-full sm:w-auto"><Eye className="mr-2 h-4 w-4" /> View Image</Button>
            <Button variant="outline" className="w-full sm:w-auto"><Download className="mr-2 h-4 w-4" /> Download</Button>
            <Button variant="outline" className="w-full sm:w-auto"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
    </>
);