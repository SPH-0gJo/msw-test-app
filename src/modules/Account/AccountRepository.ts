import { createGet, createPost } from "@/shared/request";
import { UserRegisterFormInputs } from "@/views/System/User/UserRegisterModal";

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
}

export default new AccountRepository();
