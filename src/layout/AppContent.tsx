import React from "react";

import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import LeftSideMenu from "./LeftSideMenu";

function AppContent() {
  return (
    <>
      {/* Top NavBar */}
      <TopNavBar />
      {/* Left Side Menu */}
      <LeftSideMenu />
      <div className="content-page">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AppContent;
