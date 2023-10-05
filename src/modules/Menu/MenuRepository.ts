import { createGet, createPost } from "@/shared/request";
import { Menu } from "@/shared/var/sysMenu";

interface MenuQueryParam {
  menupathName?: string;
  menuName?: string;
  menuUrl?: string;
}

class MenuRepository {
  URL = "/system/menu";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  find(param: MenuQueryParam = {}) {
    return createGet<Menu[]>(this.URL + "/list", {
      params: param,
    });
  }

  deleteMenus(ids: string[]) {
    return createPost<boolean>(this.URL + "/list/delete", {
      ids,
    });
  }
}

export default new MenuRepository();
