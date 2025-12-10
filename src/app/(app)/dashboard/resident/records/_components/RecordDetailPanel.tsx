// app/dashboard/resident/records/_components/RecordDetailPanel.tsx
import { Button } from "@/components/ui/button";
import { Eye, Download, Share2, X, CheckCircle, AlertCircle } from "lucide-react";
import { MedicalRecord } from "@/lib/api";

type RecordDetailPanelProps = {
  record: MedicalRecord;
  onClose: () => void;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const parseRecordData = (recordData: string) => {
  try {
    return JSON.parse(recordData);
  } catch {
    return null;
  }
};

export const RecordDetailPanel = ({ record, onClose }: RecordDetailPanelProps) => {
  const parsedData = parseRecordData(record.record_data);

  return (
    <div className="h-full bg-white border-none rounded-lg shadow-xl overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-bold">{record.record_type || "Medical Record"}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(record.created_at)}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Verification Status */}
        <div className={`flex items-center gap-2 p-3 rounded-lg ${record.verified
            ? 'bg-green-50 border border-green-200'
            : 'bg-yellow-50 border border-yellow-200'
          }`}>
          {record.verified ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Verified Record</p>
                <p className="text-xs text-green-700">
                  This record has been verified on the blockchain
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Pending Verification</p>
                <p className="text-xs text-yellow-700">
                  This record is awaiting blockchain verification
                </p>
              </div>
            </>
          )}
        </div>

        {/* Basic Info */}
        <div className="space-y-3 text-sm">
          <InfoRow label="Patient Name" value={record.patientName} />
          <InfoRow label="Record Type" value={record.record_type} />
          <InfoRow label="Uploaded By" value={record.uploaded_by} />
          <InfoRow label="Created" value={formatDate(record.created_at)} />
          <InfoRow
            label="Status"
            value={record.verified ? "Verified" : "Pending"}
            isStatus
            verified={record.verified}
          />
        </div>

        {/* Blockchain Info */}
        {record.verified && (
          <div className="space-y-2">
            <h4 className="font-semibold border-b border-gray-200 pb-2">Blockchain Details</h4>
            <div className="space-y-2">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                <p className="text-xs font-mono break-all">{record.blockchainTransactionID}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Local Hash</p>
                <p className="text-xs font-mono break-all">{record.hash_local}</p>
              </div>
            </div>
          </div>
        )}

        {/* Record Data */}
        {parsedData && (
          <div className="space-y-2">
            <h4 className="font-semibold border-b border-gray-200 pb-2">Record Details</h4>
            <div className="bg-muted/50 p-3 rounded-lg">
              <pre className="text-xs whitespace-pre-wrap break-words">
                {JSON.stringify(parsedData, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Raw Data Fallback */}
        {!parsedData && record.record_data && (
          <div className="space-y-2">
            <h4 className="font-semibold border-b border-gray-200 pb-2">Record Content</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {record.record_data}
            </p>
          </div>
        )}

        {/* Record ID */}
        <div className="space-y-2">
          <h4 className="font-semibold border-b border-gray-200 pb-2">Record Information</h4>
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Record ID</p>
            <p className="text-sm font-mono break-all">{record.record_id}</p>
          </div>
        </div>

        {/* AI Insight Placeholder */}
        <Section
          title="HealthChain AI Insight"
          content="This record has been securely stored and verified using blockchain technology, ensuring its authenticity and preventing unauthorized modifications."
        />

        {/* Actions */}
        <div className="space-y-3">
          <h4 className="font-semibold border-b border-gray-200 pb-2">Actions</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="w-full justify-start border-primary rounded-lg"
              onClick={() => console.log("View record:", record.record_id)}
            >
              <Eye className="mr-2 h-4 w-4" /> View Full
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-primary rounded-lg"
              onClick={() => {
                // Download logic
                const dataStr = JSON.stringify(record, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `record_${record.record_id}.json`;
                link.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-primary rounded-lg"
              onClick={() => console.log("Share record:", record.record_id)}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>

        {/* Verification Note */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong>Note:</strong> All medical records on HealthChain are cryptographically
            secured and stored on a distributed ledger, ensuring data integrity and
            immutability. {record.verified ? "This record's authenticity has been verified." :
              "Once verified, this record cannot be altered or deleted."}
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoRow = ({
  label,
  value,
  isStatus,
  verified
}: {
  label: string;
  value: string;
  isStatus?: boolean;
  verified?: boolean;
}) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    {isStatus ? (
      <span className="flex items-center gap-1">
        <span className={`h-2 w-2 rounded-full ${verified ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
        <span className={`font-medium ${verified ? 'text-green-700' : 'text-yellow-700'}`}>
          {value}
        </span>
      </span>
    ) : (
      <span className="font-medium text-right">{value}</span>
    )}
  </div>
);

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="space-y-2">
    <h4 className="font-semibold border-b border-gray-200 pb-2">{title}</h4>
    <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
  </div>
);