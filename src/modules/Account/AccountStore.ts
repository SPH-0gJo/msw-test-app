import { RootStore } from "@/modules/Store";
import AccountRepository, { AccountAddReqData } from "./AccountRepository";

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

  async addAccount(addFormData: AccountAddReqData) {
    const result = await AccountRepository.addAccount(addFormData);
    console.log("AccountStore addAccount :::: ", result);
    return result;
  }

  async deleteAccounts(ids: string[]) {
    const result = await AccountRepository.deleteAccounts(ids);
    console.log("AccountStore deleteAccounts :::: ", result);
    return result;
  }

  async findAll() {
    const result = await AccountRepository.findAll();
    console.log("AccountStore findAll :::: ", result);
    return result;
  }
}

export default AccountStore;
