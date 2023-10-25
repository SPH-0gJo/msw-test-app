import { Column } from "@/shared/type/table";
import React from "react";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isSelectable: boolean;
  dataIdKey: keyof T;
  selectedData: Set<string>;
  setSelectedData: (data: Set<string>) => void;
}

function Table<T>({
  columns,
  data,
  isSelectable,
  dataIdKey,
  selectedData,
  setSelectedData,
}: TableProps<T>): React.ReactElement {
  console.log("data", data);

  //const [selectedData, setSelectedData] = useState(new Set());
  //전체 선택 후 하나라도 풀면 전체 선택 체크박스 해제되어야함
  const isAllDataSelected = data.length === selectedData.size;

  const handleDataSelect = function (dataId: string) {
    const nextSelectedData = new Set(selectedData);
    if (nextSelectedData.has(dataId)) {
      nextSelectedData.delete(dataId);
    } else {
      nextSelectedData.add(dataId);
    }

    setSelectedData(nextSelectedData);
  };

  const handleAllDataSelect = function () {
    let dataIds: string[] = [];

    if (!isAllDataSelected) {
      dataIds = data.map((dt) => dt[dataIdKey] as string);
    }
    const nextSelectedData = new Set(dataIds);
    setSelectedData(nextSelectedData);
  };

  console.log(selectedData);

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
              {columns.map((col) => {
                const value = dt[col.key as keyof T];
                return <td>{typeof value === "function" ? value() : value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default React.memo(Table) as typeof Table;
