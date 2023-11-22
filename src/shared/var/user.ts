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
  no: number;
  mng: JSX.Element;
};

export type UserTableData = UserTableDataExtras &
  Pick<User, "sysuserId" | "groupName" | "userId" | "userName" | "registDate">;

/**
 * 응답 데이터를 정제하여 테이블에서 사용할 수 있는 형태로 정제하는 함수
 * @param users
 * @param onModBtnClick
 * @returns
 */
export const getUserTableData = function (
  users: User[],
  onModBtnClick: (arg: User) => void
): UserTableData[] {
  return users.map((user, i) => ({
    no: i + 1,
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

//사용자 관리 테이블 컬럼 정보
export const userColumns: Column<UserTableData>[] = [
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

// 사용자 관리 테이블 검색 Select 컴포넌트의 Option 설정 정보
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
