import { Column, SearchParam } from "@/shared/type/table";
import { Option } from "@/shared/type/select";

export interface Log {
  seq: number; //1216;
  userId: string; //"yjjo";
  userName: string; //"yjjo";
  adminType: "관리자" | "사용자";
  groupName: string | null;
  loginDate: string; //"2023-10-15 14:53:24";
}

type LogTableDataExtras = {
  no: number;
};

export type LogTableData = LogTableDataExtras & Log;

/**
 * 응답 데이터를 정제하여 테이블에서 사용할 수 있는 형태로 정제하는 함수
 * @param logs
 * @returns
 */
export const getLogTableData = function (logs: Log[]): LogTableData[] {
  return logs.map((log, i) => ({
    ...log,
    no: i + 1,
  }));
};

// 접속 이력 테이블 컬럼 정보
export const logColumns: Column<LogTableData>[] = [
  {
    key: "no",
    value: "NO",
    width: "5%",
  },
  {
    key: "seq",
    value: "ID",
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

// 접속이력 테이블 검색 Select 컴포넌트의 Option 설정 정보
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

// 접속이력 테이블 검색 파라미터 세팅정보
export const logInitSearchParam: SearchParam<LogTableData> = {
  field: "userName",
  query: "",
};
