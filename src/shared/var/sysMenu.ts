import Button from "@/component/ui-components/Button";
import { Column, SearchParam } from "@/shared/type/table";
import { Option } from "@/shared/type/select";
import { MenuInfo } from "./menu";
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

export const menuColumns: Column<MenuTableData>[] = [
  {
    key: "no",
    value: "NO",
  },
  {
    key: "menuUrl",
    value: "메뉴 경로",
  },
  {
    key: "menuName",
    value: "메뉴명",
  },
  {
    key: "menupathName",
    value: "영문 메뉴명",
  },
  {
    key: "registDate",
    value: "등록일",
  },
  {
    key: "mng",
    value: "관리",
  },
];

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

export const menuInitSearchParam: SearchParam<MenuTableData> = {
  field: "menuName",
  query: "",
};

interface DashMenu extends Menu {
  children?: DashMenu[];
}

const getMenuInfo = function (menu: Menu) {
  const result: MenuInfo = {
    title: menu.menuName,
    path: "",
    to: "",
  };
};

const addChildMenu = function <T extends { children?: T[] }>(
  pMenu: T,
  cMenu: T
) {
  pMenu.children = pMenu.children || [];
  pMenu.children.push(cMenu);
};

const getMenuInfoList = (menuList: Menu[]) => {
  const mapper = new Map<string, DashMenu>();
  menuList.forEach((menu) => {
    if (menu.depth === 1) {
      mapper.set(menu.menuId, menu);
    } else {
      const bpMenu = mapper.get(menu.bigparentId!)!;
      //depth = 2 인 경우 bigParent, depth = 3 인 경우 midParent가 직속 부모
      const pMenu =
        menu.depth === 2
          ? bpMenu
          : bpMenu.children?.find((e) => e.menuId === menu.midparentId)!;

      addChildMenu<DashMenu>(pMenu, menu);
    }
  });
  return Array.from(mapper).map(([_, value]) => value);
};

export const authMenu: Menu[] = [
  {
    menuId: "ecfb5430-0315-4cfe-99e7-433cb4c5ac73",
    bigparentId: null,
    midparentId: null,
    menupathName: "yeoron-main",
    menuName: "생생시민소리",
    menuUrl: "생생시민소리",
    embedUrl: "/yeoron0905/Main",
    sortNo: 1,
    depth: 1,
    etc: "생생",
    registDate: "2023-09-12T16:03:54.459",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "2a8910de-56ef-4f12-9df1-8b788245d875",
    bigparentId: "ecfb5430-0315-4cfe-99e7-433cb4c5ac73",
    midparentId: null,
    menupathName: "yeoron-keyword",
    menuName: "키워드 분석",
    menuUrl: "생생시민소리 => 키워드 분석",
    embedUrl: "/yeoron0905/Keyword",
    sortNo: 1,
    depth: 2,
    etc: "키워드 1번",
    registDate: "2023-09-12T16:23:25.774",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "12b3448c-de3b-4ee6-876f-b1be963d8b98",
    bigparentId: "ecfb5430-0315-4cfe-99e7-433cb4c5ac73",
    midparentId: null,
    menupathName: "yeoron-sentiment",
    menuName: "감정 분석",
    menuUrl: "생생시민소리 => 감정 분석",
    embedUrl: "/yeoron0905/Sentiment",
    sortNo: 2,
    depth: 2,
    etc: "감정 분석 시민소리",
    registDate: "2023-09-12T16:24:31.043",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "c672b47f-6517-4a5f-b118-3706eb3bc004",
    bigparentId: "ecfb5430-0315-4cfe-99e7-433cb4c5ac73",
    midparentId: null,
    menupathName: "yeoron-post",
    menuName: "게시글 분석",
    menuUrl: "생생시민소리 => 게시글 분석",
    embedUrl: "/yeoron0905/Post",
    sortNo: 3,
    depth: 2,
    etc: "게시글 분석 시민소리 테스트 글자수 테스트 반복 특수문자 @345 (5060) 추가 반복 반복 영어 AB cd _ ggg 테스트",
    registDate: "2023-09-12T16:25:36.424",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "fb23a422-1364-48f8-b114-90700d19fc97",
    bigparentId: "ecfb5430-0315-4cfe-99e7-433cb4c5ac73",
    midparentId: null,
    menupathName: "yeoron-channel",
    menuName: "채널 분석",
    menuUrl: "생생시민소리 => 채널 분석",
    embedUrl: "/yeoron0905/Channel",
    sortNo: 4,
    depth: 2,
    etc: "체널 분석 시민소리 테스트 글자수 테스트 반복 특수문자 @345 (5060) 추가 반복 반복 영어 AB cd _ ggg 테스트",
    registDate: "2023-09-12T16:26:39.81",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "25e556b7-c805-42d2-a4f9-4b48b65462f6",
    bigparentId: null,
    midparentId: null,
    menupathName: "minwon-main",
    menuName: "민원 분석",
    menuUrl: "민원 분석",
    embedUrl: "/minwon0905/Main",
    sortNo: 2,
    depth: 1,
    etc: "민원",
    registDate: "2023-09-12T16:04:53.87",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "b903dc3f-626a-468d-87fb-6f0ade2bbdb5",
    bigparentId: "25e556b7-c805-42d2-a4f9-4b48b65462f6",
    midparentId: null,
    menupathName: "minwon-region",
    menuName: "지역 분석",
    menuUrl: "민원 분석 => 지역 분석",
    embedUrl: "/yeoron0905/Region",
    sortNo: 1,
    depth: 2,
    etc: "민원의 지역분석 2레벨",
    registDate: "2023-09-12T16:28:24.282",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "de00b05b-993e-43a8-9ed4-5f6b56d7b71d",
    bigparentId: "25e556b7-c805-42d2-a4f9-4b48b65462f6",
    midparentId: null,
    menupathName: "minwon-trend",
    menuName: "추이 분석",
    menuUrl: "민원 분석 => 추이 분석",
    embedUrl: "/yeoron0905/Trend",
    sortNo: 2,
    depth: 2,
    etc: "민원의 추이분석 2레벨",
    registDate: "2023-09-12T16:29:06.443",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "c77f779b-3e32-471e-8cd6-cfd5da00b06d",
    bigparentId: "25e556b7-c805-42d2-a4f9-4b48b65462f6",
    midparentId: null,
    menupathName: "minwon-dept",
    menuName: "담당부서 분석",
    menuUrl: "민원 분석 => 담당부서 분석",
    embedUrl: "/yeoron0905/Dept",
    sortNo: 3,
    depth: 2,
    etc: "민원의 ekaekdqntj분석 2레벨",
    registDate: "2023-09-12T16:29:32.778",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "8d65b3b8-1383-4a88-9dc3-34585050baa5",
    bigparentId: "25e556b7-c805-42d2-a4f9-4b48b65462f6",
    midparentId: null,
    menupathName: "minwon-type",
    menuName: "처리유형 분석",
    menuUrl: "민원 분석 => 처리유형 분석",
    embedUrl: "/yeoron0905/Type",
    sortNo: 4,
    depth: 2,
    etc: "민원의 type 처리유형 분석 2레벨",
    registDate: "2023-09-12T16:29:59.275",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "d1588bcc-f139-406c-9e0a-22d738a88283",
    bigparentId: null,
    midparentId: null,
    menupathName: "news-main",
    menuName: "뉴스 분석",
    menuUrl: "뉴스 분석",
    embedUrl: "/news0905/Main",
    sortNo: 3,
    depth: 1,
    etc: "뉴스",
    registDate: "2023-09-12T16:08:26.562",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "e05968ed-19cf-4852-8d24-fa33b53a2112",
    bigparentId: "d1588bcc-f139-406c-9e0a-22d738a88283",
    midparentId: null,
    menupathName: "news0905-sheet1",
    menuName: "추이 분석",
    menuUrl: "뉴스 분석 => 추이 분석",
    embedUrl: "/news0905/sheet1",
    sortNo: 1,
    depth: 2,
    etc: "뉴스분석",
    registDate: "2023-09-12T16:40:30.614",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "9f84420b-e82c-41c7-a036-365ed558aeca",
    bigparentId: "d1588bcc-f139-406c-9e0a-22d738a88283",
    midparentId: null,
    menupathName: "news0905-sheet2",
    menuName: "카테고리 분석",
    menuUrl: "뉴스 분석 => 카테고리 분석",
    embedUrl: "/news0905/sheet2",
    sortNo: 2,
    depth: 2,
    etc: "뉴스분석 카테고리",
    registDate: "2023-09-12T16:41:08.384",
    registSysuserId: "testId",
    updateDate: null,
    updateSysuserId: null,
  },
  {
    menuId: "142fefdc-5ce1-4f4a-8b08-760421fcfe28",
    bigparentId: "d1588bcc-f139-406c-9e0a-22d738a88283",
    midparentId: null,
    menupathName: "news0905-sheet3",
    menuName: "키워드 분석",
    menuUrl: "뉴스 분석 => 키워드 분석",
    embedUrl: "/news0905/sheet3",
    sortNo: 3,
    depth: 2,
    etc: "키키워드",
    registDate: "2023-09-12T16:41:17.433",
    registSysuserId: "testId",
    updateDate: "2023-09-12T16:42:40.364",
    updateSysuserId: "testId",
  },
  {
    menuId: "09e9dc86-9b02-4d48-9e2d-ae2ff809f744",
    bigparentId: null,
    midparentId: null,
    menupathName: "serial",
    menuName: "시계열분석",
    menuUrl: "시계열분석",
    embedUrl:
      "https://www.youtube.com/embed/lEUS3_Qjyjg?feature=oembed&fs=0&t=1920",
    sortNo: 4,
    depth: 1,
    etc: "",
    registDate: "2023-10-11T16:17:54.307",
    registSysuserId: "yjjo",
    updateDate: "2023-10-11T19:41:31.022",
    updateSysuserId: "yjjo",
  },
];
