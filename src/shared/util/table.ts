import cloneDeep from "lodash/cloneDeep";
import { SearchParam } from "@/shared/type/table";

/**
 * data 목록에서 현재 페이지에 해당하는 데이터만 반환하는 함수
 * @param pageSize
 * @param data
 * @param page
 * @returns
 */
export const paginateData = function (
  pageSize: number,
  data: any[],
  page: number
) {
  const startIdx = (page - 1) * pageSize;
  return data.slice(startIdx, startIdx + pageSize);
};

/**
 * data 목록에서 사용자의 검색 조건에 맞는 데이터만 반환하는 함수
 * @param data
 * @param searchParam
 * @returns
 */
export const searchData = function <T>(data: T[], searchParam: SearchParam<T>) {
  const cloneData = cloneDeep(data);

  if (searchParam.query === "") {
    return cloneData;
  }

  return cloneData
    .filter((dt: T) => {
      const value = dt[searchParam.field as keyof T];
      if (!value || typeof value !== "string") {
        return false;
      }
      return value.includes(searchParam.query);
    })
    .map((dt, i) => ({
      ...dt,
      no: i + 1,
    }));
};
