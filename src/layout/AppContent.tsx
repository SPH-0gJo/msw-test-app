import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import LeftSideMenu from "./LeftSideMenu";
import FoldableWrapper from "./FoldableWrapper";

import CustomToast from "@/component/Common/CustomToast";
import { ToastContainer } from "react-bootstrap";
import { loadLeftMenuScript } from "@/shared/layout";

const AppContent = function () {
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
};

export default AppContent;
