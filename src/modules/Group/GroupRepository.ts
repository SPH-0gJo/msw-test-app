import { createGet, createPost } from "@/shared/request";

export interface Group {
  groupId: string;
  groupName: string;
  registDate: string;
  registSysuserId: string;
  updateDate: string;
  updateSysuserId: string;
}

/**
 * 그룹 관리 API 호출을 담당하는 클래스
 */

class GroupRepository {
  URL = "/system/group";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  findAll() {
    return createGet<Group[]>(this.URL + "/list/all");
  }

  isExist(groupName: string) {
    return createGet<boolean>(this.URL + `/exists`, {
      params: {
        groupName,
      },
    });
  }

  addGroup(groupName: string) {
    return createPost(this.URL + "/add", {
      groupName,
    });
  }

  modifyGroup(groupId: string, groupName: string) {
    return createPost(this.URL + "/modify", {
      groupId,
      groupName,
    });
  }

  deleteGroups(ids: string[]) {
    return createPost<boolean>(this.URL + "/list/delete", {
      ids,
    });
  }
}

export default new GroupRepository();
