import HasSubMenuLink from "@/component/HasSubMenuLink";
import MenuLink from "@/component/MenuLink";
import { MenuInfo, menuInfoList } from "@/shared/var/menu";
import React from "react";

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
      <div className="side-menu-wrap" id="sidebar-menu">
        <ul className="side-menu side-menu-level1">
          {getMenuLinks(menuInfoList, 1)}
        </ul>
      </div>
    </div>
  );
};

export default DashLeftSideMenu;
