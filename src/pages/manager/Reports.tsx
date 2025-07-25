import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, LineChart, RefreshCw, FileDown, Clock } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  type: string;
  period: string;
  generatedDate: string;
  status: "ready" | "generating";
}

const Reports = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const mockReports: Report[] = [
      {
        id: "RPT001",
        type: "Revenue Summary",
        period: "July 2025",
        generatedDate: "2025-07-25",
        status: "ready",
      },
      {
        id: "RPT002",
        type: "Assessment Stats",
        period: "Q3 2025",
        generatedDate: "2025-07-25",
        status: "generating",
      },
      {
        id: "RPT003",
        type: "Staff Performance",
        period: "June 2025",
        generatedDate: "2025-07-24",
        status: "ready",
      },
    ];
    setReports(mockReports);
    setIsLoading(false);
  }, []);

  const filteredReports = reports.filter(
    (report) =>
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: "generating" } : report
      )
    );
    toast.success("Report generation started!");
    setTimeout(() => {
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "ready",
                generatedDate: new Date().toISOString(),
              }
            : report
        )
      );
      toast.success("Report generated successfully!");
    }, 2000); // Simulate report generation delay
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-once">
          Reports
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by report type, period, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/80 border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-transform hover:scale-105"
            onClick={() => setReports((prev) => [...prev])}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-2xl">
            Report Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-slate-50/70">
                <TableHead className="text-left">Report ID</TableHead>
                <TableHead className="text-left">Type</TableHead>
                <TableHead className="text-left">Period</TableHead>
                <TableHead className="text-left">Generated Date</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-left">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <div className="animate-spin">
                      <Clock className="h-8 w-8 text-gray-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-gray-500"
                  >
                    No reports found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="hover:bg-slate-100 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>
                      {new Date(report.generatedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {report.status === "generating" ? (
                        <Badge className="bg-blue-100 text-blue-700 border border-blue-200 animate-pulse">
                          Generating
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 border border-green-200">
                          Ready
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {report.status === "ready" ? (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                          disabled
                        >
                          <FileDown className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleGenerateReport(report.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                        >
                          <BarChart className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
