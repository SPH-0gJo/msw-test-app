//import "./index.css";
import "@/resources/scss/main.scss";
import AppContent from "./layout/AppContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Default from "./views/Default";

import User from "./views/System/User/User";
import RequireAuth from "./views/Login/RequireAuth";
import { MenuInfo, menuInfoList } from "./shared/var/menu";
import Dashboard from "./views/Dashboard/Dashboard";
import Group from "./views/System/Group/Group";
import Menu from "./views/System/Menu/Menu";
import Authority from "./views/System/Authority/Authority";
import Log from "./views/System/Log/Log";
import SystemDefault from "./views/SystemDefault";
import { rootPath } from "@/shared/env";
import { useStores } from "@/modules/Store";
import { observer } from "mobx-react";

const getRoutes = function (menuInfoList: MenuInfo[]) {
  return menuInfoList.map(({ path, children }) => {
    if (children && children?.length > 0) {
      return <Route path={path}>{getRoutes(children)}</Route>;
    } else {
      return <Route path={path} />;
    }
  });
};

const AppRoutes = function () {
  const { authStore } = useStores();

  const authMenuInfoList = authStore.authMenuInfoList;

  return (
    // <StoreProvider value={stores}>
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
          <Route index element={<Default />} />
          <Route element={<Dashboard />}>{getRoutes(authMenuInfoList)}</Route>
          <Route path="system">
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
    // </StoreProvider>
  );
};

export default observer(AppRoutes);
