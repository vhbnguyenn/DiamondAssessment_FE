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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "lucide-react";
import { toast } from "sonner";
import type { User, Customer, Employee, UserRole } from "@/types";

interface ExtendedUser extends User {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  department?: string;
  position?: string;
  lastLogin?: string;
  accountStatus: "active" | "inactive" | "suspended";
}

const AdminUserManagement: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data
  const [users, setUsers] = useState<ExtendedUser[]>([
    {
      id: "1",
      email: "john.doe@customer.com",
      role: "customer",
      createdAt: "2024-01-15",
      updatedAt: "2025-01-20",
      isActive: true,
      firstName: "John",
      lastName: "Doe",
      phone: "+84 123 456 789",
      address: "123 Diamond Street, Ho Chi Minh City",
      lastLogin: "2025-01-22",
      accountStatus: "active",
    },
    {
      id: "2",
      email: "jane.smith@diamond.com",
      role: "assessment_staff",
      createdAt: "2023-06-01",
      updatedAt: "2025-01-21",
      isActive: true,
      firstName: "Jane",
      lastName: "Smith",
      phone: "+84 987 654 321",
      department: "assessment",
      position: "Senior Diamond Assessor",
      lastLogin: "2025-01-22",
      accountStatus: "active",
    },
    {
      id: "3",
      email: "mike.wilson@diamond.com",
      role: "consultant",
      createdAt: "2023-09-15",
      updatedAt: "2025-01-20",
      isActive: true,
      firstName: "Mike",
      lastName: "Wilson",
      phone: "+84 555 123 456",
      department: "consultation",
      position: "Diamond Consultant",
      lastLogin: "2025-01-21",
      accountStatus: "active",
    },
    {
      id: "4",
      email: "sarah.brown@diamond.com",
      role: "manager",
      createdAt: "2022-03-10",
      updatedAt: "2025-01-19",
      isActive: true,
      firstName: "Sarah",
      lastName: "Brown",
      phone: "+84 777 888 999",
      department: "management",
      position: "Operations Manager",
      lastLogin: "2025-01-22",
      accountStatus: "active",
    },
    {
      id: "5",
      email: "david.lee@customer.com",
      role: "customer",
      createdAt: "2024-12-01",
      updatedAt: "2025-01-18",
      isActive: false,
      firstName: "David",
      lastName: "Lee",
      phone: "+84 333 444 555",
      address: "456 Jewelry Lane, Ho Chi Minh City",
      lastLogin: "2025-01-15",
      accountStatus: "suspended",
    },
    {
      id: "6",
      email: "admin@diamond.com",
      role: "admin",
      createdAt: "2022-01-01",
      updatedAt: "2025-01-22",
      isActive: true,
      firstName: "Admin",
      lastName: "User",
      phone: "+84 111 222 333",
      department: "administration",
      position: "System Administrator",
      lastLogin: "2025-01-22",
      accountStatus: "active",
    },
  ]);

  const [newUser, setNewUser] = useState<Partial<ExtendedUser>>({
    email: "",
    role: "customer",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    accountStatus: "active",
  });

  const getRoleColor = (role: UserRole) => {
    const colors = {
      guest: "bg-gray-100 text-gray-700 border border-gray-200",
      customer: "bg-blue-100 text-blue-700 border border-blue-200",
      assessment_staff: "bg-green-100 text-green-700 border border-green-200",
      consultant: "bg-purple-100 text-purple-700 border border-purple-200",
      manager: "bg-orange-100 text-orange-700 border border-orange-200",
      admin: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[role] || colors.guest;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-700 border border-green-200",
      inactive: "bg-gray-100 text-gray-700 border border-gray-200",
      suspended: "bg-red-100 text-red-700 border border-red-200",
    };
    return colors[status] || colors.inactive;
  };

  const getRoleIcon = (role: UserRole) => {
    const icons = {
      guest: Users,
      customer: UserCheck,
      assessment_staff: Shield,
      consultant: Star,
      manager: Building,
      admin: UserPlus,
    };
    return icons[role] || Users;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.accountStatus === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.firstName || !newUser.lastName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user: ExtendedUser = {
        id: Date.now().toString(),
        email: newUser.email!,
        role: newUser.role as UserRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        address: newUser.address,
        department: newUser.department,
        position: newUser.position,
        accountStatus: newUser.accountStatus as
          | "active"
          | "inactive"
          | "suspended",
      };

      setUsers([...users, user]);
      setNewUser({
        email: "",
        role: "customer",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        department: "",
        position: "",
        accountStatus: "active",
      });
      setIsCreateDialogOpen(false);
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...selectedUser, updatedAt: new Date().toISOString() }
            : user
        )
      );

      setIsEditDialogOpen(false);
      setSelectedUser(null);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error("Please select users first");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (action === "activate") {
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, accountStatus: "active" as const, isActive: true }
              : user
          )
        );
        toast.success("Users activated successfully!");
      } else if (action === "suspend") {
        setUsers(
          users.map((user) =>
            selectedUsers.includes(user.id)
              ? {
                  ...user,
                  accountStatus: "suspended" as const,
                  isActive: false,
                }
              : user
          )
        );
        toast.success("Users suspended successfully!");
      }

      setSelectedUsers([]);
    } catch (error) {
      toast.error("Failed to perform bulk action");
    } finally {
      setIsLoading(false);
    }
  };

  const UserFormFields = ({
    user,
    setUser,
  }: {
    user: Partial<ExtendedUser>;
    setUser: (user: Partial<ExtendedUser>) => void;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={user.email || ""}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="user@example.com"
          className="bg-white/70 border-slate-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <Select
          value={user.role || "customer"}
          onValueChange={(value) =>
            setUser({ ...user, role: value as UserRole })
          }
        >
          <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="assessment_staff">Assessment Staff</SelectItem>
            <SelectItem value="consultant">Consultant</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <Input
          id="firstName"
          value={user.firstName || ""}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          placeholder="John"
          className="bg-white/70 border-slate-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <Input
          id="lastName"
          value={user.lastName || ""}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          placeholder="Doe"
          className="bg-white/70 border-slate-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={user.phone || ""}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          placeholder="+84 123 456 789"
          className="bg-white/70 border-slate-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Account Status</Label>
        <Select
          value={user.accountStatus || "active"}
          onValueChange={(value) =>
            setUser({
              ...user,
              accountStatus: value as "active" | "inactive" | "suspended",
            })
          }
        >
          <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {user.role === "customer" && (
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={user.address || ""}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            placeholder="Full address"
            className="bg-white/70 border-slate-200 focus:border-blue-500"
            rows={2}
          />
        </div>
      )}

      {user.role !== "customer" && user.role !== "guest" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={user.department || ""}
              onValueChange={(value) => setUser({ ...user, department: value })}
            >
              <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="administration">Administration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={user.position || ""}
              onChange={(e) => setUser({ ...user, position: e.target.value })}
              placeholder="Job title"
              className="bg-white/70 border-slate-200 focus:border-blue-500"
            />
          </div>
        </>
      )}
    </div>
  );

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-slate-600 mt-2">
            Manage users, roles, and permissions across the platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/70 hover:bg-white/90">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-md max-w-2xl">
              <DialogHeader>
                <DialogTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Create New User
                </DialogTitle>
                <DialogDescription>
                  Add a new user to the system with appropriate role and
                  permissions.
                </DialogDescription>
              </DialogHeader>
              <UserFormFields user={newUser} setUser={setNewUser} />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateUser} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create User"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={users.length.toString()}
          subtitle="All registered users"
          icon={Users}
          color="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Active Users"
          value={users
            .filter((u) => u.accountStatus === "active")
            .length.toString()}
          subtitle="Currently active"
          icon={UserCheck}
          color="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Staff Members"
          value={users
            .filter((u) =>
              ["assessment_staff", "consultant", "manager", "admin"].includes(
                u.role
              )
            )
            .length.toString()}
          subtitle="Internal employees"
          icon={Shield}
          color="from-purple-500 to-pink-500"
        />
        <StatsCard
          title="Customers"
          value={users.filter((u) => u.role === "customer").length.toString()}
          subtitle="External customers"
          icon={Star}
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            <Filter className="h-5 w-5" />
            Filter Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="assessment_staff">
                    Assessment Staff
                  </SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white/70 border-slate-200 focus:border-blue-500">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Bulk Actions</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("activate")}
                  disabled={selectedUsers.length === 0}
                  className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                >
                  <UserCheck className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("suspend")}
                  disabled={selectedUsers.length === 0}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                >
                  <UserX className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Users ({filteredUsers.length})
            </CardTitle>
            {selectedUsers.length > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {selectedUsers.length} selected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedUsers.length === paginatedUsers.length &&
                        paginatedUsers.length > 0
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUsers(paginatedUsers.map((u) => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <TableRow key={user.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers([...selectedUsers, user.id]);
                            } else {
                              setSelectedUsers(
                                selectedUsers.filter((id) => id !== user.id)
                              );
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <RoleIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-slate-600">
                              {user.email}
                            </p>
                            {user.phone && (
                              <p className="text-xs text-slate-500">
                                {user.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role
                            .replace("_", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.accountStatus)}>
                          {user.accountStatus.replace(/\b\w/g, (l) =>
                            l.toUpperCase()
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-slate-600">
                          {user.department?.replace(/\b\w/g, (l) =>
                            l.toUpperCase()
                          ) || "-"}
                        </span>
                        {user.position && (
                          <p className="text-xs text-slate-500">
                            {user.position}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm">
                            {user.lastLogin
                              ? new Date(user.lastLogin).toLocaleDateString()
                              : "Never"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Calendar className="h-3 w-3" />
                          <span className="text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
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
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.accountStatus === "active" ? (
                              <DropdownMenuItem
                                onClick={() => {
                                  setUsers(
                                    users.map((u) =>
                                      u.id === user.id
                                        ? {
                                            ...u,
                                            accountStatus: "suspended",
                                            isActive: false,
                                          }
                                        : u
                                    )
                                  );
                                  toast.success("User suspended");
                                }}
                                className="text-orange-600 focus:text-orange-600"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => {
                                  setUsers(
                                    users.map((u) =>
                                      u.id === user.id
                                        ? {
                                            ...u,
                                            accountStatus: "active",
                                            isActive: true,
                                          }
                                        : u
                                    )
                                  );
                                  toast.success("User activated");
                                }}
                                className="text-green-600 focus:text-green-600"
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-slate-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} results
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-md max-w-2xl">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Edit User
            </DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserFormFields
              user={selectedUser}
              setUser={(userUpdate: Partial<ExtendedUser>) =>
                setSelectedUser((prev) =>
                  prev ? { ...prev, ...userUpdate } : prev
                )
              }
            />
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-white/95 backdrop-blur-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>
                {selectedUser?.firstName} {selectedUser?.lastName}
              </strong>
              ? This action cannot be undone and will permanently remove all
              user data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete User"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUserManagement;
