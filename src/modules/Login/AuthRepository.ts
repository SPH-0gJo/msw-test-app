import { createGet, createPost } from "@/shared/request";
import { AuthMenu } from "@/shared/var/authMenu";
import { User } from "@/shared/var/user";
import { modUserData } from "../Account/AccountRepository";

type LoginResData = {
  access_token: string;
  refresh_token: string;
};

class AuthRepository {
  URL = "/auth";
  PROFILE_URL = "/profile";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  login(userId: string, password: string) {
    return createPost<LoginResData>(this.URL + "/login", {
      userId,
      password,
    });
  }

  getAuthMenuList() {
    return createGet<AuthMenu[]>(this.URL + "/menu");
  }

  getUserInfo(userId: string) {
    return createGet<User>(this.PROFILE_URL + "/details", {
      params: {
        id: userId,
      },
    });
  }

  modifyProfile(modUser: modUserData) {
    return createPost<User>(this.PROFILE_URL + "/modify", modUser);
  }

  refresh() {
    const reqParam: LoginResData = {
      access_token: localStorage.getItem("token") || "",
      refresh_token: localStorage.getItem("r_token") || "",
    };
    return createPost<LoginResData>(this.URL + "/refresh", reqParam);
  }
}

export default new AuthRepository();
