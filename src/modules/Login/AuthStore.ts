import { action, makeObservable, observable } from "mobx";

import AuthRepository from "./AuthRepository";
import { RootStore } from "@/modules/Store";
import { AuthMenu, getMenuInfoList } from "@/shared/var/authMenu";
import { MenuInfo } from "@/shared/var/menu";
import { decodeJwt } from "jose";
import { User } from "@/shared/var/user";
import { modUserData } from "../Account/AccountRepository";

const TOKEN = "token";
const REFRESH_TOKEN = "r_token";
const IS_ADMIN = "is_admin";

type Role = "ROLE_ADMIN" | "ROLE_USER";

class AuthStore {
  @observable
  isLoggedIn = Boolean(localStorage.getItem(TOKEN));
  @observable
  authMenuInfoList: MenuInfo[] = [];
  @observable
  isAdmin = localStorage.getItem(IS_ADMIN) === "t";
  @observable
  userInfo: User | null = null;
  @observable
  isAuthMenuListLoading: boolean = false;

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    console.log("새로고침"); //navigate 한다고 발생하는 것은 아님.

    makeObservable(this);

    if (this.isLoggedIn) {
      this.setIsAuthMenuListLoading(true);
      //async, await을 쓰지 않는 Promise의 경우 .catch로 에러 캐치 (try~catch 아님)
      //새로 고침시 configAuthMenuInfoList는 API 요청을 통해 토큰 만료여부 등을 확인하는 역할을 함
      this.configAuthMenuInfoList()
        .finally(() => {
          this.setIsAuthMenuListLoading(false);
        })
        .then(() => {
          //this.configureIsAdmin();
          return this.configureUserInfo();
        })
        .catch((e) => {
          //configAuthMenuInfoList or configureIsAdmin 에서 발생한 에러 catch
          console.error("Promise Chain Error", e);
        });
    }
  }

  async login(userId: string, password: string) {
    const result = await AuthRepository.login(userId, password);
    //console.log("login", result);
    const { access_token, refresh_token } = result.data;
    this.logUserIn(access_token, refresh_token);
  }

  async getAuthMenuList() {
    const result = await AuthRepository.getAuthMenuList();
    //console.log("AuthStore getAuthMenuList :::: ", result);
    return result;
  }

  async getUserInfo(userId: string) {
    const result = await AuthRepository.getUserInfo(userId);
    //console.log("AuthStore getUserInfo :::: ", result.data);
    return result;
  }

  async configAuthMenuInfoList() {
    const result = await this.getAuthMenuList();
    const authMenuInfoList = getMenuInfoList(result.data);
    //this.authMenuInfoList = authMenuInfoList;
    this.setAuthMenuInfoList(authMenuInfoList);
    return authMenuInfoList;
  }

  @action
  setIsAuthMenuListLoading(isLoading: boolean) {
    this.isAuthMenuListLoading = isLoading;
  }

  @action
  setAuthMenuInfoList(authMenuInfoList: MenuInfo[]) {
    this.authMenuInfoList = authMenuInfoList;
  }

  configureIsAdmin() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const payload = decodeJwt(token);
      const isAdmin = this.isRoleAdmin(payload.role as Role);
      this.setIsAdmin(isAdmin);
    }
  }
  @action
  setIsAdmin(isAdmin: boolean) {
    const strIsAdmin = isAdmin ? "t" : "f";
    localStorage.setItem(IS_ADMIN, strIsAdmin);
    this.isAdmin = isAdmin;
  }

  async configureUserInfo() {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const payload = decodeJwt(token);
      const userId = payload.sub!;
      const result = await this.getUserInfo(userId);
      const userInfo = result.data;
      this.setUserInfo(userInfo);
      this.setIsAdmin(userInfo.adminType);
    }
  }

  @action
  setUserInfo(userInfo: User) {
    this.userInfo = userInfo;
  }

  async modifyProfile(modUser: modUserData) {
    const result = await AuthRepository.modifyProfile(modUser);
    //console.log("AuthStore modifyProfile :::: ", result);
    return result;
  }

  isRoleAdmin(role: Role) {
    return role === "ROLE_ADMIN";
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
