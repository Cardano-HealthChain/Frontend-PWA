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
    recordType: "Imaging",
    status: "Verified",
    findings: "No signs of pneumonia, infiltrate, or pleural effusion. No signs of pneumothorax or pleural effusion. Cardiac silhouette is normal in size and contour. Trachea is midline. No masses or nodules detected. Diaphragm well defined.",
    reasonForTest: "Persistent cough lasting 2-3 weeks",
    conclusion: "Normal chest radiograph.",
    comparison: {
        lastImaging: "July 2023",
        changes: "No changes detected. Lung clarity significantly improved from previous minor congestion"
    },
    radiologistNote: "No underlying pathology seen. Recommend follow-up only if symptoms persist",
    aiInsight: "There is a 98% probability of normal lung appearance based on automated image analysis.",
    attachments: [
        { name: "Xray_Chest_20220204.jpg", type: "High-res" },
        { name: "Radiologist_Report.pdf", type: "PDF" }
    ],
    sharedWith: [
        { name: "HavenPoint Clinic", access: "" },
        { name: "Sunrise Medical", access: "(Read-only)" }
    ],
    auditLog: [
        { action: "Image analyzed by AI", date: "Dec 20" },
        { action: "Viewed by Resident", date: "Dec 22" },
        { action: "Viewed by HavenPoint", date: "Dec 23" }
    ]
};

export const RecordDetailPanel = ({ record, onClose }: RecordDetailPanelProps) => {
  return (
    <div className="h-full bg-white border-none rounded-lg shadow-xl overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-200">
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

        <Section title="Reason for Test" content={mockDetail.reasonForTest} /> 

        {/* Conclusion */}
        <div className="space-y-2">
          <h4 className="font-semibold border-b border-gray-200 pb-2">Conclusion</h4>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            {mockDetail.conclusion}
          </p>
        </div>

        {/* Comparison with Previous Imaging */}
        <div className="space-y-2">
          <h4 className="font-semibold border-b border-gray-200 pb-2">Comparison with Previous Imaging</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Last chest imaging: {mockDetail.comparison.lastImaging}</p>
            <p>{mockDetail.comparison.changes}</p>
          </div>
        </div>

        {/* Radiologist Note */}
        <Section title="Radiologist Note" content={mockDetail.radiologistNote} />

        {/* AI Insight */}
        <Section title="HealthChain AI Insight" content={mockDetail.aiInsight} />

        {/* Attachments */}
        <div className="space-y-2">
          <h4 className="font-semibold border-b pb-2">Attachments</h4>
          <div className="space-y-2">
            {mockDetail.attachments.map((file, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                {/* <span className="text-blue-600">📄</span> */}
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.type}</p>
                </div>
                <Download className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Shared With */}
        <div className="space-y-2">
          <h4 className="font-semibold border-b border-gray-200 pb-2">Shared With</h4>
          <div className="space-y-2">
            {mockDetail.sharedWith.map((clinic, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <div className="flex items-center gap-2">
                  {/* <span className="text-lg">🏥</span> */}
                  <span className="text-sm font-medium">{clinic.name}</span>
                </div>
                {clinic.access && (
                  <span className="text-xs text-muted-foreground">{clinic.access}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className="space-y-2">
          <h4 className="font-semibold border-b border-gray-200 pb-2">Audit Log</h4>
          <div className="space-y-2">
            {mockDetail.auditLog.map((log, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">{log.action}</span>
                <span className="text-muted-foreground">{log.date}</span>
              </div>
            ))}
          </div>
              </div>
              
        {/* Actions */}
        <div className="space-y-3">
          <h4 className="font-semibold border-b border-gray-200 pb-2">Actions</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <Button variant="outline" className="w-full justify-start border-primary rounded-lg">
              <Eye className="mr-2 h-4 w-4" /> View Image
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary rounded-lg">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary rounded-lg">
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
    <h4 className="font-semibold border-b border-gray-200 pb-2">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
  </div>
);