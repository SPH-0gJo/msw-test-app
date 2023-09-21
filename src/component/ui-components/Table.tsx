import { Column } from "@/shared/type/table";
import React from "react";
import CheckBox from "./CheckBox";

interface TableProps<T> {
  columns: Column[];
  data: T[];
  isSelectable: boolean;
  itemKey: keyof T;
}

function Table<T>({
  columns,
  data,
  isSelectable,
  itemKey,
}: TableProps<T>): React.ReactElement {
  console.log("data", data);
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
        {data.map((dt) => (
          <tr key={dt[itemKey] as string}>
            {isSelectable && (
              <td>
                <CheckBox />
              </td>
            )}
            {columns.map((col) => {
              const value = dt[col.key as keyof T];
              return <td>{typeof value === "function" ? value() : value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(Table) as typeof Table;
