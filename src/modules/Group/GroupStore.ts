import { RootStore } from "@/modules/Store";
import GroupRepository from "./GroupRepository";

class GroupStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async findAll() {
    // 아래 Promise에서 reject가 발생하면 현재 함수인 findAll Prmoise역시 reject를 발생시킨다. (전파)
    const result = await GroupRepository.findAll();
    console.log("GroupStore findAll :::: ", result);
    return result;
  }

  async isExist(groupName: string) {
    const result = await GroupRepository.isExist(groupName);
    console.log("GroupStore isExist :::: ", result);
    return result;
  }
}

export default GroupStore;
