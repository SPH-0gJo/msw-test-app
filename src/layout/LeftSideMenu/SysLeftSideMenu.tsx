import React from "react";

const SysLeftSideMenu = function () {
  return (
    <div className="left-side-menu">
      <div className="side-menu-wrap" id="sidebar-menu">
        <div className="side-menu-title">시스템 관리</div>
        <ul className="side-menu">
          <li className="side-nav-item">
            <a href="" className="side-nav-link">
              <i className="mdi mdi-account-group-outline" />
              <span>그룹 관리</span>
            </a>
          </li>
          <li className="side-nav-item menuitem-active">
            <a href="" className="side-nav-link">
              <i className="mdi mdi-card-account-details-outline" />
              <span>사용자 관리</span>
            </a>
          </li>
          <li className="side-nav-item">
            <a href="" className="side-nav-link">
              <i className="mdi mdi-folder-wrench-outline" />
              <span>메뉴 관리</span>
            </a>
          </li>
          <li className="side-nav-item">
            <a href="" className="side-nav-link">
              <i className="mdi mdi-lock-outline" />
              <span>접근 권한 관리</span>
            </a>
          </li>
          <li className="side-nav-item">
            <a href="" className="side-nav-link">
              <i className="mdi mdi-history" />
              <span>접속 이력</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SysLeftSideMenu;
