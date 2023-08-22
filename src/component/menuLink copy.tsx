import React, { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function MenuLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { pathname } = useLocation();

  const isActive = useMemo(() => pathname === to, [pathname, to]);

  console.log("----MenuLink Render----", pathname);

  return (
    <li className={isActive ? "is-open" : ""}>
      <NavLink to={to} className={isActive ? "active" : ""} end>
        {children}
      </NavLink>
    </li>
  );
}

export default MenuLink;
