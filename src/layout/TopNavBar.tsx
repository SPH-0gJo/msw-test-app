import React, { useCallback } from "react";
import Logo from "@/resources/images/logo-light.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useStores } from "@/modules/Store";
import FoldableWrapper from "./FoldableWrapper";

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
    <FoldableWrapper classNm="top-nav">
      <div className="top-nav-right">
        <button className="btn-menu" id="btnMenu">
          <i className="fe-menu"></i>
        </button>
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
    </FoldableWrapper>
  );
};

export default TopNavBar;
