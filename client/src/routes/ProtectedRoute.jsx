import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children, userToken, redirectTo }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate(redirectTo || "/login");
    }
  }, [userToken, navigate, redirectTo]);

  return <>{userToken ? children : null}</>;
}
