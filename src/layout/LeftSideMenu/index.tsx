import React from "react";
import DashLeftSideMenu from "@/layout/LeftSideMenu/DashLeftSideMenu";
import { useLocation } from "react-router-dom";
import SysLeftSideMenu from "@/layout/LeftSideMenu/SysLeftSideMenu";
import "./index.scss";
import FoldableWrapper, {
  FoldableWrapperProps,
} from "@/layout/FoldableWrapper";
import { rootPath } from "@/shared/env";
import Logo from "@/resources/images/logo-light.png";

const LeftSideMenu = function () {
  const { pathname } = useLocation();

  //Dashboard 기준
  let SidebarMenu: JSX.Element = <DashLeftSideMenu />;
  let folderWrapperProps: FoldableWrapperProps = {
    classNm: "left-side-menu",
  };

  if (pathname.startsWith("/system")) {
    SidebarMenu = <SysLeftSideMenu />;
    folderWrapperProps = {
      ...folderWrapperProps,
      id: "sys-left-side-menu",
    };
  }

  return (
    <FoldableWrapper {...folderWrapperProps}>
      <div className="logo-box">
        <h1 className="logo">
          <a href={`/${rootPath}`} className="logo-link">
            <img src={Logo} alt="남양주 Logo" />
            <span className="logo-type">생생 시민소리 분석시스템</span>
          </a>
        </h1>
      </div>
      {SidebarMenu}
    </FoldableWrapper>
  );
};

export default LeftSideMenu;
