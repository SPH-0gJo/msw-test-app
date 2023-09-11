import React, { useCallback } from "react";
import Logo from "@/resources/images/logo-light.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useStores } from "@/modules/Store";

const TopNavBar = function () {
  const { authStore } = useStores();

  const navigate = useNavigate();

  const handleLogoutBtnClick = useCallback(function () {
    console.log("click user logout");

    authStore.logUserOut();
    navigate("/login");
  }, []);

  const handleSysPageBtnClick = useCallback(() => {
    navigate("/system");
  }, []);

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
          {/* <div className="user-menu-dropdown">
            <a href="#">
              관리자 <i className="mdi mdi-chevron-down" />
            </a>
          </div> */}
          <NavDropdown title={"사용자"} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogoutBtnClick}>
              로그아웃
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleSysPageBtnClick}>
              관리자 페이지
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
