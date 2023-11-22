import LogRepository from "./LogRepository";
import { RootStore } from "@/modules/Store";

/**
 * 접속 이력 API 호출과 관련 state 관리를 담당하는 서비스 클래스
 */
class LogStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async find(startDate: string, endDate: string) {
    const result = await LogRepository.find(startDate, endDate);
    //console.log("LogStore find :::: ", result);
    return result;
  }
}

export default LogStore;
