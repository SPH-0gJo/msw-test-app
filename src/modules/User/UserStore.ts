import { action, observable } from "mobx";
import { User } from "./UserRepository";
import { RootStore } from "@/modules/Store";
class UserStore {
  @observable
  user: null | User = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  set userInfo(user: User | null) {
    console.log(user?.name);
    this.user = user;
  }
}

export default UserStore;
