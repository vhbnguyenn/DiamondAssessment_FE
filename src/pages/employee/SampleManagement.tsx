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
  Shield,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface Sample {
  id: string;
  sampleId: string;
  customerName: string;
  status: "received" | "in_assessment" | "reassessed" | "returned";
  receivedDate: string;
  notes: string;
}

const SampleManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [samples, setSamples] = useState<Sample[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for sample management
  useEffect(() => {
    setIsLoading(true);
    const mockSamples: Sample[] = [
      {
        id: "SMP001",
        sampleId: "DIA-001",
        customerName: "John Doe",
        status: "received",
        receivedDate: "2025-07-20",
        notes: "1.5 carat diamond",
      },
      {
        id: "SMP002",
        sampleId: "DIA-002",
        customerName: "Alice Johnson",
        status: "in_assessment",
        receivedDate: "2025-07-21",
        notes: "0.8 carat diamond",
      },
      {
        id: "SMP003",
        sampleId: "DIA-003",
        customerName: "Bob Smith",
        status: "returned",
        receivedDate: "2025-07-19",
        notes: "Certified 2.0 carat",
      },
    ];
    setSamples(mockSamples);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      received: "bg-blue-100 text-blue-700 border border-blue-200",
      in_assessment: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      reassessed: "bg-purple-100 text-purple-700 border border-purple-200",
      returned: "bg-green-100 text-green-700 border border-green-200",
    };
    return colors[status] || colors.received;
  };

  const filteredSamples = samples.filter(
    (sample) =>
      sample.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.sampleId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReassess = (sampleId: string) => {
    setSamples((prev) =>
      prev.map((s) => (s.id === sampleId ? { ...s, status: "reassessed" } : s))
    );
    toast.success("Sample reassessed successfully!");
  };

  const handleReturn = (sampleId: string) => {
    setSamples((prev) =>
      prev.map((s) => (s.id === sampleId ? { ...s, status: "returned" } : s))
    );
    toast.success("Sample returned successfully!");
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Sample Management
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by customer or sample ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/70 border border-slate-200"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => setSamples((prev) => [...prev])} // Refresh mock data
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Diamond Samples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead>Sample ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredSamples.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No samples found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSamples.map((sample) => (
                  <TableRow key={sample.id} className="hover:bg-slate-50/50">
                    <TableCell>{sample.sampleId}</TableCell>
                    <TableCell>{sample.customerName}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(sample.status)}>
                        {sample.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(sample.receivedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{sample.notes}</TableCell>
                    <TableCell>
                      {sample.status === "received" && (
                        <Button
                          size="sm"
                          onClick={() => handleReassess(sample.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white mr-2"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Reassess
                        </Button>
                      )}
                      {sample.status === "in_assessment" && (
                        <Button
                          size="sm"
                          onClick={() => handleReturn(sample.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Return
                        </Button>
                      )}
                      {sample.status === "reassessed" && (
                        <Button
                          size="sm"
                          onClick={() => handleReturn(sample.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Return
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

export default SampleManagement;
