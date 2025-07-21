import React from "react";
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
    icon: Settings,
    roles: ["customer", "assessment_staff", "consultant", "manager", "admin"],
  },
];

export const DashboardSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-card border-r shadow-elegant">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Dashboard
        </h2>
        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
