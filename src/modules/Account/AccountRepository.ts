import { createGet, createPost } from "@/shared/request";
import { UserRegisterFormInputs } from "@/component/User/UserRegisterModal";
import { User } from "@/shared/var/user";

export type AccountAddReqData = Omit<UserRegisterFormInputs, "confirmpassword">;

export interface modUserData {
  sysuserId: string | undefined;
  userId: string;
  userName: string;
  password?: string;
  adminType: boolean;
  groupId: string | undefined;
}

/**
 * 사용자 관리 API 호출 담당하는 클래스
 */
class AccountRepository {
  URL = "/system/account";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  isExist(userId: string) {
    return createGet<boolean>(this.URL + "/exists", {
      params: {
        userId,
      },
    });
  }

  addAccount(addFormData: AccountAddReqData) {
    return createPost(this.URL + "/add", addFormData);
  }

  deleteAccounts(ids: string[]) {
    return createPost<boolean>(this.URL + "/list/delete", {
      ids,
    });
  }

  modifyAccount(modUser: modUserData) {
    return createPost<User>(this.URL + "/modify", modUser);
  }

  findAll() {
    return createGet<User[]>(this.URL + "/list");
  }
}

export default new AccountRepository();
