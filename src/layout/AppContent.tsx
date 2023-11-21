import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import LeftSideMenu from "./LeftSideMenu";
import FoldableWrapper from "./FoldableWrapper";

import CustomToast from "@/component/Common/CustomToast";
import { ToastContainer } from "react-bootstrap";

//MenuBar 접고 피는 코드 작성...
const loadLeftMenuScript = () => {
  const btnMenu = document.querySelector(".btn-menu");
  const leftSideMenu = document.querySelector(".left-side-menu");
  const contentPage = document.querySelector(".content-page");
  const topNav = document.querySelector(".top-nav");

  btnMenu?.addEventListener("click", function () {
    leftSideMenu?.classList.toggle("fold");
    contentPage?.classList.toggle("fold");
    topNav?.classList.toggle("fold");
  });
};

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
