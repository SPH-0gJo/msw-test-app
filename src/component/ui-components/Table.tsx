import { Column } from "@/shared/type/table";
import React from "react";

/**
 * columns : 테이블의 컬럼 목록 (컬럼명, 너비 등)
 * data : 테이블 행에 대응되는 데이터 목록
 * isSelectable : 선택 체크박스 사용 여부
 * dataIdKey : 각 행을 구분하기 위해 사용되는 key
 * selectedData : 선택된 데이터들의 key 값 집합
 * setSelectedData : 선택된 데이터들을 설정하는 함수
 */
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isSelectable: boolean;
  dataIdKey: keyof T;
  selectedData: Set<string>;
  setSelectedData: (data: Set<string>) => void;
}

/**
 * 현재 페이지의 데이터를 출력하는 테이블 컴포넌트
 * @param param0
 * @returns
 */
const Table = function <T>({
  columns,
  data,
  isSelectable,
  dataIdKey,
  selectedData,
  setSelectedData,
}: TableProps<T>): React.ReactElement {
  //행이 모두 선택되었는지 여부
  const isAllDataSelected = data.length === selectedData.size;

  //행이 선택된 경우 이벤트 함수
  const handleDataSelect = function (dataId: string) {
    const nextSelectedData = new Set(selectedData);
    if (nextSelectedData.has(dataId)) {
      nextSelectedData.delete(dataId);
    } else {
      nextSelectedData.add(dataId);
    }

    setSelectedData(nextSelectedData);
  };

  //행 전체선택 체크박스 클릭 이벤트 함수
  const handleAllDataSelect = function () {
    let dataIds: string[] = [];

    if (!isAllDataSelected) {
      dataIds = data.map((dt) => dt[dataIdKey] as string);
    }
    const nextSelectedData = new Set(dataIds);
    setSelectedData(nextSelectedData);
  };

  return (
    <table className="table table-custom">
      {/* colgroup */}
      <colgroup>
        {isSelectable && <col width={"5%"} />}
        {columns.map((col) => (
          <col key={col.key as string} width={col.width || "auto"} />
        ))}
      </colgroup>
      {/* headers */}
      <thead>
        <tr>
          {isSelectable && (
            <th>
              {/* <CheckBox /> */}
              <input
                type="checkbox"
                checked={isAllDataSelected}
                onChange={() => {
                  handleAllDataSelect();
                }}
              />
            </th>
          )}
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
              {isSelectable && (
                <td>
                  {/* <CheckBox /> */}
                  <input
                    type="checkbox"
                    checked={selectedData.has(dataIdVal)}
                    onChange={(e) => {
                      handleDataSelect(dataIdVal);
                    }}
                  />
                </td>
              )}
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

export default React.memo(Table) as typeof Table;
