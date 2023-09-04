import { action, observable } from "mobx";

import DashboardRepository from "./DashboardRepository";
import { RootStore } from "@/index";

class DashboardStore {
  @observable
  ticket: string | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async getTicket() {
    const result = await DashboardRepository.getTicket();
    console.log("getTicket", result);
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
