import { action, makeObservable, observable } from "mobx";

import AuthRepository from "./AuthRepository";
import { RootStore } from "@/modules/Store";
import { AuthMenu, getMenuInfoList } from "@/shared/var/authMenu";
import { MenuInfo } from "@/shared/var/menu";
import { jwtVerify } from "jose";

const TOKEN = "token";
const REFRESH_TOKEN = "r_token";

class AuthStore {
  @observable
  isLoggedIn = Boolean(localStorage.getItem(TOKEN));
  @observable
  authMenuInfoList: MenuInfo[] = [];
  @observable
  isAdmin = false;

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    console.log("새로고침"); //navigate 한다고 발생하는 것은 아님.

    makeObservable(this);

    if (this.isLoggedIn) {
      //async, await을 쓰지 않는 Promise의 경우 .catch로 에러 캐치 (try~catch 아님)
      this.configAuthMenuInfoList()
        .then((value) => {
          console.log(value);
          return this.configureIsAdmin();
        })
        .catch((e) => {
          //configAuthMenuInfoList or configureIsAdmin 에서 발생한 에러 catch
          console.error("Promise Chain Error", e);
        });
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
    return authMenuInfoList;
  }

  configureIsAdmin() {
    const token = localStorage.getItem(TOKEN);
    const secretKey =
      "7fbfd344d1a975b2f630a01fc7be5f2f136edae363607f11e3f35df516da9500";
    const secret = new TextEncoder().encode(secretKey);
    if (token) {
      jwtVerify(token, secret)
        .then((result) => {
          const { payload } = result;
          console.log("token--------------------", payload);
        })
        .catch((e) => {
          console.error(e);
        });
    }
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
