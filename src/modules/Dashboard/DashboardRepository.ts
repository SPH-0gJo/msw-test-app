import { createGet } from "@/shared/request";

/**
 * 대시보드 API 호출을 담당하는 클래스
 */
class DashboardRepository {
  URL = "/dashboard";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  /**
   * 백엔드로부터 태블로 접근 티켓을 요청하는 함수
   * @returns
   */
  getTicket() {
    return createGet<string>(this.URL + "/ticket");
  }
}

export default new DashboardRepository();
