// DoctorList.tsx
"use client"
import { DoctorCard } from "./DoctorCard";

export const DoctorList = ({ doctors }: { doctors: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {doctors.map((doctor, i) => (
      <DoctorCard key={i} doctor={doctor} />
    ))}
  </div>
);
