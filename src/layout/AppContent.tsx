import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import TopNavBar from "@/layout/TopNavBar";
import LeftSideMenu from "@/layout/LeftSideMenu";
import FoldableWrapper from "@/layout/FoldableWrapper";

import CustomToast from "@/component/Common/CustomToast";
import { ToastContainer } from "react-bootstrap";
import { loadLeftMenuScript } from "@/shared/layout";

/**
 * 로그인을 제외한 관리시스템 메뉴 화면 앱 전체를 감싸는 컴포넌트
 * @returns
 */
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
