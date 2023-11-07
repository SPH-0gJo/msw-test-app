import { RootStore } from "@/modules/Store";
import MenuRepository, { MenuAddParam, MenuModParam } from "./MenuRepository";
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
    //console.log("AccountStore findAll :::: ", result);
    return result;
  }

  async deleteMenus(ids: string[]) {
    const result = await MenuRepository.deleteMenus(ids);
    //console.log("MenuStore deleteMenus :::: ", result);
    return result;
  }

  async addMenu(param: MenuAddParam) {
    const result = await MenuRepository.addMenu(param);
    //console.log("MenuStore addMenu :::: ", result);
    return result;
  }

  async modifyMenu(param: MenuModParam) {
    const result = await MenuRepository.modifyMenu(param);
    //console.log("MenuStore modifyMenu :::: ", result);
    return result;
  }

  @computed
  get parentMenus() {
    return (
      this.menus && this.menus.filter((e) => e.depth === 1 || e.depth === 2)
    );
  }

  @action
  setMenus(menus: Menu[]) {
    this.menus = menus;
  }
}

export default MenuStore;
