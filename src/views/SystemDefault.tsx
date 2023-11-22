import React from "react";
import { Navigate } from "react-router-dom";

/**
 * 시스템 관리 화면의 Default 화면 컴포넌트
 * @returns
 */
const SystemDefault = function () {
  return <Navigate to="/system/group" />;
};

export default SystemDefault;
