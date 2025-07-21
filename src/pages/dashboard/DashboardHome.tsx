import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Award,
  MessageSquare,
  Calendar,
  DollarSign,
  ArrowRight,
  Star,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome: React.FC = () => {
  const { user } = useAuth();

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

  const ActionCard = ({ title, description, children, className = "" }) => (
    <Card
      className={`bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
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

  const renderCustomerDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Orders"
          value="3"
          subtitle="2 in assessment"
          icon={Package}
          color="from-emerald-500 to-teal-500"
        />
        <StatsCard
          title="Completed"
          value="12"
          subtitle="Total assessments"
          icon={CheckCircle}
          color="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Certificates"
          value="8"
          subtitle="Digital certificates"
          icon={Award}
          color="from-yellow-500 to-orange-500"
        />
        <StatsCard
          title="Messages"
          value="2"
          subtitle="Unread messages"
          icon={MessageSquare}
          color="from-pink-500 to-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActionCard
          title="Recent Orders"
          description="Your latest assessment requests"
        >
          <div className="space-y-4">
            {[
              {
                id: "DIA-001",
                status: "In Progress",
                date: "2024-01-15",
                color: "blue",
              },
              {
                id: "DIA-002",
                status: "Quality Check",
                date: "2024-01-12",
                color: "yellow",
              },
              {
                id: "DIA-003",
                status: "Completed",
                date: "2024-01-10",
                color: "green",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200/50 hover:border-blue-300/50 transition-all duration-300"
              >
                <div>
                  <p className="font-semibold text-slate-800">{order.id}</p>
                  <p className="text-sm text-slate-600">{order.date}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.color === "green"
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : order.color === "blue"
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
          <GradientButton className="w-full mt-6" variant="outline" asChild>
            <Link to="/dashboard/orders">
              View All Orders
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </GradientButton>
        </ActionCard>

        <ActionCard
          title="Quick Actions"
          description="Common tasks and shortcuts"
        >
          <div className="space-y-4">
            <GradientButton className="w-full h-12" asChild>
              <Link to="/dashboard/orders/new">
                <Package className="mr-2 h-5 w-5" />
                Request New Assessment
              </Link>
            </GradientButton>
            <GradientButton className="w-full h-12" variant="outline" asChild>
              <Link to="/dashboard/tracking">
                <Activity className="mr-2 h-5 w-5" />
                Track Assessment
              </Link>
            </GradientButton>
            <GradientButton className="w-full h-12" variant="outline" asChild>
              <Link to="/dashboard/consultation">
                <MessageSquare className="mr-2 h-5 w-5" />
                Get Consultation
              </Link>
            </GradientButton>
          </div>
        </ActionCard>
      </div>
    </div>
  );

  const renderStaffDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending Assessments"
          value="8"
          subtitle="Awaiting review"
          icon={Clock}
          color="from-orange-500 to-red-500"
        />
        <StatsCard
          title="In Progress"
          value="5"
          subtitle="Currently assessing"
          icon={Package}
          color="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Completed Today"
          value="12"
          subtitle="+3 from yesterday"
          icon={CheckCircle}
          color="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Average Time"
          value="2.3"
          subtitle="Days per assessment"
          icon={Calendar}
          color="from-purple-500 to-indigo-500"
        />
      </div>

      <ActionCard
        title="Assessment Queue"
        description="Diamonds awaiting assessment"
      >
        <div className="space-y-4">
          {[
            {
              sample: "SAMPLE-001",
              customer: "John Doe",
              priority: "High",
              date: "2024-01-15",
            },
            {
              sample: "SAMPLE-002",
              customer: "Jane Smith",
              priority: "Medium",
              date: "2024-01-15",
            },
            {
              sample: "SAMPLE-003",
              customer: "Bob Johnson",
              priority: "Low",
              date: "2024-01-14",
            },
          ].map((item) => (
            <div
              key={item.sample}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-md"
            >
              <div>
                <p className="font-semibold text-slate-800">{item.sample}</p>
                <p className="text-sm text-slate-600">{item.customer}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : item.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "bg-green-100 text-green-700 border border-green-200"
                  }`}
                >
                  {item.priority}
                </span>
                <p className="text-sm text-slate-500 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
        <GradientButton className="w-full mt-6" asChild>
          <Link to="/dashboard/assessment-queue">
            <Package className="mr-2 h-5 w-5" />
            View Full Queue
          </Link>
        </GradientButton>
      </ActionCard>
    </div>
  );

  const renderManagerDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$45,231"
          subtitle="+20.1% from last month"
          icon={DollarSign}
          color="from-emerald-500 to-teal-500"
        />
        <StatsCard
          title="Active Orders"
          value="127"
          subtitle="15 completed today"
          icon={Package}
          color="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Staff Performance"
          value="94%"
          subtitle="Average efficiency"
          icon={TrendingUp}
          color="from-purple-500 to-indigo-500"
        />
        <StatsCard
          title="Customer Satisfaction"
          value="4.8"
          subtitle="Average rating"
          icon={Star}
          color="from-yellow-500 to-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActionCard
          title="Recent Activities"
          description="Latest system activities"
        >
          <div className="space-y-4">
            {[
              {
                action: "Certificate issued",
                item: "DIA-001",
                time: "2 hours ago",
              },
              {
                action: "Staff assigned",
                item: "SAMPLE-045",
                time: "4 hours ago",
              },
              {
                action: "Quality check completed",
                item: "DIA-003",
                time: "6 hours ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200/50"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-600">{activity.item}</p>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </ActionCard>

        <ActionCard
          title="Quick Management"
          description="Common management tasks"
        >
          <div className="space-y-4">
            <GradientButton className="w-full h-12" asChild>
              <Link to="/dashboard/staff-assignment">
                <Users className="mr-2 h-5 w-5" />
                Assign Staff
              </Link>
            </GradientButton>
            <GradientButton className="w-full h-12" variant="outline" asChild>
              <Link to="/dashboard/certificate-management">
                <Award className="mr-2 h-5 w-5" />
                Manage Certificates
              </Link>
            </GradientButton>
            <GradientButton className="w-full h-12" variant="outline" asChild>
              <Link to="/dashboard/reports">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Reports
              </Link>
            </GradientButton>
          </div>
        </ActionCard>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="2,543"
          subtitle="+180 this month"
          icon={Users}
          color="from-blue-500 to-purple-500"
        />
        <StatsCard
          title="Active Staff"
          value="23"
          subtitle="Across all departments"
          icon={Package}
          color="from-emerald-500 to-teal-500"
        />
        <StatsCard
          title="System Health"
          value="99.9%"
          subtitle="Uptime this month"
          icon={CheckCircle}
          color="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Support Tickets"
          value="12"
          subtitle="3 urgent"
          icon={AlertCircle}
          color="from-orange-500 to-red-500"
        />
      </div>

      <ActionCard
        title="System Administration"
        description="Manage users, staff, and system settings"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GradientButton className="h-24 flex flex-col justify-center" asChild>
            <Link to="/dashboard/user-management">
              <Users className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">User Management</span>
            </Link>
          </GradientButton>
          <GradientButton
            className="h-24 flex flex-col justify-center"
            variant="outline"
            asChild
          >
            <Link to="/dashboard/staff-management">
              <Package className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Staff Management</span>
            </Link>
          </GradientButton>
          <GradientButton
            className="h-24 flex flex-col justify-center"
            variant="outline"
            asChild
          >
            <Link to="/dashboard/system-settings">
              <AlertCircle className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">System Settings</span>
            </Link>
          </GradientButton>
        </div>
      </ActionCard>
    </div>
  );

  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      customer: "Customer",
      assessment_staff: "Assessment Staff",
      consultant: "Consultant",
      manager: "Manager",
      admin: "Administrator",
    };
    return roleMap[role] || role;
  };

  const renderDashboardByRole = () => {
    if (!user) return null;

    switch (user.role) {
      case "customer":
        return renderCustomerDashboard();
      case "assessment_staff":
        return renderStaffDashboard();
      case "consultant":
        return renderStaffDashboard();
      case "manager":
        return renderManagerDashboard();
      case "admin":
        return renderAdminDashboard();
      default:
        return renderCustomerDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Welcome back,{" "}
              <span className="font-medium text-slate-700">
                {getRoleDisplay(user?.role || "")}
              </span>
            </p>
          </div>
        </div>

        {renderDashboardByRole()}
      </div>
    </div>
  );
};

export default DashboardHome;
