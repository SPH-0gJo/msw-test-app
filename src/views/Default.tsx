import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

const Default = function () {
  const { authStore } = useStores();

  const authMenuInfoList = authStore.authMenuInfoList;
  const navToUrl = authMenuInfoList.length > 0 ? authMenuInfoList[0].to : "/";

  return <Navigate to={navToUrl} />;
};

export default Default;
