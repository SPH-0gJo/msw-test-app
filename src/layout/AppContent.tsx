import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import LeftSideMenu from "./LeftSideMenu";
import FoldableWrapper from "./FoldableWrapper";
import loadLeftMenuScript from "@/main";
import CustomToast from "@/component/ui-components/CustomToast";
import { ToastContainer } from "react-bootstrap";

function AppContent() {
  useEffect(() => {
    loadLeftMenuScript();
  }, []);

  return (
    <>
      <ToastContainer position="top-center">
        <CustomToast />
      </ToastContainer>
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
