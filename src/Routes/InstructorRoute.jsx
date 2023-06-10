import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { useIsInstructor } from "../hooks/useIsInstructor";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [isInstructorData, isInstructorLoading] = useIsInstructor();

  if (loading || isInstructorLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user || isInstructorData) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default InstructorRoute;
