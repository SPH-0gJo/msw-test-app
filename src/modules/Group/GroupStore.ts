import { RootStore } from "@/modules/Store";
import GroupRepository from "./GroupRepository";

/**
 * 그룹 관리 API 호출과 관련 state 관리를 담당하는 서비스 클래스
 */
class GroupStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async findAll() {
    // 아래 Promise에서 reject가 발생하면 현재 함수인 findAll Prmoise역시 reject를 발생시킨다. (전파)
    const result = await GroupRepository.findAll();
    //console.log("GroupStore findAll :::: ", result);
    return result;
  }

  async isExist(groupName: string) {
    const result = await GroupRepository.isExist(groupName);
    //console.log("GroupStore isExist :::: ", result);
    return result;
  }

  async addGroup(groupName: string) {
    const result = await GroupRepository.addGroup(groupName);
    //console.log("GroupStore addGroup :::: ", result);
    return result;
  }

  async modifyGroup(groupId: string, groupName: string) {
    const result = await GroupRepository.modifyGroup(groupId, groupName);
    //console.log("GroupStore modifyGroup :::: ", result);
    return result;
  }

  async deleteGroups(ids: string[]) {
    const result = await GroupRepository.deleteGroups(ids);
    //console.log("GroupStore deleteGroups :::: ", result);
    return result;
  }
}

export default GroupStore;
