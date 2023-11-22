import HasSubMenuLink from "@/component/Common/HasSubMenuLink";
import MenuLink from "@/component/Common/MenuLink";
import { useStores } from "@/modules/Store";
import { MenuInfo } from "@/shared/var/menu";
import { observer } from "mobx-react";
import React from "react";

/**
 * 권한있는 메뉴 목록 데이터를 바탕으로 대시보드, 관리자 메뉴 목록 컴포넌트를 생성하는 함수
 * @param menuInfoList
 * @param level
 * @returns
 */
export const getMenuLinks = function (menuInfoList: MenuInfo[], level: number) {
  return menuInfoList.map(({ children, title, to, icon, url, id }) => {
    if (children && children.length > 0) {
      return (
        <HasSubMenuLink
          key={id}
          icon={
            level === 1 ? <i className={"mdi mdi-chart-box-outline"} /> : null
          }
          title={title}
          subMenues={children}
          level={level}
          to={to}
          url={url}
        />
      );
    } else {
      return (
        <MenuLink
          key={id}
          icon={icon ? <i className={icon} /> : null}
          to={to}
          url={url}
        >
          {title}
        </MenuLink>
      );
    }
  });
};

/**
 * 대시보드 화면의 메뉴바 컴포넌트
 * @returns
 */
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
