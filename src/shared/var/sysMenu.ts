import Button from "@/component/ui-components/Button";
import { Column, SearchParam } from "@/shared/type/table";
import { Option } from "@/shared/type/select";

export interface Menu {
  menuId: string; // "ecfb5430-0315-4cfe-99e7-433cb4c5ac73",
  bigparentId: string | null;
  midparentId: string | null;
  menupathName: string; // "yeoron-main",
  menuName: string; //"생생시민소리",
  menuUrl: string; //"생생시민소리",
  embedUrl: string; // "/yeoron0905/Main",
  sortNo: number;
  depth: number;
  etc: string; //"생생",
  registDate: string; //"2023-09-12T16:03:54.459",
  registSysuserId: string; //"testId",
  updateDate: string | null;
  updateSysuserId: string | null;
}

type MenuTableDataExtras = {
  no: number;
  mng: JSX.Element;
};

export type MenuTableData = MenuTableDataExtras & Menu;

/**
 * 응답 데이터를 정제하여 테이블에서 사용할 수 있는 형태로 정제하는 함수
 * @param menus
 * @param onModBtnClick
 * @returns
 */
export const getMenuTableData = function (
  menus: Menu[],
  onModBtnClick: (menu: Menu) => void
): MenuTableData[] {
  return menus.map((menu, i) => ({
    ...menu,
    no: i + 1,
    mng: Button({
      variant: "success",
      size: "xs",
      classList: ["rounded-pill"],
      children: "수정",
      onClick: () => {
        onModBtnClick(menu);
      },
    }),
  }));
};

//메뉴 관리 테이블 컬럼 정보
export const menuColumns: Column<MenuTableData>[] = [
  {
    key: "no",
    value: "NO",
    width: "5%",
  },
  {
    key: "menuUrl",
    value: "메뉴 경로",
  },
  {
    key: "menuName",
    value: "메뉴명",
    width: "15%",
  },
  {
    key: "menupathName",
    value: "영문 메뉴명",
    width: "15%",
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

// 메뉴 관리 테이블 검색 Select 컴포넌트의 Option 설정 정보
export const menuSearchOptionList: Option<MenuTableData>[] = [
  {
    value: "menuName",
    title: "메뉴명",
  },
  {
    value: "menupathName",
    title: "영문 메뉴명",
  },
  {
    value: "menuUrl",
    title: "메뉴 경로",
  },
];

// 메뉴 관리 테이블 검색 파라미터 세팅정보
export const menuInitSearchParam: SearchParam<MenuTableData> = {
  field: "menuName",
  query: "",
};
