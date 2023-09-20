import cloneDeep from "lodash/cloneDeep";
import { SearchParam } from "@/shared/type/table";

export const paginateData = function (
  pageSize: number,
  data: any[],
  page: number
) {
  const startIdx = (page - 1) * pageSize;
  return data.slice(startIdx, startIdx + pageSize);
};

export const searchData = function <T>(data: T[], searchParam: SearchParam) {
  const cloneData = cloneDeep(data);

  if (searchParam.query === "") {
    return cloneData;
  }

  return cloneData.filter((dt: T) => {
    const value = dt[searchParam.field as keyof T];
    if (!value || typeof value !== "string") {
      return false;
    }
    return value.includes(searchParam.query);
  });
};
