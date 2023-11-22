import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

/**
 * 로그인 여부 검사 후 화면을 렌더링 하는 Wrapper 컴포넌트
 * @param param0
 * @returns
 */
const RequireAuth = function ({ children }: { children: JSX.Element }) {
  const { authStore } = useStores();

  if (!authStore.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
