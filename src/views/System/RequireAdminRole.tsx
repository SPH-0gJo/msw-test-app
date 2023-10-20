import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

function RequireAdminRole({ children }: { children: JSX.Element }) {
  const { authStore } = useStores();

  if (!authStore.isAdmin) {
    alert("관리자 권한만 이용가능합니다.");
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireAdminRole;
