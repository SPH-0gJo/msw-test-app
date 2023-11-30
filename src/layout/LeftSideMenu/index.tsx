import React from "react";
import DashLeftSideMenu from "@/layout/LeftSideMenu/DashLeftSideMenu";
import { useLocation } from "react-router-dom";
import SysLeftSideMenu from "@/layout/LeftSideMenu/SysLeftSideMenu";
import FoldableWrapper, {
  FoldableWrapperProps,
} from "@/layout/FoldableWrapper";
import { nyjRootPath } from "@/shared/env";
import Logo from "@/resources/images/logo-light.png";

/**
 * 화면 전체 레이아웃에서 로고를 포함한 메뉴바 영역을 렌더링하는 컴포넌트
 * @returns
 */
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
          <a href={`/${nyjRootPath}`} className="logo-link">
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
