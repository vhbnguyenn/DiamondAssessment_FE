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
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

interface Communication {
  id: string;
  customerName: string;
  subject: string;
  status: "pending" | "responded" | "escalated";
  requestDate: string;
  lastMessage: string;
}

const Communications = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for communications
  useEffect(() => {
    setIsLoading(true);
    const mockCommunications: Communication[] = [
      {
        id: "COM001",
        customerName: "John Doe",
        subject: "Engagement Ring Consultation",
        status: "pending",
        requestDate: "2025-07-24",
        lastMessage: "Need advice on diamond selection.",
      },
      {
        id: "COM002",
        customerName: "Alice Johnson",
        subject: "Follow-up on Assessment",
        status: "responded",
        requestDate: "2025-07-25",
        lastMessage: "Response sent at 09:00 PM.",
      },
      {
        id: "COM003",
        customerName: "Bob Smith",
        subject: "Urgent Inquiry",
        status: "escalated",
        requestDate: "2025-07-23",
        lastMessage: "Escalated to manager.",
      },
    ];
    setCommunications(mockCommunications);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      responded: "bg-green-100 text-green-700 border border-green-200",
      escalated: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.pending;
  };

  const filteredCommunications = communications.filter(
    (comm) =>
      comm.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comm.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRespond = (communicationId: string) => {
    setCommunications((prev) =>
      prev.map((comm) =>
        comm.id === communicationId ? { ...comm, status: "responded" } : comm
      )
    );
    toast.success("Response sent successfully!");
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Communications
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by customer, subject, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/70 border border-slate-200"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => setCommunications((prev) => [...prev])} // Refresh mock data
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Customer Communications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead>Communication ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Last Message</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredCommunications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No communications found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCommunications.map((comm) => (
                  <TableRow key={comm.id} className="hover:bg-slate-50/50">
                    <TableCell>{comm.id}</TableCell>
                    <TableCell>{comm.customerName}</TableCell>
                    <TableCell>{comm.subject}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(comm.status)}>
                        {comm.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(comm.requestDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{comm.lastMessage}</TableCell>
                    <TableCell>
                      {comm.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleRespond(comm.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Respond
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

export default Communications;
