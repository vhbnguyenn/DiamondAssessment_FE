import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import {
  Shield,
  Clock,
  Award,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified Assessment",
      description:
        "Professional diamond assessment with internationally recognized standards",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description:
        "Quick turnaround time with real-time tracking of your assessment",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Digital Certificates",
      description: "Secure digital certificates with QR codes for verification",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Expert Consultants",
      description:
        "Connect with certified gemologists for professional guidance",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const services = [
    {
      name: "Diamond Grading",
      price: "From $150",
      features: ["4C Analysis", "Detailed Report", "Digital Certificate"],
      popular: false,
      gradient: "from-blue-50 to-indigo-50",
      borderGlow: "shadow-blue-500/20",
    },
    {
      name: "Consultation Service",
      price: "From $75",
      features: ["Expert Advice", "Market Analysis", "Purchase Guidance"],
      popular: true,
      gradient: "from-purple-50 to-pink-50",
      borderGlow: "shadow-purple-500/30",
    },
    {
      name: "Authentication",
      price: "From $100",
      features: [
        "Authenticity Verification",
        "Fraud Protection",
        "Insurance Support",
      ],
      popular: false,
      gradient: "from-emerald-50 to-teal-50",
      borderGlow: "shadow-emerald-500/20",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Jewelry Collector",
      content:
        "The assessment was thorough and professional. I received my certificate within 3 days!",
      rating: 5,
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Diamond Dealer",
      content:
        "Excellent service and very detailed reports. Highly recommend for professional assessment.",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emily Davis",
      role: "Bride-to-be",
      content:
        "Helped me understand the quality of my engagement ring. Great customer service!",
      rating: 5,
      avatar: "ED",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <section className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Professional Diamond
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Assessment Services
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Get certified diamond grading and authentication from expert
            gemologists. Trusted by collectors, dealers, and jewelry enthusiasts
            worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to="/register">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4  relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Why Choose Our Services?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive diamond assessment services with the
            highest standards of accuracy and professionalism.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group text-center bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <div
                    className={`mx-auto bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-5 relative z-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose from our range of professional diamond assessment and
              consultation services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${
                  service.gradient
                } border-2 ${
                  service.popular
                    ? "border-purple-300 scale-105"
                    : "border-transparent"
                } hover:shadow-2xl ${
                  service.borderGlow
                } transition-all duration-500 hover:-translate-y-1`}
              >
                {service.popular && (
                  <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-b-xl text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="relative z-10 pt-8">
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {service.name}
                  </CardTitle>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {service.price}
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      service.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                    } font-semibold py-3 transition-all duration-300 transform group-hover:scale-105`}
                  >
                    {service.popular ? "Get Started" : "Learn More"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Read testimonials from satisfied customers who trust our diamond
            assessment services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-800">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {testimonial.role}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust our professional
              diamond assessment services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/register">Create Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
