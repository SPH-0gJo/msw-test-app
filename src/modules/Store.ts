import React from "react";
import AccountStore from "@/modules/Account/AccountStore";
import DashboardStore from "@/modules/Dashboard/DashboardStore";
import GroupStore from "@/modules/Group/GroupStore";
import AuthStore from "@/modules/Login/AuthStore";
import AuthorityStore from "@/modules/Authority/AuthorityStore";
import MenuStore from "@/modules/Menu/MenuStore";
import LogStore from "@/modules/Log/LogStore";
import CommonStore from "@/modules/CommonStore";

export class RootStore {
  commonStore: CommonStore;
  authStore: AuthStore;
  dashboardStore: DashboardStore;
  groupStore: GroupStore;
  accountStore: AccountStore;
  authorityStore: AuthorityStore;
  menuStore: MenuStore;
  logStore: LogStore;
  constructor() {
    this.commonStore = new CommonStore(this);
    this.authStore = new AuthStore(this);
    this.dashboardStore = new DashboardStore(this);
    this.groupStore = new GroupStore(this);
    this.accountStore = new AccountStore(this);
    this.authorityStore = new AuthorityStore(this);
    this.menuStore = new MenuStore(this);
    this.logStore = new LogStore(this);
  }
}

export const stores = new RootStore();
const StoreContext = React.createContext(stores);
export const StoreProvider = StoreContext.Provider;
export const useStores = () => React.useContext(StoreContext);
