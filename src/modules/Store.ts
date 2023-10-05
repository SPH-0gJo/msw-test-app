import React from "react";
import AccountStore from "./Account/AccountStore";
import DashboardStore from "./Dashboard/DashboardStore";
import GroupStore from "./Group/GroupStore";
import AuthStore from "./Login/AuthStore";
import UserStore from "./User/UserStore";
import AuthorityStore from "./Authority/AuthorityStore";
import MenuStore from "./Menu/MenuStore";

export class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  dashboardStore: DashboardStore;
  groupStore: GroupStore;
  accountStore: AccountStore;
  authorityStore: AuthorityStore;
  menuStore: MenuStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
    this.dashboardStore = new DashboardStore(this);
    this.groupStore = new GroupStore(this);
    this.accountStore = new AccountStore(this);
    this.authorityStore = new AuthorityStore(this);
    this.menuStore = new MenuStore(this);
  }
}

export const stores = new RootStore();
const StoreContext = React.createContext(stores);
export const StoreProvider = StoreContext.Provider;
export const useStores = () => React.useContext(StoreContext);
