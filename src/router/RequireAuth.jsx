import React from "react";
import AuthService from "../services/AuthService";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  let currentUser = AuthService.getIsLoggedIn();
  let location = useLocation();

  if (!currentUser) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
