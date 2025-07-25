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
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

interface ConsultationRequest {
  id: string;
  customerName: string;
  requestType: "consultation" | "follow_up";
  status: "pending" | "in_progress" | "completed" | "overdue";
  requestDate: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "urgent";
}

const ConsultationRequests = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for consultation requests
  useEffect(() => {
    setIsLoading(true);
    const mockRequests: ConsultationRequest[] = [
      {
        id: "CRQ001",
        customerName: "John Doe",
        requestType: "consultation",
        status: "pending",
        requestDate: "2025-07-24",
        dueDate: "2025-07-27",
        priority: "medium",
      },
      {
        id: "CRQ002",
        customerName: "Alice Johnson",
        requestType: "follow_up",
        status: "in_progress",
        requestDate: "2025-07-25",
        dueDate: "2025-07-28",
        priority: "high",
      },
      {
        id: "CRQ003",
        customerName: "Bob Smith",
        requestType: "consultation",
        status: "overdue",
        requestDate: "2025-07-23",
        dueDate: "2025-07-26",
        priority: "urgent",
      },
    ];
    setRequests(mockRequests);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      in_progress: "bg-blue-100 text-blue-700 border border-blue-200",
      completed: "bg-green-100 text-green-700 border border-green-200",
      overdue: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.pending;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-700 border border-gray-200",
      medium: "bg-blue-100 text-blue-700 border border-blue-200",
      high: "bg-orange-100 text-orange-700 border border-orange-200",
      urgent: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[priority] || colors.low;
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartConsultation = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "in_progress" } : req
      )
    );
    toast.success("Consultation started successfully!");
  };

  const handleCompleteConsultation = (requestId: string) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "completed" } : req
      )
    );
    toast.success("Consultation completed successfully!");
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Consultation Requests
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by customer or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/70 border border-slate-200"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => setRequests((prev) => [...prev])} // Refresh mock data
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Pending Consultations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead>Request ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
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
              ) : filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No requests found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-slate-50/50">
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.customerName}</TableCell>
                    <TableCell>{request.requestType}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(request.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {request.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleStartConsultation(request.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white mr-2"
                        >
                          <Star className="mr-2 h-4 w-4" />
                          Start
                        </Button>
                      )}
                      {request.status === "in_progress" && (
                        <Button
                          size="sm"
                          onClick={() => handleCompleteConsultation(request.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete
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

export default ConsultationRequests;
