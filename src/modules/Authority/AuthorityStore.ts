import { RootStore } from "@/modules/Store";
import AuthorityRepository from "./AuthorityRepository";
import { Role } from "@/shared/var/role";

/**
 * 권한 관리 API 호출과 권한 관련 state 관리를 담당하는 서비스 클래스
 */

class AuthorityStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async listRole(groupId: string) {
    const result = await AuthorityRepository.listRole(groupId);
    //console.log("AuthorityStore listRole :::: ", result);
    return result;
  }

  async listMenu() {
    const result = await AuthorityRepository.listMenu();
    //console.log("AuthorityStore listMenu :::: ", result);
    return result;
  }

  async listGroup() {
    const result = await AuthorityRepository.listGroup();
    //console.log("AuthorityStore listGroup :::: ", result);
    return result;
  }

  async saveRole(role: Role) {
    const result = await AuthorityRepository.saveRole(role);
    //console.log("AuthorityStore saveRole :::: ", result);
    return result;
  }
}

export default AuthorityStore;
