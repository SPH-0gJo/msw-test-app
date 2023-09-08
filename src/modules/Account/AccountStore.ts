import { RootStore } from "@/index";
import AccountRepository from "./AccountRepository";

class AccountStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async isExist(userId: string) {
    const result = await AccountRepository.isExist(userId);
    console.log("AccountStore isExist :::: ", result);
    return result;
  }
}

export default AccountStore;
