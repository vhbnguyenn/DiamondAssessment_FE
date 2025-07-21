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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Camera,
  Save,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Crown,
  Briefcase,
  Headphones,
  Users,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: user?.email || "",
    phone: "+84 123 456 789",
    address: "123 Diamond Street, Ho Chi Minh City",
    dateOfBirth: "1990-01-15",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const getRoleIcon = (role: string) => {
    const roleIcons: Record<
      string,
      React.ComponentType<{ className?: string }>
    > = {
      customer: User,
      assessment_staff: Users,
      consultant: Headphones,
      manager: Briefcase,
      admin: Crown,
    };
    return roleIcons[role] || User;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setErrors({ newPassword: "Password must be at least 8 characters" });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!user) return null;

  const RoleIcon = getRoleIcon(user.role);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-slate-600 mt-2">
            Manage your account settings and personal information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${getRoleColor(
                    user.role
                  )} rounded-full flex items-center justify-center shadow-lg mx-auto`}
                >
                  <RoleIcon className="h-12 w-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <Camera className="h-4 w-4 text-white" />
                </button>
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {profileForm.firstName} {profileForm.lastName}
              </CardTitle>
              <CardDescription className="text-slate-600">
                {getRoleDisplay(user.role)}
              </CardDescription>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-200/50 rounded-full px-4 py-2 mt-4">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {getRoleDisplay(user.role)}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
                  <Mail className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700 truncate">
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
                  <Calendar className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-700">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">Account Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Update your personal details and contact information
                </CardDescription>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="bg-white/70 border border-slate-200 hover:bg-white/90 text-slate-700 hover:border-blue-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-slate-700 font-medium"
                    >
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileForm.firstName}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-slate-700 font-medium"
                    >
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileForm.lastName}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

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
                        value={profileForm.email}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-slate-700 font-medium"
                    >
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="address"
                      className="text-slate-700 font-medium"
                    >
                      Address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="address"
                        name="address"
                        value={profileForm.address}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-slate-700 font-medium"
                    >
                      Date of Birth
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={profileForm.dateOfBirth}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing}
                        className="pl-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Security Settings
              </CardTitle>
              <CardDescription className="text-slate-600">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="currentPassword"
                    className="text-slate-700 font-medium"
                  >
                    Current Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showOldPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordInputChange}
                      className="pl-10 pr-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-slate-700 font-medium"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordInputChange}
                      className="pl-10 pr-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                  {errors.newPassword && (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        {errors.newPassword}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-slate-700 font-medium"
                  >
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordInputChange}
                      className="pl-10 pr-10 bg-white/70 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">
                        {errors.confirmPassword}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !passwordForm.currentPassword ||
                    !passwordForm.newPassword ||
                    !passwordForm.confirmPassword
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
