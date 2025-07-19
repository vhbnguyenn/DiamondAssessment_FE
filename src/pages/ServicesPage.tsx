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
  Gem,
  Search,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const services = [
    {
      id: 1,
      title: "Gemstone Authentication",
      description:
        "Professional gemstone identification and certification using advanced equipment and expert analysis.",
      features: [
        "Detailed laboratory analysis",
        "Certified authenticity reports",
        "Digital documentation",
        "Quality grading",
      ],
      price: "From $150",
      duration: "3-5 business days",
      icon: Microscope,
      category: "Authentication",
      color: "from-blue-500 to-cyan-500",
      popular: false,
    },
    {
      id: 2,
      title: "Diamond Grading",
      description:
        "Comprehensive diamond evaluation including cut, clarity, color, and carat weight assessment.",
      features: [
        "4C evaluation",
        "Detailed grading report",
        "Photographic documentation",
        "Market value assessment",
      ],
      price: "From $200",
      duration: "5-7 business days",
      icon: Diamond,
      category: "Certification",
      color: "from-purple-500 to-pink-500",
      popular: true,
    },
    {
      id: 3,
      title: "Jewelry Appraisal",
      description:
        "Complete jewelry valuation for insurance, estate, or resale purposes with detailed documentation.",
      features: [
        "Insurance appraisal",
        "Estate valuation",
        "Market analysis",
        "Detailed photography",
      ],
      price: "From $120",
      duration: "2-4 business days",
      icon: TrendingUp,
      category: "Appraisal",
      color: "from-emerald-500 to-teal-500",
      popular: false,
    },
    {
      id: 4,
      title: "Express Service",
      description:
        "Fast-track authentication and certification for urgent requirements with premium handling.",
      features: [
        "Priority processing",
        "24-48 hour turnaround",
        "Dedicated support",
        "Rush handling",
      ],
      price: "From $300",
      duration: "1-2 business days",
      icon: Zap,
      category: "Express",
      color: "from-orange-500 to-red-500",
      popular: false,
    },
    {
      id: 5,
      title: "Consultation Service",
      description:
        "Expert consultation for investment decisions, purchasing advice, and gemstone education.",
      features: [
        "Expert advice",
        "Market insights",
        "Investment guidance",
        "Educational sessions",
      ],
      price: "From $75",
      duration: "1 hour session",
      icon: Users,
      category: "Consultation",
      color: "from-indigo-500 to-purple-500",
      popular: false,
    },
    {
      id: 6,
      title: "Certificate Verification",
      description:
        "Verify the authenticity and accuracy of existing gemstone certificates from other laboratories.",
      features: [
        "Certificate analysis",
        "Authenticity verification",
        "Comparison reports",
        "Fraud detection",
      ],
      price: "From $50",
      duration: "1-2 business days",
      icon: Shield,
      category: "Verification",
      color: "from-rose-500 to-pink-500",
      popular: false,
    },
  ];

  const categories = [
    "all",
    "Authentication",
    "Certification",
    "Appraisal",
    "Express",
    "Consultation",
    "Verification",
  ];

  const benefits = [
    {
      title: "Certified Professionals",
      description: "Laboratory professionals with international certifications",
      icon: Award,
    },
    {
      title: "Advanced Equipment",
      description: "State-of-the-art gemological analysis equipment",
      icon: Microscope,
    },
    {
      title: "Global Standards",
      description: "Internationally recognized gemological standards",
      icon: Star,
    },
    {
      title: "Secure Handling",
      description: "Secure handling and storage of your valuable items",
      icon: Shield,
    },
    {
      title: "Digital Tracking",
      description: "Real-time tracking system for complete transparency",
      icon: Search,
    },
    {
      title: "Insurance Coverage",
      description: "Full insurance coverage for your peace of mind",
      icon: CheckCircle,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Submit Request",
      description:
        "Create an account and submit your service request with item details.",
      icon: FileText,
    },
    {
      step: "02",
      title: "Secure Shipping",
      description: "Ship your items using our secure, insured shipping method.",
      icon: Shield,
    },
    {
      step: "03",
      title: "Professional Analysis",
      description:
        "Our experts conduct thorough analysis using advanced equipment.",
      icon: Microscope,
    },
    {
      step: "04",
      title: "Certification & Return",
      description:
        "Receive detailed reports and your items via secure return shipping.",
      icon: Award,
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  type LinkProps = {
    to: string;
    children: React.ReactNode;
    className?: string;
  };
  const navigate = useNavigate();
  const Link: React.FC<LinkProps> = ({ to, children, className }) => (
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

      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Professional Gemstone
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Expert authentication, certification, and appraisal services for
              precious gems and jewelry with industry-leading accuracy and
              reliability.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2 bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-lg">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-xl transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "hover:bg-white/50 text-slate-600"
                  }`}
                >
                  {category === "all" ? "All Services" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive gemstone and jewelry services backed by decades of
              experience and cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={service.id}
                  className={`relative bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden ${
                    service.popular ? "ring-2 ring-purple-300 scale-105" : ""
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-b-xl text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardHeader className="relative z-10 pt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${service.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="space-y-6">
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700 font-medium">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {service.price}
                          </p>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {service.duration}
                          </p>
                        </div>
                        <Button
                          className={`${
                            service.popular
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          } shadow-lg transform hover:scale-105 transition-all duration-300`}
                          asChild
                        >
                          <Link to="/register">Order Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/50">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Why Choose Our Services
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Trust in our expertise and commitment to providing the most
                accurate and reliable gemstone assessments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-white/50 rounded-2xl border border-slate-200/50 hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Trusted by Thousands
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Our expertise and commitment to excellence has earned the trust
                of customers worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50,000+", label: "Gems Authenticated" },
                { number: "15+", label: "Years Experience" },
                { number: "98.9%", label: "Satisfaction Rate" },
                { number: "25+", label: "Countries Served" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust us with their
              valuable gemstones and jewelry. Experience the difference that
              expertise makes.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register" className="inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4"
                >
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 px-8 py-4 font-semibold"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
