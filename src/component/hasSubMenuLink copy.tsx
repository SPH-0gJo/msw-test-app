import { MenuInfo } from "@/shared/var/menu";
import React, { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// type SubMenu = {
//   title: string;
//   to: string;
// };

type SubMenu = {
  [k in "to" | "title"]: MenuInfo[k];
};

type HasSubMenuLinkProps = {
  subMenues: SubMenu[];
  icon: React.ReactNode;
  title: string;
};

const getLinkClassName = function (isMenuActive: boolean, isOpen: boolean) {
  const activeClass = isMenuActive ? "active-page" : "";
  const openClass = isOpen ? "open" : "";
  return `${activeClass} ${openClass}`;
};

function HasSubMenuLink({ subMenues, icon, title }: HasSubMenuLinkProps) {
  const { pathname } = useLocation();

  const isMenuActive = useMemo(
    () => subMenues.reduce((prev, { to }) => prev || to === pathname, false),
    [pathname, subMenues]
  );

  const [isOpen, setIsOpen] = useState(false);

  console.log("----HasSubMenuLink Render----", isOpen);

  return (
    <li
      className={getLinkClassName(isMenuActive, isOpen)}
      onClick={() => {
        //onclick을 여기 달아서, 밑에 subMenu 누르면 이벤트가 전파되고, state가 바뀌어 리렌더링된다.
        setIsOpen((prevState) => !prevState);
      }}
    >
      <a href="#">
        {icon}
        {title}
        <i className="material-icons has-sub-menu">keyboard_arrow_right</i>
      </a>
      <ul
        onClick={(evt) => {
          //li 태그 이벤트 전파 방지
          evt.stopPropagation();
        }}
        className="sub-menu"
        style={{ display: isOpen ? "" : "none" }}
      >
        {subMenues.map(({ to, title }, i) => (
          <li key={i}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default HasSubMenuLink;
