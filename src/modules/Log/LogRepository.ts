import { createGet } from "@/shared/request";
import { Log } from "@/shared/var/log";

/**
 * 접속 이력 API 호출을 담당하는 클래스
 */
class LogRepository {
  URL = "/system/log";

  constructor(url?: string) {
    this.URL = url || this.URL;
  }

  find(startDate: string, endDate: string) {
    return createGet<Log[]>(this.URL + "/list", {
      params: {
        start: startDate,
        end: endDate,
      },
    });
  }
}

export default new LogRepository();
