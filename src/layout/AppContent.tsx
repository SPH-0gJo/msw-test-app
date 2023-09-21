import React from "react";

import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import LeftSideMenu from "./LeftSideMenu";
import FoldableWrapper from "./FoldableWrapper";

function AppContent() {
  return (
    <>
      {/* Top NavBar */}
      <TopNavBar />
      {/* Left Side Menu */}
      <LeftSideMenu />
      <FoldableWrapper classNm="content-page">
        <div className="content">
          <Outlet />
        </div>
      </FoldableWrapper>
    </>
  );
}

export default AppContent;
