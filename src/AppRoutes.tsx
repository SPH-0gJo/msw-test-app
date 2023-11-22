import "@/resources/scss/main.scss";
import AppContent from "./layout/AppContent";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "@/views/Login/Login";

import User from "@/views/System/User/User";
import RequireAuth from "@/views/Login/RequireAuth";
import { MenuInfo } from "@/shared/var/menu";
import Dashboard from "@/views/Dashboard/Dashboard";
import Group from "@/views/System/Group/Group";
import Menu from "@/views/System/Menu/Menu";
import Authority from "@/views/System/Authority/Authority";
import Log from "@/views/System/Log/Log";
import SystemDefault from "@/views/SystemDefault";
import { rootPath } from "@/shared/env";
import { useStores } from "@/modules/Store";
import { observer } from "mobx-react";
import RequireAdminRole from "@/views/System/RequireAdminRole";
import Default from "@/views/Default";
import Index from "@/views/Index";

/**
 * 동적으로 대시보드 메뉴에 대응되는 Route를 생성하는 함수
 * @param menuInfoList
 * @returns
 */
const getRoutes = function (menuInfoList: MenuInfo[]) {
  return menuInfoList.map(({ path, children, id }) => {
    if (children && children?.length > 0) {
      return (
        <Route key={id} path={path}>
          {getRoutes(children)}
        </Route>
      );
    } else {
      return <Route key={id} path={path} />;
    }
  });
};
/**
 *  Router와 Route를 반환하는 컴포넌트 (경로와 컴포넌트를 매핑)
 * @returns
 */
const AppRoutes = function () {
  const { authStore } = useStores();

  const authMenuInfoList = authStore.authMenuInfoList;

  return (
    <BrowserRouter basename={`/${rootPath}`}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <AppContent />
            </RequireAuth>
          }
        >
          {/* "/" 요청시 라우팅 */}
          <Route index element={<Index />} />
          <Route element={<Dashboard />}>{getRoutes(authMenuInfoList)}</Route>
          <Route
            path="system"
            element={
              <RequireAdminRole>
                <Outlet />
              </RequireAdminRole>
            }
          >
            <Route index element={<SystemDefault />} />
            <Route path="group" index element={<Group />} />
            <Route path="user" element={<User />} />
            <Route path="menu" element={<Menu />} />
            <Route path="authority" element={<Authority />} />
            <Route path="log" element={<Log />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        {/* "/없는경로" 요청시 라우팅 */}
        <Route path="*" element={<Default />} />
      </Routes>
    </BrowserRouter>
  );
};

export default observer(AppRoutes);
