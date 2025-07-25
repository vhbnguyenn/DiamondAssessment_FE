import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  Microscope,
  Diamond,
  Users,
  Zap,
  Building,
  Shield,
  CreditCard,
  Banknote,
  ArrowLeft,
  FileText,
  Upload,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Package,
} from "lucide-react";
import { toast } from "sonner";

const OrderPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [orderForm, setOrderForm] = useState({
    // Customer Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    idCard: "",
    unitName: "",
    taxCode: "",

    serviceId: "",
    requestType: "assessment",
    specialRequirements: "",
    urgentDelivery: false,

    diamondCount: 1,
    estimatedValue: "",
    diamondDescription: "",

    deliveryMethod: "pickup",
    deliveryAddress: "",
    preferredDate: "",
    paymentMethod: "vnpay",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Service packages (matching your pricing page)
  const servicePackages = [
    {
      id: "basic-assessment",
      name: "Basic Assessment",
      description: "Essential gemstone authentication for individual items",
      basePrice: 150,
      category: "assessment",
      estimatedDuration: 5,
      features: [
        "Gemstone identification",
        "Basic authenticity verification",
        "Digital certificate",
        "Standard photography",
        "Email support",
        "5-7 business days delivery",
      ],
      color: "from-blue-500 to-cyan-500",
      icon: Microscope,
      isActive: true,
    },
    {
      id: "premium-certification",
      name: "Premium Certification",
      description: "Complete diamond grading with detailed 4C analysis",
      basePrice: 275,
      category: "certification",
      estimatedDuration: 7,
      features: [
        "Full 4C diamond grading",
        "Detailed laboratory analysis",
        "Professional photography",
        "Market value assessment",
        "Priority support",
        "7-10 business days delivery",
        "Insurance documentation",
        "QR code verification",
      ],
      popular: true,
      color: "from-purple-500 to-pink-500",
      icon: Diamond,
      isActive: true,
    },
    {
      id: "consultation-package",
      name: "Expert Consultation",
      description: "Professional guidance from certified gemologists",
      basePrice: 125,
      category: "consultation",
      estimatedDuration: 1,
      features: [
        "1-hour expert consultation",
        "Investment guidance",
        "Market analysis",
        "Purchase recommendations",
        "Educational session",
        "Follow-up support",
        "Video/phone session",
        "Written summary report",
      ],
      color: "from-emerald-500 to-teal-500",
      icon: Users,
      isActive: true,
    },
    {
      id: "express-service",
      name: "Express Service",
      description: "Fast-track processing for urgent requirements",
      basePrice: 350,
      category: "additional",
      estimatedDuration: 2,
      features: [
        "24-48 hour processing",
        "Priority handling",
        "Dedicated specialist",
        "Rush documentation",
        "Express shipping included",
        "24/7 customer support",
        "Real-time updates",
        "Emergency availability",
      ],
      color: "from-orange-500 to-red-500",
      icon: Zap,
      isActive: true,
    },
  ];

  const paymentMethods = [
    {
      method: "vnpay",
      name: "VNPay",
      description: "Secure online payment with Vietnamese banks",
      icon: CreditCard,
      processingTime: "Instant",
      fees: "2.5% + $0.30",
    },
    {
      method: "bank_transfer",
      name: "Bank Transfer",
      description: "Direct bank wire transfer",
      icon: Building,
      processingTime: "1-3 business days",
      fees: "No processing fees",
    },
    {
      method: "cash",
      name: "Cash Payment",
      description: "Pay in person at our office",
      icon: Banknote,
      processingTime: "Immediate",
      fees: "No additional fees",
    },
  ];

  // Get service from URL params or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId =
      urlParams.get("service") || localStorage.getItem("selectedService");

    if (serviceId) {
      const service = servicePackages.find((pkg) => pkg.id === serviceId);
      if (service) {
        setSelectedService(service);
        setOrderForm((prev) => ({ ...prev, serviceId: serviceId }));
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setOrderForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;

    let total = selectedService.basePrice * orderForm.diamondCount;

    // Add express delivery fee
    if (orderForm.urgentDelivery) {
      total += 50;
    }

    // Add payment processing fee for VNPay
    if (orderForm.paymentMethod === "vnpay") {
      total = total * 1.025 + 0.3;
    }

    return Math.round(total * 100) / 100;
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderData = {
        ...orderForm,
        serviceId: selectedService.id,
        totalPrice: calculateTotal(),
        orderDate: new Date().toISOString(),
        status: "pending",
      };

      console.log("Order submitted:", orderData);

      toast.success(
        "Order submitted successfully! You will be redirected to payment."
      );
    } catch (error) {
      console.error("Order submission failed:", error);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return selectedService !== null;
      case 2:
        return (
          orderForm.firstName &&
          orderForm.lastName &&
          orderForm.email &&
          orderForm.phone
        );
      case 3:
        return orderForm.diamondCount > 0;
      case 4:
        return orderForm.paymentMethod;
      default:
        return false;
    }
  };

  if (!selectedService && currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-slate-800">
              Select a Service
            </h1>
            <p className="text-xl text-slate-600">
              Choose the service you'd like to order
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {servicePackages.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-0"
                  onClick={() => {
                    setSelectedService(service);
                    setOrderForm((prev) => ({
                      ...prev,
                      serviceId: service.id,
                    }));
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${service.color} rounded-xl shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      {service.popular && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                    <div className="text-2xl font-bold text-blue-600">
                      ${service.basePrice}
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-4 
                    ${
                      currentStep > step
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-gray-200"
                    }
                  `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>Service</span>
            <span>Details</span>
            <span>Requirements</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: Service Confirmation */}
          {currentStep === 1 && selectedService && (
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedService(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle className="text-2xl">
                      Confirm Your Service
                    </CardTitle>
                    <CardDescription>
                      Review your selected service details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <div
                    className={`p-4 bg-gradient-to-br ${selectedService.color} rounded-xl shadow-lg`}
                  >
                    <selectedService.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                      {selectedService.name}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {selectedService.description}
                    </p>
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      ${selectedService.basePrice}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          Included Features:
                        </h4>
                        <ul className="space-y-1">
                          {selectedService.features
                            .slice(0, 4)
                            .map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="h-3 w-3 text-emerald-500" />
                                {feature}
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                          <Clock className="h-4 w-4" />
                          {selectedService.estimatedDuration === 1
                            ? "1 hour"
                            : `${selectedService.estimatedDuration} business days`}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Package className="h-4 w-4" />
                          {selectedService.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleNextStep} disabled={!isStepValid(1)}>
                    Continue to Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Customer Information */}
          {currentStep === 2 && (
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <User className="h-6 w-6" />
                  Customer Information
                </CardTitle>
                <CardDescription>
                  Please provide your contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={orderForm.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={orderForm.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={orderForm.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={orderForm.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+84 xxx xxx xxx"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Textarea
                      id="address"
                      className="pl-10"
                      value={orderForm.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Your full address"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="idCard">ID Card Number</Label>
                    <Input
                      id="idCard"
                      value={orderForm.idCard}
                      onChange={(e) =>
                        handleInputChange("idCard", e.target.value)
                      }
                      placeholder="Your ID card number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxCode">Tax Code (Optional)</Label>
                    <Input
                      id="taxCode"
                      value={orderForm.taxCode}
                      onChange={(e) =>
                        handleInputChange("taxCode", e.target.value)
                      }
                      placeholder="Company tax code"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="unitName">
                    Company/Organization Name (Optional)
                  </Label>
                  <Input
                    id="unitName"
                    value={orderForm.unitName}
                    onChange={(e) =>
                      handleInputChange("unitName", e.target.value)
                    }
                    placeholder="Your company or organization name"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={!isStepValid(2)}>
                    Continue to Requirements
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Service Requirements */}
          {currentStep === 3 && (
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Service Requirements
                </CardTitle>
                <CardDescription>
                  Specify your requirements and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="diamondCount">Number of Items *</Label>
                    <Input
                      id="diamondCount"
                      type="number"
                      min="1"
                      value={orderForm.diamondCount}
                      onChange={(e) =>
                        handleInputChange(
                          "diamondCount",
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedValue">
                      Estimated Value (USD)
                    </Label>
                    <Input
                      id="estimatedValue"
                      value={orderForm.estimatedValue}
                      onChange={(e) =>
                        handleInputChange("estimatedValue", e.target.value)
                      }
                      placeholder="Approximate value"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="diamondDescription">Item Description</Label>
                  <Textarea
                    id="diamondDescription"
                    value={orderForm.diamondDescription}
                    onChange={(e) =>
                      handleInputChange("diamondDescription", e.target.value)
                    }
                    placeholder="Describe your diamond/gemstone (size, color, any special characteristics)"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="specialRequirements">
                    Special Requirements
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    value={orderForm.specialRequirements}
                    onChange={(e) =>
                      handleInputChange("specialRequirements", e.target.value)
                    }
                    placeholder="Any special instructions or requirements"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="urgentDelivery"
                      checked={orderForm.urgentDelivery}
                      onChange={(e) =>
                        handleInputChange("urgentDelivery", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <Label
                      htmlFor="urgentDelivery"
                      className="flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4 text-orange-500" />
                      Express Delivery (+$50)
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="deliveryMethod">Delivery Method</Label>
                  <select
                    id="deliveryMethod"
                    value={orderForm.deliveryMethod}
                    onChange={(e) =>
                      handleInputChange("deliveryMethod", e.target.value)
                    }
                    className="bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2 w-full"
                  >
                    <option value="pickup">Pickup at Office</option>
                    <option value="delivery">Home Delivery</option>
                    <option value="express">Express Delivery</option>
                  </select>
                </div>

                {orderForm.deliveryMethod !== "pickup" && (
                  <div>
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={orderForm.deliveryAddress}
                      onChange={(e) =>
                        handleInputChange("deliveryAddress", e.target.value)
                      }
                      placeholder="Full delivery address"
                      rows={3}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="preferredDate">Preferred Service Date</Label>
                  <div className="relative">
                    <Calendar className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      id="preferredDate"
                      type="date"
                      className="pl-10"
                      value={orderForm.preferredDate}
                      onChange={(e) =>
                        handleInputChange("preferredDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} disabled={!isStepValid(3)}>
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Payment & Summary */}
          {currentStep === 4 && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>
                        {selectedService.name} × {orderForm.diamondCount}
                      </span>
                      <span>
                        ${selectedService.basePrice * orderForm.diamondCount}
                      </span>
                    </div>

                    {orderForm.urgentDelivery && (
                      <div className="flex justify-between items-center text-orange-600">
                        <span>Express Delivery</span>
                        <span>+$50</span>
                      </div>
                    )}

                    {orderForm.paymentMethod === "vnpay" && (
                      <div className="flex justify-between items-center text-slate-500 text-sm">
                        <span>Payment Processing Fee</span>
                        <span>2.5% + $0.30</span>
                      </div>
                    )}

                    <Separator />
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">${calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Payment Method</CardTitle>
                  <CardDescription>
                    Choose your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.method}
                          className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                            orderForm.paymentMethod === method.method
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() =>
                            handleInputChange("paymentMethod", method.method)
                          }
                        >
                          <div className="flex items-center gap-4">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{method.name}</h3>
                              <p className="text-sm text-slate-600">
                                {method.description}
                              </p>
                              <div className="flex gap-4 text-xs text-slate-500 mt-1">
                                <span>Processing: {method.processingTime}</span>
                                <span>Fees: {method.fees}</span>
                              </div>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                orderForm.paymentMethod === method.method
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {orderForm.paymentMethod === method.method && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={!isStepValid(4) || isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isSubmitting
                        ? "Processing..."
                        : `Pay $${calculateTotal()}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
