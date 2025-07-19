import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  fallbackPath = "/login",
}) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
