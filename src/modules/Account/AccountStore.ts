import { RootStore } from "@/modules/Store";
import AccountRepository, {
  AccountAddReqData,
  modUserData,
} from "./AccountRepository";
import { Group } from "@/modules/Group/GroupRepository";
import { action, observable, makeObservable } from "mobx";

/**
 * 사용자 관리 API 호출과 사용자 관련 state 관리를 담당하는 서비스
 */
class AccountStore {
  rootStore: RootStore;
  @observable groups: Group[] | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  async isExist(userId: string) {
    const result = await AccountRepository.isExist(userId);
    //console.log("AccountStore isExist :::: ", result);
    return result;
  }

  async addAccount(addFormData: AccountAddReqData) {
    const result = await AccountRepository.addAccount(addFormData);
    //console.log("AccountStore addAccount :::: ", result);
    return result;
  }

  async deleteAccounts(ids: string[]) {
    const result = await AccountRepository.deleteAccounts(ids);
    //console.log("AccountStore deleteAccounts :::: ", result);
    return result;
  }

  async modifyAccount(modUser: modUserData) {
    const result = await AccountRepository.modifyAccount(modUser);
    //console.log("AccountStore modifyAccount :::: ", result);
    return result;
  }

  async findAll() {
    const result = await AccountRepository.findAll();
    //console.log("AccountStore findAll :::: ", result);
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
