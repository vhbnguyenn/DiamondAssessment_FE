import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Package,
  Plus,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Eye,
  Trash2,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  MoreVertical,
  Star,
  MapPin,
  Phone,
  Mail,
  Diamond,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { Order, OrderStatus, PaymentStatus, OrderService } from "@/types";

const CustomerOrders: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data based on your types
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customerId: user?.id || "1",
      customer: {
        id: user?.id || "1",
        email: user?.email || "customer@diamond.com",
        role: "customer",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-15",
        isActive: true,
        firstName: "John",
        lastName: "Doe",
        phone: "+84 123 456 789",
        address: "123 Diamond Street, Ho Chi Minh City",
      },
      orderNumber: "DIA-2025-001",
      services: [
        {
          id: "1",
          serviceId: "1",
          serviceName: "Diamond Assessment",
          description: "Complete 4C analysis with certification",
          price: 2500000,
          quantity: 1,
        },
        {
          id: "2",
          serviceId: "2",
          serviceName: "Sealing Service",
          description: "Professional diamond sealing",
          price: 500000,
          quantity: 1,
        },
      ],
      totalAmount: 3000000,
      status: "in_progress",
      paymentStatus: "paid",
      orderDate: "2025-01-15",
      notes: "Rush order - customer needs results by Friday",
    },
    {
      id: "2",
      customerId: user?.id || "1",
      customer: {
        id: user?.id || "1",
        email: user?.email || "customer@diamond.com",
        role: "customer",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-15",
        isActive: true,
        firstName: "John",
        lastName: "Doe",
        phone: "+84 123 456 789",
        address: "123 Diamond Street, Ho Chi Minh City",
      },
      orderNumber: "DIA-2025-002",
      services: [
        {
          id: "3",
          serviceId: "3",
          serviceName: "Consultation Service",
          description: "Expert diamond consultation",
          price: 1000000,
          quantity: 1,
        },
      ],
      totalAmount: 1000000,
      status: "completed",
      paymentStatus: "paid",
      orderDate: "2025-01-10",
      completionDate: "2025-01-14",
    },
    {
      id: "3",
      customerId: user?.id || "1",
      customer: {
        id: user?.id || "1",
        email: user?.email || "customer@diamond.com",
        role: "customer",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-15",
        isActive: true,
        firstName: "John",
        lastName: "Doe",
        phone: "+84 123 456 789",
        address: "123 Diamond Street, Ho Chi Minh City",
      },
      orderNumber: "DIA-2025-003",
      services: [
        {
          id: "4",
          serviceId: "1",
          serviceName: "Diamond Assessment",
          description: "Standard diamond assessment",
          price: 2000000,
          quantity: 1,
        },
      ],
      totalAmount: 2000000,
      status: "submitted",
      paymentStatus: "pending",
      orderDate: "2025-01-20",
    },
  ]);

  const getOrderStatusColor = (status: OrderStatus) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700 border border-gray-200",
      submitted: "bg-blue-100 text-blue-700 border border-blue-200",
      confirmed: "bg-purple-100 text-purple-700 border border-purple-200",
      in_progress: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      completed: "bg-green-100 text-green-700 border border-green-200",
      cancelled: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.draft;
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colors = {
      pending: "bg-orange-100 text-orange-700 border border-orange-200",
      processing: "bg-blue-100 text-blue-700 border border-blue-200",
      paid: "bg-green-100 text-green-700 border border-green-200",
      failed: "bg-red-100 text-red-700 border border-red-200",
      refunded: "bg-gray-100 text-gray-700 border border-gray-200",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status: OrderStatus) => {
    const icons = {
      draft: FileText,
      submitted: Clock,
      confirmed: CheckCircle,
      in_progress: RefreshCw,
      completed: CheckCircle,
      cancelled: AlertCircle,
    };
    return icons[status] || FileText;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleDeleteOrder = async (orderId: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOrders(orders.filter((order) => order.id !== orderId));
      toast.success("Order deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPayment = (orderId: string) => {
    toast.info("Redirecting to payment gateway...");
    // Implement payment logic here
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.services.some((service) =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const StatsCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "from-blue-500 to-purple-500",
  }) => (
    <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-700">
          {title}
        </CardTitle>
        <div
          className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {value}
        </div>
        <p className="text-xs text-slate-600">{subtitle}</p>
      </CardContent>
    </Card>
  );

  const GradientButton = ({
    children,
    variant = "default",
    asChild,
    className = "",
    ...props
  }) => (
    <Button
      className={`${
        variant === "default"
          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
          : "bg-white/70 border border-slate-200 hover:bg-white/90 text-slate-700 hover:border-blue-300 shadow-md hover:shadow-lg transform hover:scale-105"
      } transition-all duration-300 font-medium ${className}`}
      asChild={asChild}
      {...props}
    >
      {children}
    </Button>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-slate-600 mt-2">
            Track and manage your diamond assessment orders
          </p>
        </div>
        <GradientButton asChild>
          <Link to="/dashboard/orders/new">
            <Plus className="mr-2 h-5 w-5" />
            New Order
          </Link>
        </GradientButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Orders"
          value={orders.length.toString()}
          subtitle="All time orders"
          icon={Package}
          color="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="In Progress"
          value={orders
            .filter((o) => o.status === "in_progress")
            .length.toString()}
          subtitle="Currently processing"
          icon={RefreshCw}
          color="from-yellow-500 to-orange-500"
        />
        <StatsCard
          title="Completed"
          value={orders
            .filter((o) => o.status === "completed")
            .length.toString()}
          subtitle="Successfully finished"
          icon={CheckCircle}
          color="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Total Spent"
          value={formatCurrency(
            orders.reduce((sum, order) => sum + order.totalAmount, 0)
          )}
          subtitle="Lifetime value"
          icon={DollarSign}
          color="from-purple-500 to-pink-500"
        />
      </div>

      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            <Filter className="h-5 w-5" />
            Filter Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-slate-700">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700">Order Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700">Payment Status</Label>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="All payments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700">Date Range</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="All dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                No orders found
              </h3>
              <p className="text-slate-500 text-center mb-6">
                {searchTerm || statusFilter !== "all" || paymentFilter !== "all"
                  ? "Try adjusting your filters to see more orders."
                  : "You haven't placed any orders yet. Create your first order to get started!"}
              </p>
              {!searchTerm &&
                statusFilter === "all" &&
                paymentFilter === "all" && (
                  <GradientButton asChild>
                    <Link to="/dashboard/orders/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Order
                    </Link>
                  </GradientButton>
                )}
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <Card
                key={order.id}
                className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                          <Diamond className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {order.orderNumber}
                          </CardTitle>
                          <CardDescription className="text-slate-600">
                            Ordered on{" "}
                            {new Date(order.orderDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge className={getOrderStatusColor(order.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {order.status
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                        <Badge
                          className={getPaymentStatusColor(order.paymentStatus)}
                        >
                          <CreditCard className="h-3 w-3 mr-1" />
                          {order.paymentStatus
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        {formatCurrency(order.totalAmount)}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white/95 backdrop-blur-md"
                        >
                          <DropdownMenuItem asChild>
                            <Link
                              to={`/dashboard/orders/${order.id}`}
                              className="cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {order.paymentStatus === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleProceedToPayment(order.id)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Proceed to Payment
                            </DropdownMenuItem>
                          )}
                          {order.status === "draft" && (
                            <DropdownMenuItem
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-3">
                        Services
                      </h4>
                      <div className="space-y-2">
                        {order.services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200/50"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-slate-800">
                                {service.serviceName}
                              </p>
                              <p className="text-sm text-slate-600">
                                {service.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-slate-800">
                                {formatCurrency(service.price)} ×{" "}
                                {service.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.completionDate && (
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="h-4 w-4" />
                          Completed on{" "}
                          {new Date(order.completionDate).toLocaleDateString()}
                        </div>
                        <GradientButton variant="outline" size="sm" asChild>
                          <Link to={`/dashboard/orders/${order.id}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </GradientButton>
                      </div>
                    )}

                    {order.paymentStatus === "pending" && (
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                        <div className="flex items-center gap-2 text-sm text-orange-600">
                          <AlertCircle className="h-4 w-4" />
                          Payment pending - Complete your payment to process
                          order
                        </div>
                        <GradientButton
                          asChild={false}
                          size="sm"
                          onClick={() => handleProceedToPayment(order.id)}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay Now
                        </GradientButton>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
