import React from "react";
import { useStores } from "@/modules/Store";
import { Navigate } from "react-router-dom";

const Default = function () {
  const { authStore } = useStores();

  if (authStore.isAuthMenuListLoading) {
    return null;
  }
  return <Navigate to="/" />;
};

export default Default;
