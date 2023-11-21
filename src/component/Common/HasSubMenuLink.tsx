import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuInfo } from "@/shared/var/menu";
import { getMenuLinks } from "@/layout/LeftSideMenu/DashLeftSideMenu";

interface HasSubMenuLinkProps {
  subMenues: MenuInfo[];
  icon?: React.ReactNode;
  title: string;
  level: number;
  to: string;
  url?: string;
}

/**
 * 서브메뉴나 서브메뉴의 자식
 * @param subMenues
 * @param pathname
 * @returns
 */
const getIsSubMenuActive = function (
  subMenues: MenuInfo[],
  pathname: string
): boolean {
  return subMenues.some(
    (e) => e.to === pathname || getIsSubMenuActive(e.children || [], pathname)
  );
};

function HasSubMenuLink({
  subMenues,
  icon,
  title,
  level,
  to,
}: HasSubMenuLinkProps) {
  const { pathname } = useLocation();

  const isMenuActive = useMemo(() => {
    const isMe = to === pathname;
    const isAnySubMenu = getIsSubMenuActive(subMenues, pathname);

    return isMe || isAnySubMenu;
  }, [to, pathname, subMenues]);

  return (
    <li
      className={`has-sub ${isMenuActive ? "is-open" : ""}`}
      onClick={() => {
        //onclick을 여기 달아서, 밑에 subMenu 누르면 이벤트가 전파되고, state가 바뀌어 리렌더링된다.
        //setIsOpen((prevState) => !prevState);
      }}
    >
      <NavLink to={to} className="side-nav-link" end>
        {icon ? icon : null}
        {level === 1 ? title : <span>{title}</span>}
      </NavLink>
      <ul
        onClick={(evt) => {
          //li 태그 이벤트 전파 방지
          evt.stopPropagation();
        }}
        className={`side-menu side-menu-level${level + 1}`}
        style={{ display: isMenuActive ? "" : "none" }}
      >
        {getMenuLinks(subMenues, level + 1)}
      </ul>
    </li>
  );
}

export default HasSubMenuLink;
