import { Column, SearchParam } from "../type/table";
import { Option } from "../type/select";

export interface Log {
  seq: number; //1216;
  userId: string; //"yjjo";
  userName: string; //"yjjo";
  adminType: "관리자" | "사용자";
  groupName: string | null;
  loginDate: string; //"2023-10-15 14:53:24";
}

type LogTableDataExtras = {};

export type LogTableData = LogTableDataExtras & Log;

export const getLogTableData = function (logs: Log[]): LogTableData[] {
  return logs.map((log, i) => ({
    ...log,
  }));
};

export const logColumns: Column<LogTableData>[] = [
  {
    key: "seq",
    value: "NO",
    width: "5%",
  },
  {
    key: "loginDate",
    value: "접속일시",
    width: "25%",
  },
  {
    key: "userId",
    value: "사용자 아이디",
    width: "15%",
  },
  {
    key: "userName",
    value: "사용자명",
    width: "15%",
  },
  {
    key: "groupName",
    value: "그룹명",
  },
  {
    key: "adminType",
    value: "유형",
    width: "10%",
  },
];

export const logSearchOptionList: Option<LogTableData>[] = [
  {
    value: "userName",
    title: "사용자명",
  },
  {
    value: "userId",
    title: "사용자 아이디",
  },
];

export const logInitSearchParam: SearchParam<LogTableData> = {
  field: "userName",
  query: "",
};
