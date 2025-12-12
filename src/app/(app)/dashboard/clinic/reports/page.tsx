"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart } from "lucide-react";

export default function ClinicReportsPage() {
  const reports = [
    { name: "Monthly Performance Report", date: "January 2024", type: "Performance" },
    { name: "Patient Statistics Report", date: "Q4 2023", type: "Statistics" },
    { name: "Doctor Productivity Report", date: "December 2023", type: "Productivity" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">Generate and view clinic reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-primary" />
                {report.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {report.type} • {report.date}
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}