import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  orderDate: string;
  paymentDate?: string;
}

const CustomerPaymentsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for payments
  useEffect(() => {
    setIsLoading(true);
    const mockPayments: Payment[] = [
      {
        id: "PAY001",
        orderId: "ORD001",
        customerName: "John Doe",
        amount: 15000000,
        status: "pending",
        orderDate: "2025-07-24",
      },
      {
        id: "PAY002",
        orderId: "ORD002",
        customerName: "Alice Johnson",
        amount: 25000000,
        status: "processing",
        orderDate: "2025-07-25",
        paymentDate: "2025-07-25T22:00:00Z",
      },
      {
        id: "PAY003",
        orderId: "ORD003",
        customerName: "Bob Smith",
        amount: 30000000,
        status: "completed",
        orderDate: "2025-07-23",
        paymentDate: "2025-07-24T14:30:00Z",
      },
    ];
    setPayments(mockPayments);
    setIsLoading(false);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      processing: "bg-blue-100 text-blue-700 border border-blue-200",
      completed: "bg-green-100 text-green-700 border border-green-200",
      failed: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.pending;
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInitiatePayment = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((pay) =>
        pay.id === paymentId ? { ...pay, status: "processing" } : pay
      )
    );
    toast.success("Payment initiated. Redirecting to VNPAY...");
    // In a real app, this would redirect to VNPAY gateway
    setTimeout(() => {
      setPayments((prev) =>
        prev.map((pay) =>
          pay.id === paymentId
            ? {
                ...pay,
                status: "completed",
                paymentDate: new Date().toISOString(),
              }
            : pay
        )
      );
      toast.success("Payment completed successfully!");
    }, 2000); // Simulate payment processing delay
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Payment Management
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search by customer, order ID, or payment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-white/70 border border-slate-200"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => setPayments((prev) => [...prev])} // Refresh mock data
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead>Payment ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No payments found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-slate-50/50">
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.orderId}</TableCell>
                    <TableCell>{payment.customerName}</TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(payment.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {payment.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleInitiatePayment(payment.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay Now
                        </Button>
                      )}
                      {payment.status === "processing" && (
                        <Progress value={50} className="h-6 w-24" />
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

export default CustomerPaymentsPage;
