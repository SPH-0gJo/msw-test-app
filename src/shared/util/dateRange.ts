import { format } from "date-fns";
export const getFormattedDateRange = (startDate: Date, endDate: Date) =>
  `${format(startDate, "yyyy-MM-dd")} ~ ${format(endDate, "yyyy-MM-dd")}`;
