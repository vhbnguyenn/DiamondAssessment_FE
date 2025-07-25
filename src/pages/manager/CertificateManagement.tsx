import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  sampleId: string;
  customerName: string;
  status: "pending" | "issued" | "revoked";
  issueDate?: string;
  certificateNumber: string;
}

const CertificateManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const mockCertificates: Certificate[] = [
      {
        id: "CERT001",
        sampleId: "DIA-001",
        customerName: "John Doe",
        status: "pending",
        certificateNumber: "CERT-2025-001",
      },
      {
        id: "CERT002",
        sampleId: "DIA-002",
        customerName: "Alice Johnson",
        status: "issued",
        issueDate: "2025-07-24",
        certificateNumber: "CERT-2025-002",
      },
      {
        id: "CERT003",
        sampleId: "DIA-003",
        customerName: "Bob Smith",
        status: "revoked",
        issueDate: "2025-07-23",
        certificateNumber: "CERT-2025-003",
      },
    ];
    setCertificates(mockCertificates);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      issued: "bg-green-100 text-green-700 border border-green-200",
      revoked: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.pending;
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueCertificate = (certId: string) => {
    setCertificates((prev) =>
      prev.map((cert) =>
        cert.id === certId
          ? { ...cert, status: "issued", issueDate: new Date().toISOString() }
          : cert
      )
    );
    toast.success("Certificate issued successfully!");
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-once">
          Certificate Management
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by customer, sample ID, or certificate number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/80 border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-transform hover:scale-105"
            onClick={() => setCertificates((prev) => [...prev])}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-2xl">
            Certificate Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-slate-50/70">
                <TableHead className="text-left">Certificate ID</TableHead>
                <TableHead className="text-left">Sample ID</TableHead>
                <TableHead className="text-left">Customer</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-left">Issue Date</TableHead>
                <TableHead className="text-left">Certificate Number</TableHead>
                <TableHead className="text-left">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    <div className="animate-spin">
                      <Clock className="h-8 w-8 text-gray-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredCertificates.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-4 text-gray-500"
                  >
                    No certificates found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCertificates.map((cert) => (
                  <TableRow
                    key={cert.id}
                    className="hover:bg-slate-100 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{cert.id}</TableCell>
                    <TableCell>{cert.sampleId}</TableCell>
                    <TableCell>{cert.customerName}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(cert.status)}>
                        {cert.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {cert.issueDate
                        ? new Date(cert.issueDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>{cert.certificateNumber}</TableCell>
                    <TableCell>
                      {cert.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleIssueCertificate(cert.id)}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Issue
                        </Button>
                      )}
                      {cert.status === "issued" && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                          disabled
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
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

export default CertificateManagement;
