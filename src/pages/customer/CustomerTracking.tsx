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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  MessageCircle,
  Star,
  Diamond,
  Eye,
  Truck,
  Shield,
  Award,
  Activity,
  ArrowRight,
  RefreshCw,
  QrCode,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type {
  Order,
  OrderStatus,
  PaymentStatus,
  DiamondAssessmentRequest,
  AssessmentStatus,
  AssessmentResult,
  Certificate,
  DiamondParameters,
} from "@/types";

const CustomerTracking: React.FC = () => {
  const { user } = useAuth();
  const [trackingCode, setTrackingCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<{
    order?: Order;
    assessment?: DiamondAssessmentRequest;
    certificate?: Certificate;
  } | null>(null);

  // Mock data
  const mockOrders: Order[] = [
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
      ],
      totalAmount: 2500000,
      status: "in_progress",
      paymentStatus: "paid",
      orderDate: "2025-01-15",
    },
  ];

  const mockAssessments: DiamondAssessmentRequest[] = [
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
      sampleCode: "SAM-2025-001",
      requestDate: "2025-01-15",
      status: "in_progress",
      notes: "Rush assessment required",
      assignedStaffId: "staff1",
      assignedStaff: {
        id: "staff1",
        email: "assessor@diamond.com",
        role: "assessment_staff",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-15",
        isActive: true,
        employeeId: "EMP001",
        firstName: "Jane",
        lastName: "Smith",
        department: "assessment",
        position: "Senior Diamond Assessor",
        hireDate: "2023-01-01",
      },
      result: {
        id: "1",
        requestId: "1",
        diamondParameters: {
          carat: 1.25,
          cut: "excellent",
          color: "G",
          clarity: "VS1",
          shape: "round",
          measurements: {
            length: 6.95,
            width: 6.93,
            depth: 4.24,
          },
          polish: "excellent",
          symmetry: "excellent",
          fluorescence: "none",
        },
        assessedBy: "Jane Smith",
        assessedAt: "2025-01-18",
        qualityGrade: "Premium",
        estimatedValue: 85000000,
        notes: "Exceptional quality diamond with superior characteristics",
      },
    },
  ];

  const mockCertificate: Certificate = {
    id: "1",
    resultId: "1",
    certificateNumber: "CERT-2025-001",
    issueDate: "2025-01-19",
    status: "issued",
    digitalSignature: "abc123def456",
    qrCode: "https://verify.diamond.com/cert/CERT-2025-001",
    pdfUrl: "/certificates/CERT-2025-001.pdf",
  };

  const handleTracking = async () => {
    if (!trackingCode.trim()) {
      toast.error("Please enter a tracking code");
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Find matching order or assessment
      const order = mockOrders.find(
        (o) => o.orderNumber.toLowerCase() === trackingCode.toLowerCase()
      );
      const assessment = mockAssessments.find(
        (a) => a.sampleCode.toLowerCase() === trackingCode.toLowerCase()
      );

      if (order || assessment) {
        setTrackingResult({
          order,
          assessment,
          certificate: assessment ? mockCertificate : undefined,
        });
        toast.success("Tracking information found!");
      } else {
        setTrackingResult(null);
        toast.error("No tracking information found for this code");
      }
    } catch (error) {
      toast.error("Failed to retrieve tracking information");
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderProgress = (status: OrderStatus) => {
    const progressMap = {
      draft: 10,
      submitted: 25,
      confirmed: 40,
      in_progress: 70,
      completed: 100,
      cancelled: 0,
    };
    return progressMap[status] || 0;
  };

  const getAssessmentProgress = (status: AssessmentStatus) => {
    const progressMap = {
      submitted: 15,
      received: 30,
      in_progress: 60,
      quality_check: 85,
      completed: 100,
      returned: 100,
      cancelled: 0,
    };
    return progressMap[status] || 0;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-700 border border-gray-200",
      submitted: "bg-blue-100 text-blue-700 border border-blue-200",
      received: "bg-purple-100 text-purple-700 border border-purple-200",
      confirmed: "bg-purple-100 text-purple-700 border border-purple-200",
      in_progress: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      quality_check: "bg-orange-100 text-orange-700 border border-orange-200",
      completed: "bg-green-100 text-green-700 border border-green-200",
      returned: "bg-green-100 text-green-700 border border-green-200",
      cancelled: "bg-red-100 text-red-700 border border-red-200",
      paid: "bg-green-100 text-green-700 border border-green-200",
      pending: "bg-orange-100 text-orange-700 border border-orange-200",
    };
    return colors[status] || colors.draft;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const OrderTimeline = ({ order }: { order: Order }) => {
    const steps = [
      {
        key: "submitted",
        label: "Order Placed",
        icon: FileText,
        completed: true,
      },
      {
        key: "confirmed",
        label: "Payment Confirmed",
        icon: CheckCircle,
        completed: true,
      },
      {
        key: "in_progress",
        label: "Processing",
        icon: RefreshCw,
        completed:
          order.status === "in_progress" || order.status === "completed",
      },
      {
        key: "completed",
        label: "Completed",
        icon: Award,
        completed: order.status === "completed",
      },
    ];

    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.completed
                  ? "bg-green-100 border-green-500 text-green-600"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  step.completed ? "text-green-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
              {index < steps.length - 1 && (
                <div
                  className={`w-px h-8 ml-5 mt-2 ${
                    step.completed ? "bg-green-200" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            {step.completed && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const AssessmentTimeline = ({
    assessment,
  }: {
    assessment: DiamondAssessmentRequest;
  }) => {
    const steps = [
      {
        key: "submitted",
        label: "Request Submitted",
        icon: FileText,
        completed: true,
      },
      {
        key: "received",
        label: "Sample Received",
        icon: Package,
        completed: true,
      },
      {
        key: "in_progress",
        label: "Assessment in Progress",
        icon: Activity,
        completed:
          assessment.status === "in_progress" ||
          assessment.status === "quality_check" ||
          assessment.status === "completed",
      },
      {
        key: "quality_check",
        label: "Quality Check",
        icon: Shield,
        completed:
          assessment.status === "quality_check" ||
          assessment.status === "completed",
      },
      {
        key: "completed",
        label: "Certificate Issued",
        icon: Award,
        completed: assessment.status === "completed",
      },
    ];

    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step.completed
                  ? "bg-blue-100 border-blue-500 text-blue-600"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  step.completed ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
              {index < steps.length - 1 && (
                <div
                  className={`w-px h-8 ml-5 mt-2 ${
                    step.completed ? "bg-blue-200" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            {step.completed && (
              <CheckCircle className="w-5 h-5 text-blue-500" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const DiamondDetails = ({
    parameters,
  }: {
    parameters: DiamondParameters;
  }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
        <p className="text-2xl font-bold text-blue-600">{parameters.carat}</p>
        <p className="text-sm text-slate-600">Carat</p>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200/50">
        <p className="text-2xl font-bold text-purple-600">{parameters.cut}</p>
        <p className="text-sm text-slate-600">Cut</p>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-lg border border-pink-200/50">
        <p className="text-2xl font-bold text-pink-600">{parameters.color}</p>
        <p className="text-sm text-slate-600">Color</p>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200/50">
        <p className="text-2xl font-bold text-green-600">
          {parameters.clarity}
        </p>
        <p className="text-sm text-slate-600">Clarity</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Track Your Order
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Enter your order number or sample code to track the progress of your
          diamond assessment and certification
        </p>
      </div>

      {/* Tracking Input */}
      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            <Search className="h-6 w-6" />
            Enter Tracking Information
          </CardTitle>
          <CardDescription>
            Use your order number (e.g., DIA-2025-001) or sample code (e.g.,
            SAM-2025-001)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking-code" className="text-slate-700">
              Tracking Code
            </Label>
            <Input
              id="tracking-code"
              placeholder="Enter order number or sample code..."
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              onKeyPress={(e) => e.key === "Enter" && handleTracking()}
            />
          </div>
          <Button
            onClick={handleTracking}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Tracking...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Track Order
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Tracking Results */}
      {trackingResult && (
        <div className="space-y-6">
          <Tabs
            defaultValue={trackingResult.order ? "order" : "assessment"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-md">
              {trackingResult.order && (
                <TabsTrigger
                  value="order"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Order Tracking
                </TabsTrigger>
              )}
              {trackingResult.assessment && (
                <TabsTrigger
                  value="assessment"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Assessment Tracking
                </TabsTrigger>
              )}
            </TabsList>

            {/* Order Tracking Tab */}
            {trackingResult.order && (
              <TabsContent value="order" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                            <Package className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                              {trackingResult.order.orderNumber}
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                              Ordered on{" "}
                              {new Date(
                                trackingResult.order.orderDate
                              ).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge
                            className={getStatusColor(
                              trackingResult.order.status
                            )}
                          >
                            {trackingResult.order.status
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                          <Badge
                            className={getStatusColor(
                              trackingResult.order.paymentStatus
                            )}
                          >
                            Payment:{" "}
                            {trackingResult.order.paymentStatus.replace(
                              /\b\w/g,
                              (l) => l.toUpperCase()
                            )}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                          {formatCurrency(trackingResult.order.totalAmount)}
                        </p>
                        <p className="text-sm text-slate-600">Total Amount</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium text-slate-800">
                          {getOrderProgress(trackingResult.order.status)}%
                        </span>
                      </div>
                      <Progress
                        value={getOrderProgress(trackingResult.order.status)}
                        className="h-3 bg-slate-100"
                      />
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-4">
                        Order Timeline
                      </h4>
                      <OrderTimeline order={trackingResult.order} />
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-3">
                        Services
                      </h4>
                      <div className="space-y-2">
                        {trackingResult.order.services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200/50"
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
                                {formatCurrency(service.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Assessment Tracking Tab */}
            {trackingResult.assessment && (
              <TabsContent value="assessment" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                            <Diamond className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                              {trackingResult.assessment.sampleCode}
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                              Submitted on{" "}
                              {new Date(
                                trackingResult.assessment.requestDate
                              ).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>

                        <Badge
                          className={getStatusColor(
                            trackingResult.assessment.status
                          )}
                        >
                          {trackingResult.assessment.status
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </div>

                      {trackingResult.assessment.result && (
                        <div className="text-right">
                          <p className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {formatCurrency(
                              trackingResult.assessment.result.estimatedValue
                            )}
                          </p>
                          <p className="text-sm text-slate-600">
                            Estimated Value
                          </p>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          Assessment Progress
                        </span>
                        <span className="font-medium text-slate-800">
                          {getAssessmentProgress(
                            trackingResult.assessment.status
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={getAssessmentProgress(
                          trackingResult.assessment.status
                        )}
                        className="h-3 bg-slate-100"
                      />
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-4">
                        Assessment Timeline
                      </h4>
                      <AssessmentTimeline
                        assessment={trackingResult.assessment}
                      />
                    </div>

                    {/* Assigned Staff */}
                    {trackingResult.assessment.assignedStaff && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
                        <h4 className="font-semibold text-slate-700 mb-2">
                          Assigned Assessor
                        </h4>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">
                              {
                                trackingResult.assessment.assignedStaff
                                  .firstName
                              }{" "}
                              {trackingResult.assessment.assignedStaff.lastName}
                            </p>
                            <p className="text-sm text-slate-600">
                              {trackingResult.assessment.assignedStaff.position}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Diamond Details */}
                    {trackingResult.assessment.result && (
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-4">
                          Diamond Assessment Results
                        </h4>
                        <DiamondDetails
                          parameters={
                            trackingResult.assessment.result.diamondParameters
                          }
                        />

                        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-green-800">
                                Quality Grade
                              </p>
                              <p className="text-2xl font-bold text-green-600">
                                {trackingResult.assessment.result.qualityGrade}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                              <Star className="h-5 w-5 text-yellow-500 fill-current" />
                            </div>
                          </div>
                          {trackingResult.assessment.result.notes && (
                            <p className="text-sm text-green-700 mt-2">
                              {trackingResult.assessment.result.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Certificate */}
                    {trackingResult.certificate &&
                      trackingResult.certificate.status === "issued" && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-slate-700 mb-2">
                                Certificate Ready
                              </h4>
                              <p className="text-sm text-slate-600 mb-3">
                                Certificate Number:{" "}
                                <span className="font-mono text-slate-800">
                                  {trackingResult.certificate.certificateNumber}
                                </span>
                              </p>
                              <p className="text-sm text-slate-600">
                                Issued on{" "}
                                {new Date(
                                  trackingResult.certificate.issueDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={trackingResult.certificate.qrCode}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <QrCode className="mr-2 h-4 w-4" />
                                  Verify
                                </a>
                              </Button>
                              {trackingResult.certificate.pdfUrl && (
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                  asChild
                                >
                                  <a
                                    href={trackingResult.certificate.pdfUrl}
                                    download
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>

          {/* Support Section */}
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <MessageCircle className="h-5 w-5" />
                Need Help?
              </CardTitle>
              <CardDescription>
                Our support team is here to assist you with any questions about
                your order or assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
                asChild
              >
                <Link to="/dashboard/chat">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  <div className="text-center">
                    <p className="font-medium">Live Chat</p>
                    <p className="text-xs text-slate-600">Get instant help</p>
                  </div>
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 hover:bg-green-50 hover:border-green-300"
                asChild
              >
                <a href="tel:+84123456789">
                  <Phone className="h-6 w-6 text-green-600" />
                  <div className="text-center">
                    <p className="font-medium">Call Support</p>
                    <p className="text-xs text-slate-600">+84 123 456 789</p>
                  </div>
                </a>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
                asChild
              >
                <a href="mailto:support@diamond.com">
                  <Mail className="h-6 w-6 text-purple-600" />
                  <div className="text-center">
                    <p className="font-medium">Email Us</p>
                    <p className="text-xs text-slate-600">
                      support@diamond.com
                    </p>
                  </div>
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Access */}
      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Quick Access
          </CardTitle>
          <CardDescription className="text-center">
            Frequently used tracking codes for quick access
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-auto p-4 justify-start hover:bg-blue-50 hover:border-blue-300"
            onClick={() => setTrackingCode("DIA-2025-001")}
          >
            <Package className="mr-3 h-5 w-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">Order DIA-2025-001</p>
              <p className="text-xs text-slate-600">Diamond Assessment</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-4 justify-start hover:bg-purple-50 hover:border-purple-300"
            onClick={() => setTrackingCode("SAM-2025-001")}
          >
            <Diamond className="mr-3 h-5 w-5 text-purple-600" />
            <div className="text-left">
              <p className="font-medium">Sample SAM-2025-001</p>
              <p className="text-xs text-slate-600">Assessment Results Ready</p>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerTracking;
