// PatientList.tsx
import { Users } from "lucide-react";

export const PatientListItem = ({ patient }: { patient: any }) => (
  <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
        <Users className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="font-semibold text-sm">{patient.name}</p>
        <p className="text-xs text-muted-foreground">{patient.condition}</p>
      </div>
    </div>

    <div className="text-right">
      <p className="text-xs font-medium">{patient.lastVisit}</p>
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          patient.status === "Critical"
            ? "bg-red-100 text-red-700"
            : patient.status === "Stable"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {patient.status}
      </span>
    </div>
  </div>
);
