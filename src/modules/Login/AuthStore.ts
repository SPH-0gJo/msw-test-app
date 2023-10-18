import { action, makeObservable, observable } from "mobx";

import AuthRepository from "./AuthRepository";
import { RootStore } from "@/modules/Store";
import { AuthMenu, getMenuInfoList } from "@/shared/var/authMenu";
import { MenuInfo } from "@/shared/var/menu";

const TOKEN = "token";
const REFRESH_TOKEN = "r_token";

class AuthStore {
  @observable
  isLoggedIn = Boolean(localStorage.getItem(TOKEN));
  @observable
  authMenuInfoList: MenuInfo[] = [];
  // authMenuInfoList: MenuInfo[] = JSON.parse(
  //   localStorage.getItem("authMenu") || "[]"
  // );
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    console.log("새로고침");

    makeObservable(this);

    //결과가 이전과 동일하다면 (이건 서버에서도 Cache-Control:max-age=0 설정을 해주어야함.. )
    //https://toss.tech/article/smart-web-service-cache
    // this.authMenuInfoList = JSON.parse(localStorage.getItem("authMenu"));
    //아니라면 getAuthMenuList후 새롭게 this.authMenuInfoLis ...
    if (this.isLoggedIn) {
      this.configAuthMenuInfoList();
    }
  }

  async login(userId: string, password: string) {
    const result = await AuthRepository.login(userId, password);
    console.log("login", result);
    const { access_token, refresh_token } = result.data;
    this.logUserIn(access_token, refresh_token);
  }

  async getAuthMenuList() {
    const result = await AuthRepository.getAuthMenuList();
    console.log("AuthStore getAuthMenuList :::: ", result);
    return result;
  }

  @action
  async configAuthMenuInfoList() {
    const result = await this.getAuthMenuList();
    const authMenuInfoList = getMenuInfoList(result.data);
    this.authMenuInfoList = authMenuInfoList;
    // localStorage.setItem("authMenu", JSON.stringify(authMenuInfoList));
  }

  logout() {
    this.logUserOut();
    this.rootStore.userStore.userInfo = null;
  }

  @action
  logUserIn(token: string, r_token: string) {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, r_token);
    this.isLoggedIn = true;
  }

  @action
  logUserOut() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.isLoggedIn = false;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  setRefreshToken(r_token: string) {
    localStorage.setItem(REFRESH_TOKEN, r_token);
  }
}

export default AuthStore;
