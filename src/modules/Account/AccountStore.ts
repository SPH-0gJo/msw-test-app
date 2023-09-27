import { RootStore } from "@/modules/Store";
import AccountRepository, { AccountAddReqData } from "./AccountRepository";
import { Group } from "../Group/GroupRepository";
import { action, observable, makeObservable } from "mobx";

class AccountStore {
  rootStore: RootStore;
  @observable groups: Group[] | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
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

  async findAllGroups() {
    const result = await this.rootStore.groupStore.findAll();
    return result;
  }

  @action
  setGroups(groups: Group[]) {
    this.groups = groups;
  }
}

export default AccountStore;
