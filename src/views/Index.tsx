import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

const Index = function () {
  const { authStore } = useStores();

  const authMenuInfoList = authStore.authMenuInfoList;

  // / 최상단 메뉴로 이동
  if (authMenuInfoList.length > 0) {
    return <Navigate to={authMenuInfoList[0].to} />;
  }

  //authMenuList.length가 0인 경우 (권한 있는 메뉴가 없는 경우)
  return null;
};

export default Index;
