import { Button } from "@/components/ui/button";
import { Eye, Download, Share2, X } from "lucide-react";

type RecordDetailPanelProps = {
  record: any;
  onClose: () => void;
};

// This would normally come from an API based on the selected record
const mockDetail = {
  title: "Chest X-ray - PA View",
  date: "20 Dec 2024 — 3:44 PM",
  facility: "Emerald Diagnostics Centre",
  radiologist: "Dr. Tara Onafowora (Consultant Radiologist)",
  status: "Verified",
  findings: "No signs of pneumonia, infiltrate, or pleural effusion. Cardiac silhouette is normal in size and contour. Trachea is midline. Diaphragm well defined.",
  aiInsight: "There is a 98% probability of normal lung appearance based on automated image analysis.",
};

export const RecordDetailPanel = ({ record, onClose }: RecordDetailPanelProps) => {
  return (
    <div className="h-full bg-white border-l shadow-xl overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b">
          <h3 className="text-xl font-bold">{mockDetail.title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Basic Info */}
        <div className="space-y-3 text-sm">
          <InfoRow label="Date" value={mockDetail.date} />
          <InfoRow label="Facility" value={mockDetail.facility} />
          <InfoRow label="Radiologist" value={mockDetail.radiologist} />
          <InfoRow label="Status" value={mockDetail.status} isStatus />
        </div>

        {/* Findings */}
        <Section title="Imaging Findings" content={mockDetail.findings} />

        {/* AI Insight */}
        <Section title="HealthChain AI Insight" content={mockDetail.aiInsight} />

        {/* Actions */}
        <div className="space-y-3">
          <h4 className="font-semibold border-b pb-2">Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" className="w-full justify-start">
              <Eye className="mr-2 h-4 w-4" /> View Image
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoRow = ({ label, value, isStatus }: { label: string; value: string; isStatus?: boolean }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    {isStatus ? (
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <span className="font-medium text-green-700">{value}</span>
      </span>
    ) : (
      <span className="font-medium">{value}</span>
    )}
  </div>
);

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="space-y-2">
    <h4 className="font-semibold border-b pb-2">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
  </div>
);