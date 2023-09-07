import { createGet } from "@/shared/request";

export type Group = {
  groupId: string;
  groupName: string;
  registDate: string;
  registSysuserId: string;
  updateDate: string;
  updateSysuserId: string;
};

class GroupRepository {
  URL = "/system/group";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  findAll() {
    return createGet<Group[]>(this.URL + "/list/all");
  }
}

export default new GroupRepository();
