import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  Eye,
  Mail,
  Phone,
  Calendar,
  Building,
  MapPin,
  Activity,
  TrendingUp,
  UserPlus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Download,
  Upload,
  RefreshCw,
  Target,
  Award,
  BarChart3,
  PieChart,
  Calendar as CalendarIcon,
  FileText,
  MessageSquare,
  Settings,
  Briefcase,
  GraduationCap,
  Coffee,
  Zap,
  TimerIcon,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import type { Employee, UserRole, DiamondAssessmentRequest } from "@/types";

interface ExtendedEmployee extends Employee {
  avatar?: string;
  workload: {
    activeAssessments: number;
    completedThisMonth: number;
    avgCompletionTime: number;
    efficiency: number;
  };
  performance: {
    rating: number;
    customerSatisfaction: number;
    onTimeDelivery: number;
    qualityScore: number;
  };
  availability: {
    status: "available" | "busy" | "on_leave" | "offline";
    nextAvailable?: string;
  };
  salary: number;
  skills: string[];
  certifications: string[];
  joinDate: string;
  lastActivity: string;
}

interface Assignment {
  id: string;
  employeeId: string;
  requestId: string;
  requestType: "assessment" | "consultation" | "quality_check";
  customerId: string;
  customerName: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "assigned" | "in_progress" | "completed" | "overdue";
  assignedDate: string;
  dueDate: string;
  estimatedHours: number;
  description: string;
}

const AdminStaffManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<ExtendedEmployee | null>(null);
  const [newTaskType, setNewTaskType] = useState<string>("assessment");
  const [newPriority, setNewPriority] = useState<string>("low");
  const [newCustomer, setNewCustomer] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const [staff, setStaff] = useState<ExtendedEmployee[]>([
    {
      id: "1",
      email: "jane.smith@diamond.com",
      role: "assessment_staff",
      createdAt: "2023-01-15",
      updatedAt: "2025-01-22",
      isActive: true,
      employeeId: "EMP001",
      firstName: "Jane",
      lastName: "Smith",
      department: "assessment",
      position: "Senior Diamond Assessor",
      hireDate: "2023-01-15",
      joinDate: "2023-01-15",
      salary: 85000000,
      workload: {
        activeAssessments: 12,
        completedThisMonth: 45,
        avgCompletionTime: 6.5,
        efficiency: 92,
      },
      performance: {
        rating: 4.8,
        customerSatisfaction: 96,
        onTimeDelivery: 94,
        qualityScore: 98,
      },
      availability: {
        status: "available",
      },
      skills: ["Diamond Grading", "4C Analysis", "Gemology", "Quality Control"],
      certifications: [
        "GIA Graduate Gemologist",
        "ISO 9001",
        "Diamond Grading Professional",
      ],
      lastActivity: "2025-01-22T14:30:00Z",
    },
    {
      id: "2",
      email: "mike.wilson@diamond.com",
      role: "consultant",
      createdAt: "2023-03-20",
      updatedAt: "2025-01-21",
      isActive: true,
      employeeId: "EMP002",
      firstName: "Mike",
      lastName: "Wilson",
      department: "consultation",
      position: "Senior Consultant",
      hireDate: "2023-03-20",
      joinDate: "2023-03-20",
      salary: 75000000,
      workload: {
        activeAssessments: 8,
        completedThisMonth: 32,
        avgCompletionTime: 4.2,
        efficiency: 88,
      },
      performance: {
        rating: 4.6,
        customerSatisfaction: 93,
        onTimeDelivery: 91,
        qualityScore: 95,
      },
      availability: {
        status: "busy",
        nextAvailable: "2025-01-23T09:00:00Z",
      },
      skills: [
        "Customer Consultation",
        "Diamond Education",
        "Sales Support",
        "Market Analysis",
      ],
      certifications: [
        "Diamond Consultant Certified",
        "Customer Service Excellence",
      ],
      lastActivity: "2025-01-22T16:45:00Z",
    },
    {
      id: "3",
      email: "sarah.brown@diamond.com",
      role: "manager",
      createdAt: "2022-06-01",
      updatedAt: "2025-01-22",
      isActive: true,
      employeeId: "EMP003",
      firstName: "Sarah",
      lastName: "Brown",
      department: "management",
      position: "Operations Manager",
      hireDate: "2022-06-01",
      joinDate: "2022-06-01",
      salary: 120000000,
      workload: {
        activeAssessments: 5,
        completedThisMonth: 28,
        avgCompletionTime: 3.8,
        efficiency: 95,
      },
      performance: {
        rating: 4.9,
        customerSatisfaction: 98,
        onTimeDelivery: 96,
        qualityScore: 97,
      },
      availability: {
        status: "available",
      },
      skills: [
        "Team Management",
        "Process Optimization",
        "Quality Assurance",
        "Strategic Planning",
      ],
      certifications: [
        "MBA Operations",
        "Six Sigma Black Belt",
        "Leadership Excellence",
      ],
      lastActivity: "2025-01-22T17:00:00Z",
    },
    {
      id: "4",
      email: "david.chen@diamond.com",
      role: "assessment_staff",
      createdAt: "2024-02-10",
      updatedAt: "2025-01-20",
      isActive: true,
      employeeId: "EMP004",
      firstName: "David",
      lastName: "Chen",
      department: "assessment",
      position: "Junior Assessor",
      hireDate: "2024-02-10",
      joinDate: "2024-02-10",
      salary: 55000000,
      workload: {
        activeAssessments: 6,
        completedThisMonth: 18,
        avgCompletionTime: 8.2,
        efficiency: 78,
      },
      performance: {
        rating: 4.2,
        customerSatisfaction: 87,
        onTimeDelivery: 85,
        qualityScore: 89,
      },
      availability: {
        status: "on_leave",
        nextAvailable: "2025-01-25T08:00:00Z",
      },
      skills: [
        "Basic Gemology",
        "Quality Testing",
        "Documentation",
        "Learning & Development",
      ],
      certifications: ["Gemology Certificate", "Quality Control Basic"],
      lastActivity: "2025-01-19T18:00:00Z",
    },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      employeeId: "1",
      requestId: "REQ001",
      requestType: "assessment",
      customerId: "CUST001",
      customerName: "John Doe",
      priority: "high",
      status: "in_progress",
      assignedDate: "2025-01-20",
      dueDate: "2025-01-24",
      estimatedHours: 8,
      description: "1.5 carat round diamond assessment with full certification",
    },
    {
      id: "2",
      employeeId: "2",
      requestId: "REQ002",
      requestType: "consultation",
      customerId: "CUST002",
      customerName: "Alice Johnson",
      priority: "medium",
      status: "assigned",
      assignedDate: "2025-01-22",
      dueDate: "2025-01-25",
      estimatedHours: 4,
      description: "Customer consultation for engagement ring selection",
    },
    {
      id: "3",
      employeeId: "1",
      requestId: "REQ003",
      requestType: "quality_check",
      customerId: "CUST003",
      customerName: "Bob Smith",
      priority: "urgent",
      status: "overdue",
      assignedDate: "2025-01-18",
      dueDate: "2025-01-21",
      estimatedHours: 6,
      description: "Quality verification for returned diamond assessment",
    },
  ]);

  const getAvailabilityColor = (status: string) => {
    const colors = {
      available: "bg-green-100 text-green-700 border border-green-200",
      busy: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      on_leave: "bg-blue-100 text-blue-700 border border-blue-200",
      offline: "bg-gray-100 text-gray-700 border border-gray-200",
    };
    return colors[status] || colors.offline;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-700 border border-gray-200",
      medium: "bg-blue-100 text-blue-700 border border-blue-200",
      high: "bg-orange-100 text-orange-700 border border-orange-200",
      urgent: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[priority] || colors.low;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      assigned: "bg-blue-100 text-blue-700 border border-blue-200",
      in_progress: "bg-yellow-100 text-yellow-700 border border-yellow-200",
      completed: "bg-green-100 text-green-700 border border-green-200",
      overdue: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.assigned;
  };

  const getRoleIcon = (role: UserRole) => {
    const icons = {
      assessment_staff: Shield,
      consultant: Star,
      manager: Building,
      admin: UserPlus,
      customer: Users,
      guest: Users,
    };
    return icons[role] || Users;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const filteredStaff = staff.filter((employee) => {
    const matchesSearch =
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || employee.availability.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  type StatsCardProps = {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ElementType;
    color?: string;
    change?: number;
  };

  const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = "from-blue-500 to-purple-500",
    change,
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
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-600">{subtitle}</p>
          {change && (
            <div
              className={`flex items-center text-xs ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {change > 0 ? "+" : ""}
              {change}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const PerformanceChart = ({ employee }: { employee: ExtendedEmployee }) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Customer Satisfaction</span>
            <span className="font-medium">
              {employee.performance.customerSatisfaction}%
            </span>
          </div>
          <Progress
            value={employee.performance.customerSatisfaction}
            className="h-2"
          />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>On-Time Delivery</span>
            <span className="font-medium">
              {employee.performance.onTimeDelivery}%
            </span>
          </div>
          <Progress
            value={employee.performance.onTimeDelivery}
            className="h-2"
          />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Quality Score</span>
            <span className="font-medium">
              {employee.performance.qualityScore}%
            </span>
          </div>
          <Progress value={employee.performance.qualityScore} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Efficiency</span>
            <span className="font-medium">{employee.workload.efficiency}%</span>
          </div>
          <Progress value={employee.workload.efficiency} className="h-2" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Staff Management
          </h1>
          <p className="text-slate-600 mt-2">
            Manage employees, assignments, performance, and workload
            distribution
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/70 hover:bg-white/90">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Staff"
          value={staff.length.toString()}
          subtitle="Active employees"
          icon={Users}
          color="from-blue-500 to-cyan-500"
          change={5}
        />
        <StatsCard
          title="Available Now"
          value={staff
            .filter((s) => s.availability.status === "available")
            .length.toString()}
          subtitle="Ready for assignments"
          icon={UserCheck}
          color="from-green-500 to-emerald-500"
          change={-2}
        />
        <StatsCard
          title="Active Assignments"
          value={assignments
            .filter((a) => a.status === "in_progress")
            .length.toString()}
          subtitle="Currently working"
          icon={Activity}
          color="from-orange-500 to-red-500"
          change={8}
        />
        <StatsCard
          title="Avg Performance"
          value={`${Math.round(
            (staff.reduce((sum, s) => sum + s.performance.rating, 0) /
              staff.length) *
              20
          )}%`}
          subtitle="Team efficiency"
          icon={TrendingUp}
          color="from-purple-500 to-pink-500"
          change={3}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-md">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <Users className="mr-2 h-4 w-4" />
            Staff Overview
          </TabsTrigger>
          <TabsTrigger
            value="assignments"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="departments"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <Building className="mr-2 h-4 w-4" />
            Departments
          </TabsTrigger>
        </TabsList>

        {/* Staff Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          {/* Filters Card */}
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                <Filter className="h-5 w-5" />
                Filter Staff
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input unchanged */}

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <select
                    id="department"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2 w-full"
                  >
                    <option value="all">All Departments</option>
                    <option value="assessment">Assessment</option>
                    <option value="consultation">Consultation</option>
                    <option value="management">Management</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Availability</Label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white/70 border border-slate-200 focus:border-blue-500 rounded p-2 w-full"
                  >
                    <option value="all">All Statuses</option>
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="on_leave">On Leave</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStaff.map((employee) => {
              const RoleIcon = getRoleIcon(employee.role);
              return (
                <Card
                  key={employee.id}
                  className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-semibold">
                            {employee.firstName[0]}
                            {employee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-slate-800">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-slate-600">{employee.position}</p>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={getAvailabilityColor(
                                employee.availability.status
                              )}
                            >
                              {employee.availability.status
                                .replace("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Badge>
                            <Badge variant="outline" className="text-slate-600">
                              {employee.department?.replace(/\b\w/g, (l) =>
                                l.toUpperCase()
                              )}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white/95 backdrop-blur-md"
                        >
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setIsAssignDialogOpen(true);
                            }}
                          >
                            <Target className="mr-2 h-4 w-4" />
                            Assign Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Workload Summary */}
                    <div className="grid grid-cols-3 gap-4 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {employee.workload.activeAssessments}
                        </p>
                        <p className="text-xs text-slate-600">Active</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {employee.workload.completedThisMonth}
                        </p>
                        <p className="text-xs text-slate-600">Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {employee.workload.avgCompletionTime}h
                        </p>
                        <p className="text-xs text-slate-600">Avg Time</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Performance
                        </span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(employee.performance.rating)
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-slate-600 ml-1">
                            {employee.performance.rating}
                          </span>
                        </div>
                      </div>
                      <PerformanceChart employee={employee} />
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">
                        Key Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {employee.skills.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-slate-100"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {employee.skills.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-slate-100"
                          >
                            +{employee.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-2 border-t border-slate-200/50">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsAssignDialogOpen(true);
                        }}
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Assign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Current Assignments
                </CardTitle>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead>Employee</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => {
                    const employee = staff.find(
                      (s) => s.id === assignment.employeeId
                    );
                    const daysUntilDue = Math.ceil(
                      (new Date(assignment.dueDate).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <TableRow
                        key={assignment.id}
                        className="hover:bg-slate-50/50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                                {employee?.firstName[0]}
                                {employee?.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-slate-800">
                                {employee?.firstName} {employee?.lastName}
                              </p>
                              <p className="text-sm text-slate-600">
                                {employee?.position}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-800">
                              {assignment.requestType
                                .replace("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </p>
                            <p className="text-sm text-slate-600">
                              {assignment.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-slate-800">
                            {assignment.customerName}
                          </p>
                          <p className="text-sm text-slate-600">
                            {assignment.requestId}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPriorityColor(assignment.priority)}
                          >
                            {assignment.priority.replace(/\b\w/g, (l) =>
                              l.toUpperCase()
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status
                              .replace("_", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`text-sm ${
                              daysUntilDue < 0
                                ? "text-red-600"
                                : daysUntilDue <= 1
                                ? "text-orange-600"
                                : "text-slate-600"
                            }`}
                          >
                            {new Date(assignment.dueDate).toLocaleDateString()}
                            <p className="text-xs">
                              {daysUntilDue < 0
                                ? `${Math.abs(daysUntilDue)} days overdue`
                                : daysUntilDue === 0
                                ? "Due today"
                                : `${daysUntilDue} days left`}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="w-20">
                            <Progress
                              value={
                                assignment.status === "completed"
                                  ? 100
                                  : assignment.status === "in_progress"
                                  ? 60
                                  : 20
                              }
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Assignment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reassign
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {staff.map((employee) => (
              <Card
                key={employee.id}
                className="bg-white/80 backdrop-blur-md border-0 shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {employee.position}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(employee.performance.rating)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600">
                        {employee.performance.rating}/5.0
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <PerformanceChart employee={employee} />

                  <div className="mt-4 grid grid-cols-2 gap-4 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">
                        {employee.workload.completedThisMonth}
                      </p>
                      <p className="text-xs text-slate-600">
                        Completed This Month
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">
                        {employee.workload.avgCompletionTime}h
                      </p>
                      <p className="text-xs text-slate-600">
                        Avg Completion Time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {["assessment", "consultation", "management"].map((dept) => {
              const deptStaff = staff.filter((s) => s.department === dept);
              const avgPerformance =
                deptStaff.reduce((sum, s) => sum + s.performance.rating, 0) /
                deptStaff.length;
              const totalSalary = deptStaff.reduce(
                (sum, s) => sum + s.salary,
                0
              );

              return (
                <Card
                  key={dept}
                  className="bg-white/80 backdrop-blur-md border-0 shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {dept.replace(/\b\w/g, (l) => l.toUpperCase())} Department
                    </CardTitle>
                    <CardDescription>
                      {deptStaff.length} employees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {deptStaff.length}
                        </p>
                        <p className="text-xs text-slate-600">Staff Count</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {avgPerformance.toFixed(1)}
                        </p>
                        <p className="text-xs text-slate-600">Avg Rating</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">
                        Team Members
                      </h4>
                      <div className="space-y-2">
                        {deptStaff.map((employee) => (
                          <div
                            key={employee.id}
                            className="flex items-center justify-between p-2 bg-slate-50 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                                  {employee.firstName[0]}
                                  {employee.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">
                                {employee.firstName} {employee.lastName}
                              </span>
                            </div>
                            <Badge
                              className={getAvailabilityColor(
                                employee.availability.status
                              )}
                              variant="secondary"
                            >
                              {employee.availability.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">
                          Total Department Cost
                        </span>
                        <span className="font-medium text-slate-800">
                          {formatCurrency(totalSalary)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Assignment Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-md max-w-2xl">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Assign New Task
            </DialogTitle>
            <DialogDescription>
              Assign a new task to {selectedEmployee?.firstName}{" "}
              {selectedEmployee?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taskType">Task Type</Label>
              <select
                id="taskType"
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value)}
                className="w-full border border-slate-200 rounded p-2"
              >
                <option value="assessment">Diamond Assessment</option>
                <option value="consultation">Customer Consultation</option>
                <option value="quality_check">Quality Check</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full border border-slate-200 rounded p-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Customer</Label>
              <Input placeholder="Customer name" />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea placeholder="Task description..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsAssignDialogOpen(false);
                toast.success("Task assigned successfully!");
              }}
            >
              Assign Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStaffManagement;
