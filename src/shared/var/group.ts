import Button from "@/component/ui-components/Button";
import { Column, SearchParam } from "@/shared/type/table";
import { Option } from "@/shared/type/select";

export interface Group {
  groupId: string;
  groupName: string;
  registDate: string;
  registSysuserId: string;
  updateDate: string;
  updateSysuserId: string;
}

type GroupTableDataExtras = {
  no: number;
  mng: JSX.Element;
};

export type GroupTableData = GroupTableDataExtras & Group;
/**
 * 응답 데이터를 정제하여 테이블에서 사용할 수 있는 형태로 정제하는 함수
 * @param groups
 * @param onModBtnClick
 * @returns
 */
export const getGroupTableData = function (
  groups: Group[],
  onModBtnClick: (target: Group) => void
): GroupTableData[] {
  return groups.map((group, i) => ({
    ...group,
    no: i + 1,
    mng: Button({
      variant: "success",
      size: "xs",
      classList: ["rounded-pill"],
      children: "수정",
      onClick: () => {
        onModBtnClick(group);
      },
    }),
  }));
};

//그릅관리 테이블 컬럼 정보
export const groupColumns: Column<GroupTableData>[] = [
  {
    key: "no",
    value: "NO",
    width: "5%",
  },
  {
    key: "groupName",
    value: "그룹명",
  },
  {
    key: "registDate",
    value: "등록일",
    width: "20%",
  },
  {
    key: "mng",
    value: "관리",
    width: "10%",
  },
];

// 그룹관리 테이블 검색 Select 컴포넌트의 Option 설정 정보
export const groupSearchOptionList: Option<GroupTableData>[] = [
  {
    value: "groupName",
    title: "그룹명",
  },
];
// 그룹관리 테이블 검색 파라미터 세팅정보
export const groupInitSearchParam: SearchParam<GroupTableData> = {
  field: "groupName",
  query: "",
};
