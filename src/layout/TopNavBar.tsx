import React from "react";
import Logo from "@/resources/images/logo-light.png";

const TopNavBar = function () {
  return (
    <div className="top-nav">
      <div className="logo-box">
        <h1 className="logo">
          <a href="/" className="logo-link">
            <img src={Logo} alt="남양주 Logo" />
            <span className="logo-type">생생 시민소리 분석시스템</span>
          </a>
        </h1>
      </div>
      <div className="top-nav-right">
        <h2 className="page-title">생생 시민소리</h2>
        <div className="user-menu">
          <div className="user-menu-icon">
            <i className="fe-user" />
          </div>
          <div className="user-menu-dropdown">
            <a href="#">
              관리자 <i className="mdi mdi-chevron-down" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
