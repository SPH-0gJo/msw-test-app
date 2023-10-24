import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

function RequireAdminRole({ children }: { children: JSX.Element }) {
  const {
    authStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  if (!authStore.isAdmin) {
    customAlert("관리자 권한만 이용가능합니다.", "FAIL");
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireAdminRole;
