import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Microscope,
  Award,
  Users,
  Zap,
  ArrowRight,
  Diamond,
  Sparkles,
  Shield,
  Star,
  CreditCard,
  Banknote,
  Building,
  Eye,
  FileText,
  TrendingUp,
  X,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";

// Types based on the provided interfaces
interface ServicePackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: "assessment" | "consultation" | "certification" | "additional";
  estimatedDuration: number;
  features: string[];
  popular?: boolean;
  color: string;
  icon: any;
  isActive: boolean;
}

interface PaymentMethod {
  method: "vnpay" | "bank_transfer" | "cash";
  name: string;
  description: string;
  icon: any;
  processingTime: string;
  fees: string;
}

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Service packages based on Service interface
  const servicePackages: ServicePackage[] = [
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
    {
      id: "enterprise-solution",
      name: "Enterprise Solution",
      description: "Bulk processing and custom solutions for businesses",
      basePrice: 500,
      category: "additional",
      estimatedDuration: 14,
      features: [
        "Volume discounts available",
        "Custom reporting",
        "API access",
        "Dedicated account manager",
        "Training sessions",
        "Custom workflows",
        "Integration support",
        "SLA guarantees",
      ],
      color: "from-indigo-500 to-purple-500",
      icon: Building,
      isActive: true,
    },
    {
      id: "verification-service",
      name: "Certificate Verification",
      description: "Authenticate existing certificates from other labs",
      basePrice: 75,
      category: "additional",
      estimatedDuration: 3,
      features: [
        "Certificate authenticity check",
        "Cross-reference verification",
        "Fraud detection analysis",
        "Comparison report",
        "Digital verification badge",
        "Quick turnaround",
        "Security validation",
        "Expert review",
      ],
      color: "from-rose-500 to-pink-500",
      icon: Shield,
      isActive: true,
    },
  ];

  // Payment methods based on Payment interface
  const paymentMethods: PaymentMethod[] = [
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

  const categories = [
    "all",
    "assessment",
    "certification",
    "consultation",
    "additional",
  ];

  const filteredPackages =
    selectedCategory === "all"
      ? servicePackages
      : servicePackages.filter((pkg) => pkg.category === selectedCategory);

  const getDiscountedPrice = (basePrice: number) => {
    return billingCycle === "annual" ? Math.round(basePrice * 0.85) : basePrice;
  };

  const navigate = useNavigate();
  const Link = ({ to, children, className }) => (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        navigate(to);
        e.preventDefault();
      }}
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header Section */}
      <Header />
      <section className="relative z-10 ">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Professional gemstone services with clear, upfront pricing. No
              hidden fees, no surprises. Choose the perfect package for your
              needs.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-lg font-medium ${
                  billingCycle === "monthly"
                    ? "text-slate-800"
                    : "text-slate-500"
                }`}
              >
                Per Service
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "annual" : "monthly"
                  )
                }
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-slate-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    billingCycle === "annual"
                      ? "translate-x-9"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-medium ${
                    billingCycle === "annual"
                      ? "text-slate-800"
                      : "text-slate-500"
                  }`}
                >
                  Package Deal
                </span>
                {billingCycle === "annual" && (
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    Save 15%
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2 bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-lg">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-xl transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "hover:bg-white/50 text-slate-600"
                  }`}
                >
                  {category === "all"
                    ? "All Services"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const IconComponent = pkg.icon;
              const discountedPrice = getDiscountedPrice(pkg.basePrice);

              return (
                <Card
                  key={pkg.id}
                  className={`relative bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden ${
                    pkg.popular ? "ring-2 ring-purple-300 scale-105" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-b-xl text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10 pt-8">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${pkg.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                        {pkg.category}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                      {pkg.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-base leading-relaxed mb-6">
                      {pkg.description}
                    </CardDescription>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${discountedPrice}
                        </span>
                        {billingCycle === "annual" &&
                          pkg.basePrice !== discountedPrice && (
                            <span className="text-lg text-slate-400 line-through">
                              ${pkg.basePrice}
                            </span>
                          )}
                      </div>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {pkg.estimatedDuration === 1
                          ? "1 hour"
                          : `${pkg.estimatedDuration} business days`}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-6">
                      <ul className="space-y-3">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 font-medium">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                      <Button
                        className={`w-full ${
                          pkg.popular
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        } shadow-lg transform hover:scale-105 transition-all duration-300 py-3`}
                        asChild
                      >
                        <Link to="/register" className="">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/50">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Payment Methods
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choose from multiple secure payment options for your convenience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-white/50 rounded-2xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {method.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {method.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Processing:</span>
                        <span className="font-medium text-slate-700">
                          {method.processingTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Fees:</span>
                        <span className="font-medium text-slate-700">
                          {method.fees}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Common questions about our pricing and services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Are there any hidden fees?",
                answer:
                  "No, our pricing is completely transparent. The price you see includes all standard services listed in the package. Additional rush services or special requests may incur extra charges, which will be clearly communicated upfront.",
              },
              {
                question: "Do you offer discounts for bulk orders?",
                answer:
                  "Yes, our Enterprise Solution package offers volume discounts for businesses processing multiple items. Contact our sales team for custom pricing based on your specific needs.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept VNPay for online payments, direct bank transfers, and cash payments at our office. All payments are secure and processed according to industry standards.",
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer:
                  "We offer a 100% satisfaction guarantee. If you're not satisfied with our service, we'll work with you to resolve any issues or provide a full refund within 30 days of service completion.",
              },
              {
                question: "How long does the assessment process take?",
                answer:
                  "Processing times vary by service: Basic Assessment (5-7 days), Premium Certification (7-10 days), Express Service (24-48 hours). Times start from when we receive your items at our facility.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">?</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Choose your perfect service package and experience professional
              gemstone assessment with transparent pricing and no hidden costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/register" className="">
                  Start Assessment
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link to="/contact" className="">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
