import React from "react";
import { getMenuLinks } from "./DashLeftSideMenu";
import { sysMenuInfoList } from "@/shared/var/menu";
import Logo from "@/resources/images/logo-light.png";
import { rootPath } from "@/shared/env";

const SysLeftSideMenu = function () {
  return (
    <div id="sys-left-side-menu" className="left-side-menu">
      <div className="logo-box">
        <h1 className="logo">
          <a href={`/${rootPath}`} className="logo-link">
            <img src={Logo} alt="남양주 Logo" />
            <span className="logo-type">생생 시민소리 분석시스템</span>
          </a>
        </h1>
      </div>
      <div className="side-menu-wrap" id="sidebar-menu">
        <div className="side-menu-title">시스템 관리</div>
        <ul className="side-menu">{getMenuLinks(sysMenuInfoList, 1)}</ul>
      </div>
    </div>
  );
};

export default SysLeftSideMenu;
