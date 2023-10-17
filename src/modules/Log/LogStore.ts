import LogRepository from "./LogRepository";
import { RootStore } from "@/modules/Store";

class LogStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async find(startDate: string, endDate: string) {
    const result = await LogRepository.find(startDate, endDate);
    console.log("LogStore find :::: ", result);
    return result;
  }
}

export default LogStore;
