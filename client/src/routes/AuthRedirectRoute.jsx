import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthRedirectRoute({ children, userToken, redirectTo }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate(redirectTo || "/");
    }
  }, [userToken, navigate, redirectTo]);

  return <>{userToken ? null : children}</>;
}
