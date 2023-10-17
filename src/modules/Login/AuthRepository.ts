import { createGet, createPost } from "@/shared/request";
import { AuthMenu } from "@/shared/var/authMenu";

type LoginResData = {
  access_token: string;
  refresh_token: string;
};

class AuthRepository {
  URL = "/auth";

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

  refresh() {
    const reqParam: LoginResData = {
      access_token: localStorage.getItem("token") || "",
      refresh_token: localStorage.getItem("r_token") || "",
    };
    return createPost<LoginResData>(this.URL + "/refresh", reqParam);
  }
}

export default new AuthRepository();
