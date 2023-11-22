import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

/**
 * 존재하지 않는 경로 요청시 Default 화면 컴포넌트
 * @returns
 */
const Default = function () {
  const { authStore } = useStores();

  if (authStore.isAuthMenuListLoading) {
    return null;
  }
  return <Navigate to="/" />;
};

export default Default;
