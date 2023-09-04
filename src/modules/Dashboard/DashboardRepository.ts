import { createGet, createPost } from "@/shared/request";

class DashboardRepository {
  URL = "/dashboard";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  getTicket() {
    return createGet(this.URL + "/ticket");
  }
}

export default new DashboardRepository();
