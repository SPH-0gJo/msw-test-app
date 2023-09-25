import Button from "@/component/ui-components/Button";
import CheckBox from "@/component/ui-components/CheckBox";

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

const originMockData: User[] = [
  {
    sysuserId: "735507c0-70f1-4df0-8d29-ad47ba245638",
    userId: "yesan",
    userName: "예산과",
    adminType: false,
    groupId: "b5ecb636-9cb0-4312-a46d-3a500ce89a5c",
    groupName: "기획예산과",
    registDate: "2023-09-11T12:25:09.08",
    registSysuserId: "yjjo",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "b9c32d7f-8c71-46d5-bdf2-76bb77a9824a",
    userId: "hspark",
    userName: "박형식",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-09-11T11:41:27.026",
    registSysuserId: "yjjo",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "17c42655-346b-4e2e-898e-abb37eb48657",
    userId: "choonsik",
    userName: "박춘식",
    adminType: true,
    groupId: "f4ab61e5-7137-45f8-a8e9-7b3308087476",
    groupName: "기업지원과",
    registDate: "2023-09-11T10:47:08.435",
    registSysuserId: "yjjo",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "7a547b9b-06e1-48c8-b6e4-c9b00e11336d",
    userId: "protein",
    userName: "사용자",
    adminType: true,
    groupId: "f4ab61e5-7137-45f8-a8e9-7b3308087476",
    groupName: "기업지원과",
    registDate: "2023-09-11T10:12:49.573",
    registSysuserId: "yjjo",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "377f4563-3c90-4894-8ca9-0f7b0d12e3dc",
    userId: "nyjuser3",
    userName: "남양주",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-09-05T15:58:37.135",
    registSysuserId: "sphinfo",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "fc61f548-c1ba-4457-9289-f80c762d6f0e",
    userId: "nyjuser2",
    userName: "남양주",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-09-05T15:58:33.26",
    registSysuserId: "sphinfo",
    updateDate: null,
    updateSysuserId: "nyjuser2",
  },
  {
    sysuserId: "71b7a0a0-e7e2-4111-89ae-17613254a847",
    userId: "nyjuser1",
    userName: "남양주",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-09-05T15:58:26.496",
    registSysuserId: "sphinfo",
    updateDate: null,
    updateSysuserId: "nyjuser1",
  },
  {
    sysuserId: "23da76af-d1f0-4ea3-9789-a9f64ead63f4",
    userId: "testId7",
    userName: "사용자",
    adminType: true,
    groupId: "ad330701-e085-4c15-9190-7a497a4c497d",
    groupName: "총무과",
    registDate: "2023-08-17T14:22:06.514454",
    registSysuserId: "sphinfo3",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "daa1c129-e52b-475d-a531-972bf27013ae",
    userId: "testId6",
    userName: "사용자",
    adminType: true,
    groupId: "ad330701-e085-4c15-9190-7a497a4c497d",
    groupName: "총무과",
    registDate: "2023-08-17T14:21:56.070823",
    registSysuserId: "sphinfo3",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "0b7d5e57-f702-4298-8a94-27aa2fc4f317",
    userId: "testId5",
    userName: "사용자",
    adminType: true,
    groupId: "b5ecb636-9cb0-4312-a46d-3a500ce89a5c",
    groupName: "기획예산과",
    registDate: "2023-08-17T14:21:45.898293",
    registSysuserId: "sphinfo3",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "8705ec51-7e96-414a-aba8-625ec253fb41",
    userId: "testId4",
    userName: "사용자",
    adminType: true,
    groupId: "1b02894c-af43-460b-8434-7cae650114c5",
    groupName: "회계과",
    registDate: "2023-08-17T14:21:35.522032",
    registSysuserId: "sphinfo3",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "ce17892b-561c-4631-99da-61db8249f238",
    userId: "testId3",
    userName: "사용자",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-08-17T14:21:31.227343",
    registSysuserId: "sphinfo3",
    updateDate: "2023-09-05T15:47:43.424",
    updateSysuserId: "sphinfo",
  },
  {
    sysuserId: "7f32e3e9-7696-455e-aaa1-6e12d910111c",
    userId: "testId2",
    userName: "사용자",
    adminType: true,
    groupId: "e900ab03-253d-45da-bef7-e94694bed106",
    groupName: "자치행정과",
    registDate: "2023-08-17T14:21:20.9793",
    registSysuserId: "sphinfo3",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "d3e887d0-2cc6-45b7-b62f-b486a4ceaab0",
    userId: "testId1",
    userName: "사용자",
    adminType: true,
    groupId: "0ef4b538-8058-4ff0-ae31-181dc961f7ce",
    groupName: "도로건설과",
    registDate: "2023-08-17T14:21:06.274372",
    registSysuserId: "sphinfo3",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "368a22cf-3ae8-46b8-bcd1-7c5d3c0b6354",
    userId: "sphinfo5",
    userName: "사용자다섯",
    adminType: false,
    groupId: null,
    groupName: null,
    registDate: "2023-08-17T12:09:16.52935",
    registSysuserId: "sphinfo3",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    sysuserId: "fc2fb161-a652-4405-9b0a-3e57f796ce7a",
    userId: "sphinfo4",
    userName: "사용자하나",
    adminType: false,
    groupId: null,
    groupName: null,
    registDate: "2023-08-17T11:19:12.139035",
    registSysuserId: "sphinfo3",
    updateDate: "2023-08-17T11:58:52.094321",
    updateSysuserId: "sphinfo3",
  },
  {
    sysuserId: "464267b1-c0a4-4aa2-abd2-578391bd36ab",
    userId: "testId",
    userName: "사용자테스트",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-08-16T15:14:00.528433",
    registSysuserId: "sphinfo3",
    updateDate: "2023-09-11T12:30:17.664",
    updateSysuserId: "testId",
  },
  {
    sysuserId: "9267f7a1-676e-4438-a054-3bb4f0dbdb6a",
    userId: "sphinfo3",
    userName: "사용자2",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-08-01T16:23:12.591585",
    registSysuserId: "sphinfo",
    updateDate: null,
    updateSysuserId: "sphinfo3",
  },
  {
    sysuserId: "a8a13e93-81cb-408f-8204-f7ef6313fcd7",
    userId: "sphinfo2",
    userName: "사용자",
    adminType: false,
    groupId: null,
    groupName: null,
    registDate: "2023-07-27T11:33:28.455523",
    registSysuserId: "sphinfo",
    updateDate: "2023-08-01T16:13:58.636815",
    updateSysuserId: "sphinfo",
  },
  {
    sysuserId: "2b73c097-5464-46d9-9ce3-0eb789d368bd",
    userId: "sphinfo",
    userName: "에스피에이치",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-07-20T14:08:51.835662",
    registSysuserId: "system",
    updateDate: "2023-07-27T15:12:05.908123",
    updateSysuserId: "sphinfo",
  },
  {
    sysuserId: "dd2b73c097-5464-46d9-9ce3-0eb789d368bd",
    userId: "yjjo",
    userName: "yjjo",
    adminType: true,
    groupId: null,
    groupName: null,
    registDate: "2023-07-20T14:08:51.835",
    registSysuserId: "system",
    updateDate: "2023-07-27T15:12:05.908",
    updateSysuserId: "yjjo",
  },
];

export const users: User[] = //[];
  new Array(5).fill([...originMockData]).reduce((accumulator, cur) => {
    return [...accumulator, ...cur];
  });

export const UserDataField = {
  GROUP_NAME: "groupName",
  USER_ID: "userId",
  USER_NAME: "userName",
};

export interface UserData {
  // //ckbox: JSX.Element;
  // no: number;
  // groupName: string | null;
  // userId: string | null;
  // userName: string | null;
  // registDate: string;
  // mng: JSX.Element;
}

type UserTableDataExtras = {
  no: number;
  mng: JSX.Element;
};

export type UserTableData = UserTableDataExtras &
  Pick<User, "sysuserId" | "groupName" | "userId" | "userName" | "registDate">;

export const getUserTableData = function (
  users: User[],
  onModBtnClick: (arg: User) => void
): UserTableData[] {
  return users.map((user, i) => ({
    //ckbox: CheckBox(),
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
