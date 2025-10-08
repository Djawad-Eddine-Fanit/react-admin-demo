"use client";

import { useState } from "react";
import { utils, write } from "xlsx";
import { toast } from "@/components/ui/toast";

export function useExportToCSV() {
  const [isExporting, setIsExporting] = useState(false);

  async function exportToCSV(data: any[], fileName: string) {
    if (!data?.length) {
      return toast({
        title: "⚠️ No data to export",
        description: "Please add some data before exporting.",
      });
    }

    setIsExporting(true);

    toast({
      title: "⏳ Preparing file...",
      description: "Generating CSV data...",
    });

    try {
      // Convert data to worksheet
      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Data");

      // Create blob (asynchronous export)
      const blob = write(workbook, { bookType: "csv", type: "array" });
      const blobURL = window.URL.createObjectURL(new Blob([blob]));

      // Trigger download
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = `${fileName}.csv`;
      link.click();
      window.URL.revokeObjectURL(blobURL);

      setTimeout(() => {
        toast({
          title: "✅ Export successful!",
          description: `File "${fileName}.csv" has been downloaded.`,
        });
      }, 5000);
    } catch (err: any) {
      console.error("CSV Export Error:", err);
      toast({
        title: "❌ Export failed",
        description: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsExporting(false);
    }
  }

  return { exportToCSV, isExporting };
}
