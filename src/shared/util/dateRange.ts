import { format } from "date-fns";
/**
 * 시작 날짜 ~ 종료 날짜를 포맷화 하여 출력하는 함수
 * @param startDate
 * @param endDate
 * @returns
 */
export const getFormattedDateRange = (startDate: Date, endDate: Date) =>
  `${format(startDate, "yyyy-MM-dd")} ~ ${format(endDate, "yyyy-MM-dd")}`;
