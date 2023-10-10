import { RootStore } from "@/modules/Store";
import MenuRepository from "./MenuRepository";
import { action, computed, makeObservable, observable } from "mobx";
import { Menu } from "@/shared/var/sysMenu";

class MenuStore {
  rootStore: RootStore;
  @observable menus: Menu[] | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  async findAll() {
    const result = await MenuRepository.find();
    console.log("AccountStore findAll :::: ", result);
    return result;
  }

  async deleteMenus(ids: string[]) {
    const result = await MenuRepository.deleteMenus(ids);
    console.log("MenuStore deleteMenus :::: ", result);
    return result;
  }

  @computed
  get parentMenus() {
    return this.menus && this.menus.filter((e) => e.depth === 1);
  }

  @action
  setMenus(menus: Menu[]) {
    this.menus = menus;
  }
}

export default MenuStore;
