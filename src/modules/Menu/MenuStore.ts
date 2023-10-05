import { RootStore } from "@/modules/Store";
import MenuRepository from "./MenuRepository";

class MenuStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
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
}

export default MenuStore;
