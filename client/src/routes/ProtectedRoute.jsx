import React from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children, userToken }) {
  const navigate = useNavigate();
  if (userToken) {
    return <>{children}</>;
  } else {
    navigate("/login");
    return null;
  }
}
