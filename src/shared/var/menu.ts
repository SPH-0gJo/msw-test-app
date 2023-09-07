export type MenuInfo = {
  title: string;
  path: string;
  children?: MenuInfo[];
  to: string;
  icon?: string;
  url?: string;
};

export const sysMenuInfoList: MenuInfo[] = [
  {
    title: "그룹 관리",
    path: "group",
    to: "/system/group",
    icon: "mdi mdi-account-group-outline",
  },
  {
    title: "사용자 관리",
    path: "user",
    to: "/system/user",
    icon: "mdi mdi-card-account-details-outline",
  },
  {
    title: "메뉴 관리",
    path: "menu",
    to: "/system/menu",
    icon: "mdi mdi-folder-wrench-outline",
  },
  {
    title: "접근 권한 관리",
    path: "authority",
    to: "/system/authority",
    icon: "mdi mdi-lock-outline",
  },
  {
    title: "접속 이력",
    path: "log",
    to: "/system/log",
    icon: "mdi mdi-history",
  },
];

export const menuInfoList: MenuInfo[] = [
  {
    title: "생생 시민소리",
    path: "dashboard",
    to: "/dashboard",
    icon: "mdi mdi-chart-box-outline",
    url: "yeoron0905/Main",
    children: [
      {
        title: "키워드 분석",
        path: "Dashboard_1",
        to: "/dashboard/Dashboard_1",
        url: "yeoron0905/Keyword",
      },
      {
        title: "감정 분석",
        path: "Dashboard_2",
        to: "/dashboard/Dashboard_2",
        url: "yeoron0905/Sentiment",
      },
      {
        title: "게시글 분석",
        path: "Dashboard_3",
        to: "/dashboard/Dashboard_3",
        url: "yeoron0905/Post",
      },
      {
        title: "채널 분석",
        path: "Dashboard_4",
        to: "/dashboard/Dashboard_4",
        url: "yeoron0905/Channel",
      },
    ],
  },
  {
    title: "뉴스 분석",
    path: "newsAnalysis",
    to: "/newsAnalysis",
    icon: "mdi mdi-chart-pie-outline",
    url: "news0905/Main",
    children: [
      {
        title: "추이 분석",
        path: "Dashboard_1",
        to: "/newsAnalysis/Dashboard_1",
        url: "news0905/sheet1",
      },
      {
        title: "카테고리 분석",
        path: "Dashboard_2",
        to: "/newsAnalysis/Dashboard_2",
        url: "news0905/sheet2",
      },
      {
        title: "키워드 분석",
        path: "Dashboard_3",
        to: "/newsAnalysis/Dashboard_3",
        url: "news0905/sheet3",
      },
    ],
  },
  {
    title: "시정 민원",
    path: "minwon",
    to: "/minwon",
    icon: "mdi mdi-view-dashboard-outline",
    url: "minwon0905/Main",
    children: [
      {
        title: "지역 분석",
        path: "Dashboard_1",
        to: "/minwon/Dashboard_1",
        url: "minwon0905/Region",
      },
      {
        title: "추이 분석",
        path: "Dashboard_2",
        to: "/minwon/Dashboard_2",
        url: "minwon0905/Trend",
      },
      {
        title: "담당부서 분석",
        path: "Dashboard_3",
        to: "/minwon/Dashboard_3",
        url: "minwon0905/Dept",
      },
      {
        title: "처리유형 분석",
        path: "Dashboard_4",
        to: "/minwon/Dashboard_4",
        url: "minwon0905/Type",
      },
    ],
  },
];

export const getTableauUrl = function (
  menuInfoList: MenuInfo[],
  pathname: string
): null | string {
  let url = null;
  for (let i = 0; i < menuInfoList.length; i++) {
    const menu = menuInfoList[i];
    if (menu.to === pathname) {
      url = menu.url ? menu.url : null;
      return url;
    }

    if (menu.children) {
      url = getTableauUrl(menu.children, pathname);
      if (url) {
        return url;
      }
    }
  }
  return url;
};
