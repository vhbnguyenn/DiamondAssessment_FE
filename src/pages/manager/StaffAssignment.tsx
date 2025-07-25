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
  UserPlus,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface Assignment {
  id: string;
  staffName: string;
  task: string;
  status: "pending" | "assigned" | "completed";
  assignedDate?: string;
}

const StaffAssignment = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const mockAssignments: Assignment[] = [
      {
        id: "ASN001",
        staffName: "Nguyen Van A",
        task: "Diamond Assessment",
        status: "pending",
      },
      {
        id: "ASN002",
        staffName: "Tran Thi B",
        task: "Customer Consultation",
        status: "assigned",
        assignedDate: "2025-07-24",
      },
      {
        id: "ASN003",
        staffName: "Le Van C",
        task: "Quality Check",
        status: "completed",
        assignedDate: "2025-07-23",
      },
    ];
    setAssignments(mockAssignments);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      assigned: "bg-blue-100 text-blue-700 border border-blue-200",
      completed: "bg-green-100 text-green-700 border border-green-200",
    };
    return colors[status] || colors.pending;
  };

  const filteredAssignments = assignments.filter(
    (assign) =>
      assign.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assign.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assign.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignStaff = (assignId: string) => {
    setAssignments((prev) =>
      prev.map((assign) =>
        assign.id === assignId
          ? {
              ...assign,
              status: "assigned",
              assignedDate: new Date().toISOString(),
            }
          : assign
      )
    );
    toast.success("Staff assigned successfully!");
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-once">
          Staff Assignment
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by staff name, task, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/80 border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-transform hover:scale-105"
            onClick={() => setAssignments((prev) => [...prev])}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-2xl">
            Task Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-slate-50/70">
                <TableHead className="text-left">Assignment ID</TableHead>
                <TableHead className="text-left">Staff Name</TableHead>
                <TableHead className="text-left">Task</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-left">Assigned Date</TableHead>
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
              ) : filteredAssignments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-gray-500"
                  >
                    No assignments found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAssignments.map((assign) => (
                  <TableRow
                    key={assign.id}
                    className="hover:bg-slate-100 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{assign.id}</TableCell>
                    <TableCell>{assign.staffName}</TableCell>
                    <TableCell>{assign.task}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(assign.status)}>
                        {assign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {assign.assignedDate
                        ? new Date(assign.assignedDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {assign.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleAssignStaff(assign.id)}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign
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

export default StaffAssignment;
