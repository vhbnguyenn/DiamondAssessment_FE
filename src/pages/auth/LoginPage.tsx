import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Diamond,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Sparkles,
  LogIn,
  User,
  Users,
  Crown,
  Briefcase,
  Headphones,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/AuthProvider";

// Mock LoadingSpinner component
const LoadingSpinner = ({ size = "md", className = "" }) => (
  <div
    className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${
      size === "sm" ? "h-4 w-4" : "h-6 w-6"
    } ${className}`}
  ></div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the intended destination from location state, default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const demoCredentials = [
    {
      role: "Admin",
      email: "admin@diamond.com",
      password: "password123",
      icon: Crown,
      color: "from-red-500 to-pink-500",
      description: "Full system access",
    },
    {
      role: "Manager",
      email: "manager@diamond.com",
      password: "password123",
      icon: Briefcase,
      color: "from-purple-500 to-indigo-500",
      description: "Management dashboard",
    },
    {
      role: "Consultant",
      email: "consultant@diamond.com",
      password: "password123",
      icon: Headphones,
      color: "from-blue-500 to-cyan-500",
      description: "Customer consultation",
    },
    {
      role: "Assessment Staff",
      email: "staff@diamond.com",
      password: "password123",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
      description: "Assessment operations",
    },
    {
      role: "Customer",
      email: "customer@diamond.com",
      password: "password123",
      icon: User,
      color: "from-orange-500 to-red-500",
      description: "Customer portal",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleDemoSelect = (demo) => {
    setSelectedDemo(demo);
    setFormData({
      email: demo.email,
      password: demo.password,
    });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setError("");
      setIsLoading(true);

      // Use the login function from AuthProvider
      await login(formData.email, formData.password);

      // Find demo account for success message
      const demoAccount = demoCredentials.find(
        (demo) => demo.email === formData.email
      );

      if (demoAccount) {
        toast.success(`Login successful! Welcome ${demoAccount.role}!`);
      } else {
        toast.success("Login successful!");
      }

      // Navigate to dashboard or intended destination
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  type LinkProps = {
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  };
  const Link: React.FC<LinkProps> = ({ to, children, className, onClick }) => (
    <a
      href={to}
      className={className}
      onClick={
        onClick
          ? (e) => {
              e.preventDefault();
              console.log(`Navigate to: ${to}`);
              onClick();
            }
          : undefined
      }
    >
      {children}
    </a>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:block space-y-6">
            <div className="space-y-3">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  🎯 Demo Accounts
                </h2>
                <p className="text-sm text-slate-600">
                  Click any account to auto-fill credentials
                </p>
              </div>
              {demoCredentials.map((demo, index) => {
                const Icon = demo.icon;
                return (
                  <div
                    key={index}
                    onClick={() => handleDemoSelect(demo)}
                    className={`p-4 bg-white/70 backdrop-blur-sm border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      selectedDemo?.role === demo.role
                        ? "border-blue-300 shadow-lg shadow-blue-500/20"
                        : "border-transparent hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${demo.color} rounded-lg flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">
                          {demo.role}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {demo.description}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {demo.email}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          selectedDemo?.role === demo.role
                            ? "translate-x-1 text-blue-600"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="text-center mb-8">
              <Link
                to="/"
                className="inline-flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Diamond className="h-6 w-6 text-white animate-pulse" />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Diamond Assessment
                </span>
              </Link>
            </div>

            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2 mb-4 mx-auto">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    Secure Login
                  </span>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>

              <CardContent>
                {error && (
                  <Alert
                    variant="destructive"
                    className="mb-6 bg-red-50 border-red-200"
                  >
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-slate-700 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="pl-10 pr-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 transition-colors"
                      />
                      <Label
                        htmlFor="remember"
                        className="ml-2 text-sm text-slate-600 cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-slate-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                    >
                      Create account
                    </Link>
                  </p>
                </div>

                <div className="lg:hidden mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <p className="text-sm font-semibold text-slate-700 text-center mb-3">
                    🎯 Demo Accounts
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {demoCredentials.map((demo, index) => (
                      <div
                        key={index}
                        onClick={() => handleDemoSelect(demo)}
                        className="p-2 bg-white/70 rounded-lg cursor-pointer hover:bg-white transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium text-slate-700">
                          {demo.role}
                        </span>
                        <span className="text-slate-500">{demo.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
