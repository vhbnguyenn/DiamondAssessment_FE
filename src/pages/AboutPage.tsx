import React from "react";
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
  Award,
  Users,
  Globe,
  Shield,
  Microscope,
  Clock,
  Star,
  CheckCircle,
  Trophy,
  Target,
  Heart,
  ArrowRight,
  Sparkles,
  Zap,
  Diamond,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const AboutPage = () => {
  const navigate = useNavigate();
  const stats = [
    {
      number: "50,000+",
      label: "Gemstones Authenticated",
      icon: Microscope,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "98.9%",
      label: "Customer Satisfaction",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      number: "25+",
      label: "Countries Served",
      icon: Globe,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Gemologist & Founder",
      experience: "20+ years",
      certifications: [
        "GIA Graduate Gemologist",
        "AIGS Certified",
        "SSEF Diploma",
      ],
      initials: "SM",
      bio: "Leading expert in diamond grading and gemstone identification with two decades of experience in luxury markets.",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Marcus Chen",
      role: "Senior Analyst",
      experience: "15+ years",
      certifications: [
        "GIA Graduate Gemologist",
        "Gübelin Academy",
        "CIBJO Certified",
      ],
      initials: "MC",
      bio: "Specialist in synthetic gemstone detection and advanced spectroscopic analysis techniques.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Dr. Amanda Ross",
      role: "Research Director",
      experience: "18+ years",
      certifications: ["PhD in Mineralogy", "GIA Research", "AGTA Certified"],
      initials: "AR",
      bio: "Leading researcher in gemstone origin determination and treatment identification methods.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Jennifer Walsh",
      role: "Market Analysis Lead",
      experience: "12+ years",
      certifications: [
        "GIA Graduate Gemologist",
        "CAIA Charter",
        "CFA Institute",
      ],
      initials: "JW",
      bio: "Expert in gemstone market trends and investment analysis with extensive auction house experience.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const certifications = [
    {
      name: "GIA",
      fullName: "Gemological Institute of America",
      description: "World's foremost authority in gemology",
      icon: Diamond,
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "SSEF",
      fullName: "Swiss Gemmological Institute",
      description: "Leading European gemological laboratory",
      icon: Shield,
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Gübelin",
      fullName: "Gübelin Gem Lab",
      description: "Premier gemstone analysis facility",
      icon: Award,
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "AIGS",
      fullName: "Asian Institute of Gemological Sciences",
      description: "Recognized Asian gemological authority",
      icon: Globe,
      color: "from-emerald-500 to-cyan-500",
    },
  ];

  const values = [
    {
      title: "Accuracy",
      description:
        "We maintain the highest standards of precision in every assessment",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Integrity",
      description: "Honest, transparent evaluations you can trust",
      icon: Shield,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Excellence",
      description: "Continuous improvement and innovation in our methods",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Service",
      description: "Dedicated to exceeding customer expectations",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const equipment = [
    {
      name: "FTIR Spectroscopy",
      description: "Advanced infrared analysis for treatment detection",
      icon: Microscope,
    },
    {
      name: "Photoluminescence",
      description: "Origin determination and synthetic identification",
      icon: Zap,
    },
    {
      name: "UV-Vis Spectroscopy",
      description: "Color origin and enhancement analysis",
      icon: Sparkles,
    },
    {
      name: "X-Ray Fluorescence",
      description: "Non-destructive elemental composition analysis",
      icon: Shield,
    },
    {
      name: "Raman Spectroscopy",
      description: "Molecular structure identification",
      icon: Target,
    },
    {
      name: "Digital Microscopy",
      description: "High-resolution inclusion documentation",
      icon: Award,
    },
  ];

  const Link = ({ to, children, className }) => (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        navigate(to);
        e.preventDefault();
        console.log(`Navigate to: ${to}`);
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
      <Header />
      <section className="relative z-10 ">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Trusted Gemstone
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              We are the world's leading independent gemstone authentication and
              certification service, trusted by collectors, dealers, and
              institutions worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/services" className="inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4"
                >
                  Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 px-8 py-4 font-semibold"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/50">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div
                      className={`mx-auto w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {stat.number}
                    </h3>
                    <p className="text-slate-600 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-white shadow-2xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Work with the Experts?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust us with their most
              valuable gemstones. Experience the difference that true expertise
              makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register" className="inline-block">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Started Today
                </Button>
              </Link>
              <Link to="/services" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
