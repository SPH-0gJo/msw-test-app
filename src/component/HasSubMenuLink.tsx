import React, { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MenuInfo } from "@/shared/var/menu";
import { getMenuLinks } from "@/layout/LeftSideMenu/DashLeftSideMenu";
// type SubMenu = {
//   title: string;
//   to: string;
// };

type HasSubMenuLinkProps = {
  subMenues: MenuInfo[];
  icon?: React.ReactNode;
  title: string;
  level: number;
  to: string;
};

const getLinkClassName = function (isMenuActive: boolean, isOpen: boolean) {
  //has-sub is-open
  const activeClass = isMenuActive ? "active-page" : ""; //css 추가 or a 태그에 적용 필요 (클래스네임 : active)
  const openClass = isOpen ? "is-open" : "";
  return `${activeClass} ${openClass}`;
};

function HasSubMenuLink({
  subMenues,
  icon,
  title,
  level,
  to,
}: HasSubMenuLinkProps) {
  const { pathname } = useLocation();

  const isMenuActive = useMemo(
    () => subMenues.reduce((prev, { to }) => prev || to === pathname, false),
    [pathname, subMenues]
  );

  const [isOpen, setIsOpen] = useState(false);

  console.log("----HasSubMenuLink Render----", isOpen);

  return (
    <li
      className={`has-sub ${getLinkClassName(isMenuActive, isOpen)}`}
      onClick={() => {
        //onclick을 여기 달아서, 밑에 subMenu 누르면 이벤트가 전파되고, state가 바뀌어 리렌더링된다.
        setIsOpen((prevState) => !prevState);
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
        style={{ display: isOpen ? "" : "none" }}
      >
        {getMenuLinks(subMenues, level + 1)}
      </ul>
    </li>
  );
}

export default HasSubMenuLink;
