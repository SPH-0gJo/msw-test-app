import { MenuFormInputs } from "@/component/Menu/MenuForm";
import { createGet, createPost } from "@/shared/request";
import { Menu } from "@/shared/var/sysMenu";

interface MenuQueryParam {
  menupathName?: string;
  menuName?: string;
  menuUrl?: string;
}

export interface MenuAddParam extends MenuFormInputs {}

export interface MenuModParam extends MenuFormInputs {
  menuId: string;
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

  addMenu(param: MenuAddParam) {
    return createPost<Menu>(this.URL + "/add", param);
  }

  modifyMenu(param: MenuModParam) {
    return createPost<Menu>(this.URL + "/modify", param);
  }
}

export default new MenuRepository();
