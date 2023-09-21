import { Column } from "@/shared/type/table";
import React, { useState } from "react";
import CheckBox from "./CheckBox";

interface TableProps<T> {
  columns: Column[];
  data: T[];
  isSelectable: boolean;
  dataIdKey: keyof T;
}

function Table<T>({
  columns,
  data,
  isSelectable,
  dataIdKey,
}: TableProps<T>): React.ReactElement {
  console.log("data", data);

  const [selectedData, setSelectedData] = useState(new Set());

  const handleDataSelect = function (dataId: string) {
    const nextSelectedData = new Set(selectedData);
    if (nextSelectedData.has(dataId)) {
      nextSelectedData.delete(dataId);
    } else {
      nextSelectedData.add(dataId);
    }

    setSelectedData(nextSelectedData);
  };

  console.log(selectedData);

  return (
    <table className="table table-custom">
      {/* headers */}
      <thead>
        <tr>
          {isSelectable && (
            <th>
              <CheckBox />
            </th>
          )}
          {columns.map((col) => (
            <th key={col.key}>{col.value}</th>
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
