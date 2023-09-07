import { createGet } from "@/shared/request";

class GroupRepository {
  URL = "/system/group";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  findAll() {
    return createGet(this.URL + "/list/all");
  }
}

export default new GroupRepository();
