import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  Users,
  Settings,
  ClipboardList,
  MessageSquare,
  CreditCard,
  Award,
  BookOpen,
  BarChart3,
  Search,
  Package,
  UserCheck,
  Shield,
  Diamond,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: ["customer", "assessment_staff", "consultant", "manager", "admin"],
  },
  // Customer menu items
  {
    title: "My Orders",
    href: "/dashboard/orders",
    icon: Package,
    roles: ["customer"],
  },
  {
    title: "Track Assessment",
    href: "/dashboard/tracking",
    icon: Search,
    roles: ["customer"],
  },
  {
    title: "Consultation",
    href: "/dashboard/consultation",
    icon: MessageSquare,
    roles: ["customer"],
  },
  {
    title: "My Certificates",
    href: "/dashboard/certificates",
    icon: Award,
    roles: ["customer"],
  },
  {
    title: "Payment History",
    href: "/dashboard/payments",
    icon: CreditCard,
    roles: ["customer"],
  },
  // Assessment Staff menu items
  {
    title: "Assessment Queue",
    href: "/dashboard/assessment-queue",
    icon: ClipboardList,
    roles: ["assessment_staff"],
  },
  {
    title: "Sample Management",
    href: "/dashboard/samples",
    icon: Package,
    roles: ["assessment_staff"],
  },
  // Consultant menu items
  {
    title: "Consultation Requests",
    href: "/dashboard/consultation-requests",
    icon: MessageSquare,
    roles: ["consultant"],
  },
  {
    title: "Customer Communications",
    href: "/dashboard/communications",
    icon: Users,
    roles: ["consultant"],
  },
  // Manager menu items
  {
    title: "Certificate Management",
    href: "/dashboard/certificate-management",
    icon: Award,
    roles: ["manager"],
  },
  {
    title: "Staff Assignment",
    href: "/dashboard/staff-assignment",
    icon: UserCheck,
    roles: ["manager"],
  },
  {
    title: "Service Management",
    href: "/dashboard/services",
    icon: Settings,
    roles: ["manager"],
  },
  {
    title: "Blog Management",
    href: "/dashboard/blog-management",
    icon: BookOpen,
    roles: ["manager"],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    roles: ["manager"],
  },
  // Admin menu items
  {
    title: "User Management",
    href: "/dashboard/user-management",
    icon: Users,
    roles: ["admin"],
  },
  {
    title: "Staff Management",
    href: "/dashboard/staff-management",
    icon: Shield,
    roles: ["admin"],
  },
  {
    title: "System Settings",
    href: "/dashboard/system-settings",
    icon: Settings,
    roles: ["admin"],
  },
  // Common items
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
    roles: ["customer", "assessment_staff", "consultant", "manager", "admin"],
  },
];

export const DashboardSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) return null;

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user.role)
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

  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      customer: "from-orange-500 to-red-500",
      assessment_staff: "from-emerald-500 to-teal-500",
      consultant: "from-blue-500 to-cyan-500",
      manager: "from-purple-500 to-indigo-500",
      admin: "from-red-500 to-pink-500",
    };
    return roleColors[role] || "from-blue-500 to-purple-500";
  };

  return (
    <aside
      className={cn(
        "bg-white/80 backdrop-blur-md border-r-0 shadow-xl relative transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-80"
      )}
    >
      {/* Decorative gradient border */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3 text-white" />
        ) : (
          <ChevronLeft className="h-3 w-3 text-white" />
        )}
      </button>

      <div className="p-6 space-y-6">
        {/* Navigation */}
        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center rounded-xl text-sm font-medium transition-all duration-300",
                    isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-slate-600 hover:text-slate-800 hover:bg-white/70 hover:shadow-md hover:transform hover:translate-x-1"
                  )
                }
                title={isCollapsed ? item.title : ""}
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-white/20"
                          : "bg-slate-100 group-hover:bg-slate-200"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          isActive ? "text-white" : "text-slate-600"
                        )}
                      />
                    </div>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.title}</span>
                        {isActive && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="pt-4 border-t border-slate-200/50">
          <button
            onClick={logout}
            className={cn(
              "group w-full flex items-center rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:transform hover:translate-x-1",
              isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3"
            )}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-red-100 transition-all duration-300">
              <LogOut className="h-4 w-4" />
            </div>
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
