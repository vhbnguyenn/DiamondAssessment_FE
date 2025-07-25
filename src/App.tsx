import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";

import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/auth/RegisterPage";
import LoginPage from "@/pages/auth/LoginPage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import PricingPage from "@/pages/PricingPage";
import BlogPage from "@/pages/BlogPage";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ProtectedRoute } from "./common/ProtectedRoute";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProfilePage from "./pages/Profile";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerTracking from "./pages/customer/CustomerTracking";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import AdminStaffManagement from "./pages/admin/AdminStaffManagement";
import AdminSystemSettings from "./pages/admin/SettingsPage";
import CustomerConsultationPage from "./pages/customer/CustomerConsultationPage";
import CustomerCertificatesPage from "./pages/customer/CustomerCertificatesPage";
import AssessmentQueue from "./pages/employee/AssessmentQueue";
import SampleManagement from "./pages/employee/SampleManagement";
import Communications from "./pages/consultant/Communications";
import ConsultationRequests from "./pages/consultant/ConsultationRequests";
import CustomerPaymentsPage from "./pages/customer/CustomerPaymentsPage";
import CertificateManagement from "./pages/manager/CertificateManagement";
import StaffAssignment from "./pages/manager/StaffAssignment";
import ServiceManagement from "./pages/manager/ServiceManagement";
import Reports from "./pages/manager/Reports";
import BlogManagement from "./pages/manager/BlogManagement";
import OrderPage from "./pages/customer/OrderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />

              {/* Customer Routes */}
              <Route
                path="orders"
                element={
                  <ProtectedRoute requiredRoles={["customer"]}>
                    <CustomerOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders/new"
                element={
                  <ProtectedRoute requiredRoles={["customer"]}>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tracking"
                element={
                  <ProtectedRoute requiredRoles={["customer"]}>
                    <CustomerTracking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="consultation"
                element={
                  <ProtectedRoute requiredRoles={["customer"]}>
                    <CustomerConsultationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="certificates"
                element={
                  <ProtectedRoute requiredRoles={["customer"]}>
                    <CustomerCertificatesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payments"
                element={
                  <ProtectedRoute requiredRoles={["customer"]}>
                    <CustomerPaymentsPage />
                  </ProtectedRoute>
                }
              />

              {/* Assessment Staff Routes */}
              <Route
                path="assessment-queue"
                element={
                  <ProtectedRoute requiredRoles={["assessment_staff"]}>
                    <AssessmentQueue />
                  </ProtectedRoute>
                }
              />
              <Route
                path="samples"
                element={
                  <ProtectedRoute requiredRoles={["assessment_staff"]}>
                    <SampleManagement />
                  </ProtectedRoute>
                }
              />

              {/* Consultant Routes */}
              <Route
                path="consultation-requests"
                element={
                  <ProtectedRoute requiredRoles={["consultant"]}>
                    <ConsultationRequests />
                  </ProtectedRoute>
                }
              />
              <Route
                path="communications"
                element={
                  <ProtectedRoute requiredRoles={["consultant"]}>
                    <Communications />
                  </ProtectedRoute>
                }
              />

              {/* Manager Routes */}
              <Route
                path="certificate-management"
                element={
                  <ProtectedRoute requiredRoles={["manager"]}>
                    <CertificateManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="staff-assignment"
                element={
                  <ProtectedRoute requiredRoles={["manager"]}>
                    <StaffAssignment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="services"
                element={
                  <ProtectedRoute requiredRoles={["manager"]}>
                    <ServiceManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="blog-management"
                element={
                  <ProtectedRoute requiredRoles={["manager"]}>
                    <BlogManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reports"
                element={
                  <ProtectedRoute requiredRoles={["manager"]}>
                    <Reports />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="user-management"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <AdminUserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="staff-management"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <AdminStaffManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="system-settings"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <AdminSystemSettings />
                  </ProtectedRoute>
                }
              />

              {/* Common Routes */}
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Public informational routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
