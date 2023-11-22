import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

/**
 * 관리자 권한 여부 검사 후 화면을 렌더링 하는 Wrapper 컴포넌트
 * @param param0
 * @returns
 */
const RequireAdminRole = function ({ children }: { children: JSX.Element }) {
  const {
    authStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  if (!authStore.isAdmin) {
    customAlert("관리자 권한만 이용가능합니다.", "FAIL");
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAdminRole;
