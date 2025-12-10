// app/dashboard/resident/records/page.tsx
"use client";

import { useState } from "react";
import { RecordSummaryCards } from "./_components/RecordSummaryCards";
import { RecordsTable } from "./_components/RecordsTable";
import { RecordDetailPanel } from "./_components/RecordDetailPanel";
import { cn } from "@/lib/utils";
import { useRecords } from "@/hooks/useRecords";
import { MedicalRecord } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecordsPage() {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  const { records, isLoading, error, refetch, loadMore, hasMore } = useRecords({
    searchKeyword: searchQuery,
    category: filterCategory,
    autoFetch: true,
  });

  // Loading State
  if (isLoading && records.length === 0) {
    return <RecordsPageSkeleton />;
  }

  // Error State
  if (error && records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold">Failed to Load Records</h2>
        <p className="text-muted-foreground">
          We couldn't load your medical records. Please try again.
        </p>
        <Button onClick={refetch}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards - Full Width (Not affected by panel) */}
      <RecordSummaryCards records={records} />

      {/* Table Section with Detail Panel */}
      <div className="flex gap-6">
        {/* Records Table - Shrinks when panel opens */}
        <div className={cn("flex-1 transition-all duration-300", selectedRecord && "lg:w-[calc(100%-450px-1.5rem)]")}>
          <RecordsTable
            records={records}
            onRecordSelect={setSelectedRecord}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCategoryChange={setFilterCategory}
            isLoading={isLoading}
            onLoadMore={loadMore}
            hasMore={hasMore}
          />
        </div>

        {/* Desktop Detail Panel - Appears beside table */}
        {selectedRecord && (
          <div className="hidden lg:block w-[450px] flex-shrink-0">
            <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
              <RecordDetailPanel
                record={selectedRecord}
                onClose={() => setSelectedRecord(null)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Detail Panel - Full screen overlay */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
          <RecordDetailPanel
            record={selectedRecord}
            onClose={() => setSelectedRecord(null)}
          />
        </div>
      )}
    </div>
  );
}

// Loading Skeleton
function RecordsPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-20 w-full" />
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card className="p-6">
        <Skeleton className="h-8 w-[200px] mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}