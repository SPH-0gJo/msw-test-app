import { createGet, createPost } from "@/shared/request";
import { UserRegisterFormInputs } from "@/component/User/UserRegisterModal";
import { User } from "@/shared/var/user";

export type AccountAddReqData = Omit<UserRegisterFormInputs, "confirmpassword">;

class AccountRepository {
  URL = "/system/account";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  isExist(userId: string) {
    return createGet<boolean>(this.URL + `/exists`, {
      params: {
        userId,
      },
    });
  }

  addAccount(addFormData: AccountAddReqData) {
    return createPost(this.URL + "/add", addFormData);
  }

  findAll() {
    return createGet<User[]>(this.URL + "/list");
  }
}

export default new AccountRepository();
