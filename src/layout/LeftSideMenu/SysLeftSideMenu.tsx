import React from "react";
import { getMenuLinks } from "@/layout/LeftSideMenu/DashLeftSideMenu";
import { sysMenuInfoList } from "@/shared/var/menu";

/**
 * 관리자 화면의 메뉴바 컴포넌트
 * @returns
 */
const SysLeftSideMenu = function () {
  return (
    <div className="side-menu-wrap" id="sidebar-menu">
      <div className="side-menu-title">시스템 관리</div>
      <ul className="side-menu">{getMenuLinks(sysMenuInfoList, 1)}</ul>
    </div>
  );
};

export default SysLeftSideMenu;
