import { createGet, createPost } from "@/shared/request";
import { Role } from "@/shared/var/role";
/**
 * 권한 관리 API 호출 담당하는 클래스
 */
class AuthorityRepository {
  URL = "/system/role";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  listRole(groupId: string) {
    return createGet(this.URL + `/list`, {
      params: {
        id: groupId,
      },
    });
  }

  listMenu() {
    return createGet("/system/menu/list");
  }

  listGroup() {
    return createGet("/system/group/list/all");
  }

  saveRole(role: Role) {
    return createPost(this.URL + `/save`, role);
  }
}

export default new AuthorityRepository();
