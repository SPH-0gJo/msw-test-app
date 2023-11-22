import { action, observable } from "mobx";

import DashboardRepository from "./DashboardRepository";
import { RootStore } from "@/modules/Store";

/**
 * 대시보드 API 호출과 관련 state 관리를 담당하는 서비스 클래스
 */
class DashboardStore {
  @observable
  ticket: string | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async getTicket() {
    const result = await DashboardRepository.getTicket();
    const ticket = result.data;

    if (ticket) {
      this.setTicket(ticket);
    }
    return ticket;
  }

  @action
  setTicket(ticket: string) {
    this.ticket = ticket;
  }
}

export default DashboardStore;
