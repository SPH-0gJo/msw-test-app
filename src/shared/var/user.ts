import Button from "@/component/ui-components/Button";
import { Column } from "../type/table";
import { Option } from "@/shared/type/select";

export interface User {
  sysuserId: string;
  userId: string;
  userName: string;
  adminType: boolean;
  groupId: string | null;
  groupName: string | null;
  registDate: string;
  registSysuserId: string;
  updateDate: string | null;
  updateSysuserId: string | null;
}

type UserTableDataExtras = {
  //no: number;
  mng: JSX.Element;
};

export type UserTableData = UserTableDataExtras &
  Pick<User, "sysuserId" | "groupName" | "userId" | "userName" | "registDate">;

export const getUserTableData = function (
  users: User[],
  onModBtnClick: (arg: User) => void
): UserTableData[] {
  return users.map((user) => ({
    sysuserId: user.sysuserId,
    groupName: user.groupName,
    userId: user.userId,
    userName: user.userName,
    registDate: user.registDate,
    mng: Button({
      variant: "success",
      size: "xs",
      classList: ["rounded-pill"],
      children: "수정",
      onClick: () => {
        onModBtnClick(user);
      },
    }),
  }));
};

export const userColumns: Column<UserTableData>[] = [
  {
    key: "groupName",
    value: "그룹명",
  },
  {
    key: "userId",
    value: "아이디",
    width: "10%",
  },
  {
    key: "userName",
    value: "이름",
    width: "20%",
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

export const userOptionList: Option<UserTableData>[] = [
  {
    value: "userId",
    title: "아이디",
  },
  {
    value: "groupName",
    title: "그룹명",
  },
  {
    value: "userName",
    title: "이름",
  },
];
