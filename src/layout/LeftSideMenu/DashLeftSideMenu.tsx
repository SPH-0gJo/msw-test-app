import HasSubMenuLink from "@/component/HasSubMenuLink";
import MenuLink from "@/component/MenuLink";
import { useStores } from "@/modules/Store";
import { MenuInfo } from "@/shared/var/menu";
import { observer } from "mobx-react";
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
  const { authStore } = useStores();

  const authMenuInfoList = authStore.authMenuInfoList;

  return (
    <div className="side-menu-wrap" id="sidebar-menu">
      <ul className="side-menu side-menu-level1">
        {getMenuLinks(authMenuInfoList, 1)}
      </ul>
    </div>
  );
};

export default observer(DashLeftSideMenu);
