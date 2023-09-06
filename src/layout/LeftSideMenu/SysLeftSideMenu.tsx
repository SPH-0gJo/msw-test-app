import React from "react";
import { getMenuLinks } from "./DashLeftSideMenu";
import { sysMenuInfoList } from "@/shared/var/menu";

const SysLeftSideMenu = function () {
  return (
    <div id="sys-left-side-menu" className="left-side-menu">
      <div className="side-menu-wrap" id="sidebar-menu">
        <div className="side-menu-title">시스템 관리</div>
        <ul className="side-menu">{getMenuLinks(sysMenuInfoList, 1)}</ul>
      </div>
    </div>
  );
};

export default SysLeftSideMenu;
