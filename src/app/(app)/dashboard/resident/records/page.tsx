"use client";

import { useState } from "react";
import { RecordSummaryCards } from "./_components/RecordSummaryCards";
import { RecordsTable } from "./_components/RecordsTable";
import { RecordDetailPanel } from "./_components/RecordDetailPanel";
import { cn } from "@/lib/utils";

export default function RecordsPage() {
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      {/* Summary Cards - Full Width (Not affected by panel) */}
      <RecordSummaryCards />

      {/* Table Section with Detail Panel */}
      <div className="flex gap-6">
        {/* Records Table - Shrinks when panel opens */}
        <div className={cn("flex-1 transition-all duration-300", selectedRecord && "lg:w-[calc(100%-450px-1.5rem)]")}>
          <RecordsTable onRecordSelect={setSelectedRecord} searchQuery="" />
        </div>

        {/* Desktop Detail Panel - Appears beside table */}
        {selectedRecord && (
          <div className="hidden lg:block w-[450px] flex-shrink-0">
            <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
              <RecordDetailPanel record={selectedRecord} onClose={() => setSelectedRecord(null)} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Detail Panel - Full screen overlay */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
          <RecordDetailPanel record={selectedRecord} onClose={() => setSelectedRecord(null)} />
        </div>
      )}
    </div>
  );
}