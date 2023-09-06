import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MenuLink({
  to,
  children,
  url,
  icon,
}: {
  to: string;
  url?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const { pathname } = useLocation();

  const isActive = useMemo(() => pathname === to, [pathname, to]);

  console.log("----MenuLink Render----", pathname, to);

  return (
    <li
      className={isActive ? "active-page" : ""}
      onClick={(evt) => {
        //li 태그 이벤트 전파 방지
        evt.stopPropagation();
      }}
    >
      <NavLink to={to} state={{ url }} className="side-nav-link" end>
        {icon ? icon : null}
        {children}
      </NavLink>
    </li>
  );
}

export default MenuLink;
