import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import "@/resources/scss/main.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Default from "./views/Default";
import DashBoard from "./views/DashBoard/DashBoard";
import Users from "./views/System/Users/Users";
import AuthStore from "./modules/Login/AuthStore";
import UserStore from "./modules/User/UserStore";
import RequireAuth from "./views/Login/RequireAuth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
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
          <Route index element={<Default />} />
          <Route path="dashboard" element={<DashBoard />}>
            <Route path="one" />
            <Route path="two">
              <Route path="twoOne" />
            </Route>
            <Route path="three">
              <Route path="threeOne">
                <Route path="threeOneTwo" />
              </Route>
            </Route>
          </Route>
          <Route path="system">
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);
