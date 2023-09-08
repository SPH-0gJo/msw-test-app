import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import "@/resources/scss/main.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Default from "./views/Default";

import User from "./views/System/User/User";
import AuthStore from "./modules/Login/AuthStore";
import UserStore from "./modules/User/UserStore";
import RequireAuth from "./views/Login/RequireAuth";
import { MenuInfo, menuInfoList } from "./shared/var/menu";
import Dashboard from "./views/Dashboard/Dashboard";
import DashboardStore from "./modules/Dashboard/DashboardStore";
import Group from "./views/System/Group/Group";
import Menu from "./views/System/Menu/Menu";
import Authority from "./views/System/Authority/Authority";
import Log from "./views/System/Log/Log";
import SystemDefault from "./views/SystemDefault";
import GroupStore from "./modules/Group/GroupStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const getRoutes = function (menuInfoList: MenuInfo[]) {
  return menuInfoList.map(({ path, children }) => {
    if (children) {
      return <Route path={path}>{getRoutes(children)}</Route>;
    } else {
      return <Route path={path} />;
    }
  });
};

export class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  dashboardStore: DashboardStore;
  groupStore: GroupStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
    this.dashboardStore = new DashboardStore(this);
    this.groupStore = new GroupStore(this);
  }
}

const stores = new RootStore();

const StoreContext = React.createContext(stores);
const StoreProvider = StoreContext.Provider;
export const useStores = () => React.useContext(StoreContext);

root.render(
  <StoreProvider value={stores}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        >
          {/* "/" 요청시 라우팅 */}
          <Route index element={<Default />} />
          <Route element={<Dashboard />}>{getRoutes(menuInfoList)}</Route>
          {/* <Route path="dashboard" element={<Dashboard />}>
            <Route path="one" />
            <Route path="two">
              <Route path="twoOne" />
            </Route>
            <Route path="three">
              <Route path="threeOne">
                <Route path="threeOneTwo" />
              </Route>
            </Route>
          </Route> */}
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
  </StoreProvider>
);
