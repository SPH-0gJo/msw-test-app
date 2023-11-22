import { Column } from "@/shared/type/table";
import React from "react";

/**
 * columns : 테이블의 컬럼 목록 (컬럼명, 너비 등)
 * data : 테이블 행에 대응되는 데이터 목록
 * dataIdKey : 각 행을 구분하기 위해 사용되는 key
 */
interface NonSelectableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  dataIdKey: keyof T;
}

/**
 * 선택 체크박스 기능이 없는 테이블 컴포넌트
 * @param param0
 * @returns
 */
const NonSelectableTable = function <T>({
  columns,
  data,
  dataIdKey,
}: NonSelectableTableProps<T>): React.ReactElement {
  return (
    <table className="table table-custom">
      {/* colgroup */}
      <colgroup>
        {columns.map((col) => (
          <col key={col.key as string} width={col.width || "auto"} />
        ))}
      </colgroup>
      {/* headers */}
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key as string}>{col.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* rows */}
        {data.map((dt) => {
          const dataIdVal = dt[dataIdKey] as string;
          return (
            <tr key={dataIdVal}>
              {columns.map((col, i) => {
                const value = dt[col.key as keyof T];
                return (
                  <td key={`${dataIdVal}-col-${i}`}>
                    {typeof value === "function" ? value() : value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default React.memo(NonSelectableTable) as typeof NonSelectableTable;
