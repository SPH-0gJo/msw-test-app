import Button from "@/component/ui-components/Button";
import { Column, SearchParam } from "../type/table";
import { Option } from "../type/select";

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

export const groupSearchOptionList: Option<GroupTableData>[] = [
  {
    value: "groupName",
    title: "그룹명",
  },
];

export const groupInitSearchParam: SearchParam<GroupTableData> = {
  field: "groupName",
  query: "",
};
