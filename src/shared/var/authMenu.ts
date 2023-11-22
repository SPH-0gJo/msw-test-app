import { MenuInfo } from "./menu";
import { Menu } from "./sysMenu";

export interface AuthMenu
  extends Omit<
    Menu,
    "etc" | "registDate" | "registSysuserId" | "updateDate" | "updateSysuserId"
  > {
  childMenu: AuthMenu[];
}

export const getMenuInfoList = function (
  authMenus: AuthMenu[],
  parentPath: string = ""
): MenuInfo[] {
  return authMenus.map(
    ({ menuName, menupathName, embedUrl, childMenu, menuId }) => {
      const curFullPath = `${parentPath}/${menupathName}`;
      return {
        id: menuId,
        title: menuName,
        path: menupathName,
        to: curFullPath,
        url: embedUrl,
        children: getMenuInfoList(childMenu, curFullPath),
      };
    }
  );
};

const authMenuList: AuthMenu[] = [
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
    childMenu: [
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
        childMenu: [],
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
        childMenu: [],
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
        childMenu: [],
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
        childMenu: [],
      },
    ],
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
    childMenu: [
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
        childMenu: [],
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
        childMenu: [],
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
        childMenu: [],
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
        childMenu: [],
      },
    ],
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
    childMenu: [
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
        childMenu: [],
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
        childMenu: [],
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
        childMenu: [],
      },
    ],
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
    childMenu: [
      {
        menuId: "90d009e4-fa6d-4dc3-9ec0-fb515dc2c90d",
        bigparentId: "09e9dc86-9b02-4d48-9e2d-ae2ff809f744",
        midparentId: null,
        menupathName: "si-child",
        menuName: "시계열하위",
        menuUrl: "시계열분석 => 시계열하위",
        embedUrl: "/si/sheet1",
        sortNo: 1,
        depth: 2,
        childMenu: [],
      },
      {
        menuId: "ca30c2d7-6a81-462b-9170-ee846db0f8ba",
        bigparentId: "09e9dc86-9b02-4d48-9e2d-ae2ff809f744",
        midparentId: null,
        menupathName: "si-sub",
        menuName: "시계열하위하",
        menuUrl: "시계열분석 => 시계열하위하",
        embedUrl: "/si/sub",
        sortNo: 2,
        depth: 2,
        childMenu: [],
      },
    ],
  },
];

export const authMenuInfoList = getMenuInfoList(authMenuList);
