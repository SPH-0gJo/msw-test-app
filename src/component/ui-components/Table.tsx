import { Column } from "@/views/System/User/User";
import React from "react";

type TableProps<T> = {
  columns: Column[];
  data: T[];
};

function Table<T>({ columns, data }: TableProps<T>): React.ReactElement {
  console.log("data", data);
  return (
    <table className="table table-custom">
      {/* headers */}
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* rows */}
        {data.map((dt) => (
          <tr>
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

export default Table;
