import { action, observable } from "mobx";

import AuthRepository from "./AuthRepository";
import { RootStore } from "@/index";

const TOKEN = "token";
const REFRESH_TOKEN = "r_token";

class AuthStore {
  @observable
  isLoggedIn = Boolean(localStorage.getItem(TOKEN));
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //@action : 2번 렌더링 될거같아서 일단 주석
  /*
  async _login() {
    console.log("---login---");
    const result = await UserRepository.findOne();

    if (result.ok && result.data.token && result.data.user) {
      this.logUserIn(result.data.token);
      this.rootStore.userStore.userInfo = result.data.user;
      return;
    }

    throw new Error("Failed to Login In");
  }
  */

  async login(userId: string, password: string) {
    const result = await AuthRepository.login(userId, password);
    console.log("login", result);
    const { access_token, refresh_token } = result.data;
    this.logUserIn(access_token, refresh_token);
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
