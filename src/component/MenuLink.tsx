import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MenuLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { pathname } = useLocation();

  const isActive = useMemo(() => pathname === to, [pathname, to]);

  console.log("----MenuLink Render----", pathname);

  return (
    <li className={isActive ? "active-page" : ""}>
      <NavLink to={to} className="side-nav-link" end>
        {children}
      </NavLink>
    </li>
  );
}

export default MenuLink;
