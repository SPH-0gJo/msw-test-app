import React from "react";
import DashLeftSideMenu from "./DashLeftSideMenu";
import { useLocation } from "react-router-dom";
import SysLeftSideMenu from "./SysLeftSideMenu";

const LeftSideMenu = function () {
  const { pathname } = useLocation();
  console.log("----pathname----", pathname);
  return pathname.startsWith("/system") ? (
    <SysLeftSideMenu />
  ) : (
    <DashLeftSideMenu />
  );
};

export default LeftSideMenu;
