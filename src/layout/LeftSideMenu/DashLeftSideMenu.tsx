import HasSubMenuLink from "@/component/HasSubMenuLink";
import MenuLink from "@/component/MenuLink";
import { MenuInfo, menuInfoList } from "@/shared/var/menu";
import React from "react";
import Logo from "@/resources/images/logo-light.png";
import { rootPath } from "@/shared/env";

export const getMenuLinks = function (menuInfoList: MenuInfo[], level: number) {
  return menuInfoList.map(({ children, title, to, icon, url }) => {
    if (children) {
      return (
        <HasSubMenuLink
          icon={icon ? <i className={icon} /> : null}
          title={title}
          subMenues={children}
          level={level}
          to={to}
          url={url}
        />
      );
    } else {
      return (
        <MenuLink icon={icon ? <i className={icon} /> : null} to={to} url={url}>
          {title}
        </MenuLink>
      );
    }
  });
};

const DashLeftSideMenu = function () {
  return (
    <div className="left-side-menu">
      <div className="logo-box">
        <h1 className="logo">
          <a href={`/${rootPath}`} className="logo-link">
            <img src={Logo} alt="남양주 Logo" />
            <span className="logo-type">생생 시민소리 분석시스템</span>
          </a>
        </h1>
      </div>
      <div className="side-menu-wrap" id="sidebar-menu">
        <ul className="side-menu side-menu-level1">
          {getMenuLinks(menuInfoList, 1)}
        </ul>
      </div>
    </div>
  );
};

export default DashLeftSideMenu;
