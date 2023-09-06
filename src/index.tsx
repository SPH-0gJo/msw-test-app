import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import "@/resources/scss/main.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Default from "./views/Default";

import Users from "./views/System/Users/Users";
import AuthStore from "./modules/Login/AuthStore";
import UserStore from "./modules/User/UserStore";
import RequireAuth from "./views/Login/RequireAuth";
import { MenuInfo, menuInfoList } from "./shared/var/menu";
import Dashboard from "./views/Dashboard/Dashboard";
import DashboardStore from "./modules/Dashboard/DashboardStore";

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
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
    this.dashboardStore = new DashboardStore(this);
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
            <Route path="user" element={<Users />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        {/* "/없는경로" 요청시 라우팅 */}
        <Route path="*" element={<Default />} />
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);
