import { createGet } from "@/shared/request";

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
}

export default new AccountRepository();
