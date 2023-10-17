import HasSubMenuLink from "@/component/HasSubMenuLink";
import MenuLink from "@/component/MenuLink";
import { authMenuInfoList } from "@/shared/var/authMenu";
import { MenuInfo, menuInfoList } from "@/shared/var/menu";
import React from "react";

export const getMenuLinks = function (menuInfoList: MenuInfo[], level: number) {
  return menuInfoList.map(({ children, title, to, icon, url }) => {
    if (children && children.length > 0) {
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
    <div className="side-menu-wrap" id="sidebar-menu">
      <ul className="side-menu side-menu-level1">
        {getMenuLinks(authMenuInfoList, 1)}
      </ul>
    </div>
  );
};

export default DashLeftSideMenu;
