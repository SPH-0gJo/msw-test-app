import React from "react";

const DashLeftSideMenu = function () {
  return (
    <div className="left-side-menu">
      <div className="side-menu-wrap" id="sidebar-menu">
        <ul className="side-menu side-menu-level1">
          <li className="has-sub is-open">
            <a href="javascript:void(0);" className="side-nav-link">
              <i className="mdi mdi mdi-chart-box-outline" />
              <span>생생 시민소리</span>
            </a>
            <ul className="side-menu side-menu-level2">
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  키워드 분석
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  감정 분석
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  게시글 분석
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  채널 분석
                </a>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a href="javascript:void(0);" className="side-nav-link">
              <i className="mdi mdi-chart-pie-outline" />
              <span>뉴스 분석</span>
            </a>
            <ul className="side-menu side-menu-level2">
              <li className="has-sub">
                <a href="javascript:void(0);" className="side-nav-link">
                  메뉴 레벨 2
                </a>
                <ul className="side-menu side-menu-level3">
                  <li>
                    <a href="javascript:void(0);" className="side-nav-link">
                      메뉴 레벨 3
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="side-nav-link">
                      메뉴 레벨 3
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  메뉴 레벨 2
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  메뉴 레벨 2
                </a>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a href="javascript:void(0);" className="side-nav-link">
              <i className="mdi mdi-view-dashboard-outline" />
              <span>시정 민원</span>
            </a>
            <ul className="side-menu side-menu-level2">
              <li className="has-sub">
                <a href="javascript:void(0);" className="side-nav-link">
                  메뉴 레벨 2
                </a>
                <ul className="side-menu side-menu-level3">
                  <li>
                    <a href="javascript:void(0);" className="side-nav-link">
                      메뉴 레벨 3
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="side-nav-link">
                      메뉴 레벨 3
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  메뉴 레벨 2
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="side-nav-link">
                  메뉴 레벨 2
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashLeftSideMenu;
