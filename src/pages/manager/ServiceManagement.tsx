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
  Wrench,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  status: "active" | "inactive" | "maintenance";
  description: string;
  lastUpdated: string;
}

const ServiceManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const mockServices: Service[] = [
      {
        id: "SVC001",
        name: "Diamond Assessment",
        status: "active",
        description: "Detailed diamond quality evaluation",
        lastUpdated: "2025-07-24",
      },
      {
        id: "SVC002",
        name: "Consultation Service",
        status: "maintenance",
        description: "Expert consultation for customers",
        lastUpdated: "2025-07-25",
      },
      {
        id: "SVC003",
        name: "Quality Certification",
        status: "inactive",
        description: "Official certification issuance",
        lastUpdated: "2025-07-23",
      },
    ];
    setServices(mockServices);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-700 border border-green-200",
      maintenance: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      inactive: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.active;
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (serviceId: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              status: service.status === "active" ? "inactive" : "active",
              lastUpdated: new Date().toISOString(),
            }
          : service
      )
    );
    toast.success("Service status updated successfully!");
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-once">
          Service Management
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by service name, description, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/80 border border-slate-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md transition-transform hover:scale-105"
            onClick={() => setServices((prev) => [...prev])}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-2xl">
            Service Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-slate-50/70">
                <TableHead className="text-left">Service ID</TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-left">Description</TableHead>
                <TableHead className="text-left">Last Updated</TableHead>
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
              ) : filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-gray-500"
                  >
                    No services found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow
                    key={service.id}
                    className="hover:bg-slate-100 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{service.id}</TableCell>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      {new Date(service.lastUpdated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleToggleStatus(service.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-md shadow-sm transition-transform hover:scale-105"
                      >
                        <Wrench className="mr-2 h-4 w-4" />
                        Toggle
                      </Button>
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

export default ServiceManagement;
