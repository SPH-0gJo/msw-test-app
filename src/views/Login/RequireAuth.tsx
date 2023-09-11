import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { authStore } = useStores();

  if (!authStore.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
