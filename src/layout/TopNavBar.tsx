import React, { useCallback } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useStores } from "@/modules/Store";
import { observer } from "mobx-react";
import { useModal } from "@/shared/hooks/modal";
import ProfileModifyModal from "@/component/Profile/ProfileModifyModal";
import FoldableWrapper from "@/layout/FoldableWrapper";

/**
 * 프로필 영역과 햄버거 메뉴를 포함한 상단바 컴포넌트
 * @returns
 */
const TopNavBar = function () {
  const { authStore } = useStores();

  const isAdmin = authStore.isAdmin;
  const userInfo = authStore.userInfo;
  const userName = userInfo?.userName || "";

  //수정 모달
  const { modalShow: modModalShow, toggleModal: toggleModModal } = useModal();

  const navigate = useNavigate();

  const handleLogoutBtnClick = useCallback(function () {
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
          <NavDropdown title={userName} id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={() => {
                toggleModModal();
              }}
            >
              사용자 정보
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {isAdmin ? (
              <NavDropdown.Item onClick={handleSysPageBtnClick}>
                관리자 페이지
              </NavDropdown.Item>
            ) : null}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogoutBtnClick}>
              로그아웃
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
      <ProfileModifyModal
        show={modModalShow}
        toggleShow={toggleModModal}
        onSubmitSuccess={() => {}}
        user={userInfo}
      />
    </FoldableWrapper>
  );
};

export default observer(TopNavBar);
