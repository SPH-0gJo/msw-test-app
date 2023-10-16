import { Column } from "@/shared/type/table";
import React from "react";

interface NonSelectableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  dataIdKey: keyof T;
}

function NonSelectableTable<T>({
  columns,
  data,
  dataIdKey,
}: NonSelectableTableProps<T>): React.ReactElement {
  console.log("data", data);

  return (
    <table className="table table-custom">
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

export default React.memo(NonSelectableTable) as typeof NonSelectableTable;
