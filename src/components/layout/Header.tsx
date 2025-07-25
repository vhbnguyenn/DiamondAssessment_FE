import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Diamond, User, LogOut, Settings, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (email) => {
    return email.substring(0, 2).toUpperCase();
  };

  const getRoleName = (role) => {
    const roleNames = {
      admin: "Administrator",
      manager: "Manager",
      consultant: "Consultant",
      assessment_staff: "Assessment Staff",
      customer: "Customer",
      guest: "Guest",
    };
    return roleNames[role] || role;
  };

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {isAuthenticated ? (
              <span
                className="flex items-center space-x-3 cursor-default select-none"
                aria-disabled="true"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-md opacity-70"></div>
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Diamond className="h-5 w-5 lg:h-6 lg:w-6 text-white animate-pulse" />
                  </div>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Diamond Assessment
                </span>
              </span>
            ) : (
              <Link
                to="/"
                className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Diamond className="h-5 w-5 lg:h-6 lg:w-6 text-white animate-pulse" />
                  </div>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Diamond Assessment
                </span>
              </Link>
            )}

            {!isAuthenticated && (
              <nav className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                ))}
              </nav>
            )}

            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 lg:h-12 lg:w-12 rounded-full hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <Avatar className="h-10 w-10 lg:h-12 lg:w-12 ring-2 ring-transparent group-hover:ring-blue-300 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold text-sm">
                          {getInitials(user.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-64 bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-2xl rounded-2xl mt-2"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal p-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs">
                              {getInitials(user.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 leading-none">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {getRoleName(user.role)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200/50" />
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard")}
                      className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer p-3 mx-2 rounded-lg"
                    >
                      <User className="mr-3 h-4 w-4 text-blue-600" />
                      <span className="font-medium">Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/profile")}
                      className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer p-3 mx-2 rounded-lg"
                    >
                      <Settings className="mr-3 h-4 w-4 text-gray-600" />
                      <span className="font-medium">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200/50" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-red-50 transition-colors duration-200 cursor-pointer p-3 mx-2 rounded-lg text-red-600"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/login")}
                    className="hidden sm:inline-flex font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium px-6"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium py-3 px-4 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start font-medium hover:bg-blue-50 hover:text-blue-600"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
