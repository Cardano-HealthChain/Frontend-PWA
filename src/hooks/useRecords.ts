// hooks/useRecords.ts
"use client";

import { useState, useEffect } from "react";
import {
    getMedicalRecords,
    getVerifiedRecords,
    getMedicalRecord,
    getFilteredRecords,
    getFilteredVerifiedRecords,
    searchMedicalRecords,
    MedicalRecord
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface UseRecordsOptions {
    verifiedOnly?: boolean;
    category?: string;
    searchKeyword?: string;
    autoFetch?: boolean;
}

interface UseRecordsReturn {
    records: MedicalRecord[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    loadMore: () => Promise<void>;
    hasMore: boolean;
    currentPage: number;
}

export function useRecords(options: UseRecordsOptions = {}): UseRecordsReturn {
    const {
        verifiedOnly = false,
        category,
        searchKeyword,
        autoFetch = true
    } = options;

    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { toast } = useToast();

    const fetchRecords = async (page: number = 0, append: boolean = false) => {
        try {
            setIsLoading(true);
            setError(null);

            let response;

            // Search takes priority
            if (searchKeyword && searchKeyword.trim()) {
                response = await searchMedicalRecords(searchKeyword, page);
            }
            // Then category filter
            else if (category) {
                if (verifiedOnly) {
                    response = await getFilteredVerifiedRecords(page, category);
                } else {
                    response = await getFilteredRecords(page, category);
                }
            }
            // Default: all records or verified only
            else {
                if (verifiedOnly) {
                    response = await getVerifiedRecords(page);
                } else {
                    response = await getMedicalRecords(page);
                }
            }

            const newRecords = response.data;

            if (append) {
                setRecords(prev => [...prev, ...newRecords]);
            } else {
                setRecords(newRecords);
            }

            // Check if there are more records (if we got less than expected, no more)
            setHasMore(newRecords.length >= 10); // Assuming page size is 10
            setCurrentPage(page);

        } catch (err: any) {
            console.error("Error fetching records:", err);
            setError(err);

            toast({
                title: "Error Loading Records",
                description: err.message || "Failed to load medical records",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const refetch = async () => {
        await fetchRecords(0, false);
    };

    const loadMore = async () => {
        if (!hasMore || isLoading) return;
        await fetchRecords(currentPage + 1, true);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchRecords(0, false);
        }
    }, [verifiedOnly, category, searchKeyword]);

    return {
        records,
        isLoading,
        error,
        refetch,
        loadMore,
        hasMore,
        currentPage,
    };
}

/**
 * Hook to fetch a single record by ID
 */
export function useRecord(recordId: string | null) {
    const [record, setRecord] = useState<MedicalRecord | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!recordId) {
            setRecord(null);
            return;
        }

        const fetchRecord = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await getMedicalRecord(recordId);
                setRecord(response.data);
            } catch (err: any) {
                console.error("Error fetching record:", err);
                setError(err);

                toast({
                    title: "Error Loading Record",
                    description: err.message || "Failed to load record details",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecord();
    }, [recordId]);

    return { record, isLoading, error };
}

/**
 * Hook to get record statistics
 */
export function useRecordStats() {
    const { records, isLoading } = useRecords({ autoFetch: true });

    const stats = {
        total: records.length,
        verified: records.filter(r => r.verified).length,
        unverified: records.filter(r => !r.verified).length,
        byType: records.reduce((acc, record) => {
            const type = record.record_type || "Other";
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>),
    };

    return { stats, isLoading };
}