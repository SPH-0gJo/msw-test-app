export interface MenuInfo {
  id?: string;
  title: string;
  path: string;
  children?: MenuInfo[];
  to: string;
  icon?: string;
  url?: string;
}

export const sysMenuInfoList: MenuInfo[] = [
  {
    id: "sys-group",
    title: "그룹 관리",
    path: "group",
    to: "/system/group",
    icon: "mdi mdi-account-group-outline",
  },
  {
    id: "sys-user",
    title: "사용자 관리",
    path: "user",
    to: "/system/user",
    icon: "mdi mdi-card-account-details-outline",
  },
  {
    id: "sys-menu",
    title: "메뉴 관리",
    path: "menu",
    to: "/system/menu",
    icon: "mdi mdi-folder-wrench-outline",
  },
  {
    id: "sys-authority",
    title: "접근 권한 관리",
    path: "authority",
    to: "/system/authority",
    icon: "mdi mdi-lock-outline",
  },
  {
    id: "sys-log",
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
    url: "YEORON/M_MT",
    children: [
      {
        title: "키워드 분석",
        path: "Dashboard_1",
        to: "/dashboard/Dashboard_1",
        url: "YEORON/K_M",
      },
      {
        title: "감정 분석",
        path: "Dashboard_2",
        to: "/dashboard/Dashboard_2",
        url: "YEORON/S",
      },
      {
        title: "게시글 분석",
        path: "Dashboard_3",
        to: "/dashboard/Dashboard_3",
        url: "YEORON/P",
      },
      {
        title: "채널 분석",
        path: "Dashboard_4",
        to: "/dashboard/Dashboard_4",
        url: "YEORON/C",
      },
    ],
  },
  {
    title: "뉴스 분석",
    path: "newsAnalysis",
    to: "/newsAnalysis",
    icon: "mdi mdi-chart-pie-outline",
    url: "news/M",
    children: [
      {
        title: "추이 분석",
        path: "Dashboard_1",
        to: "/newsAnalysis/Dashboard_1",
        url: "news/T",
      },
      {
        title: "카테고리 분석",
        path: "Dashboard_2",
        to: "/newsAnalysis/Dashboard_2",
        url: "news/C/sphserver/474c14b6-b58b-4279-8ecd-e93f8d5e0a0e",
      },
      {
        title: "키워드 분석",
        path: "Dashboard_3",
        to: "/newsAnalysis/Dashboard_3",
        url: "news/K/sphserver/f1c7c634-8069-4b38-8091-110425d8a742",
      },
    ],
  },
  {
    title: "시정 민원",
    path: "minwon",
    to: "/minwon",
    icon: "mdi mdi-view-dashboard-outline",
    url: "minwon_0926/NEW_Main",
    children: [
      {
        title: "지역 분석",
        path: "Dashboard_1",
        to: "/minwon/Dashboard_1",
        url: "minwon_0926/NEW_Region",
      },
      {
        title: "추이 분석",
        path: "Dashboard_2",
        to: "/minwon/Dashboard_2",
        url: "minwon_0926/NEW_Trend",
      },
      {
        title: "담당부서 분석",
        path: "Dashboard_3",
        to: "/minwon/Dashboard_3",
        url: "minwon_0926/NEW_Dept",
      },
      {
        title: "처리유형 분석",
        path: "Dashboard_4",
        to: "/minwon/Dashboard_4",
        url: "minwon_0926/NEW_Type",
      },
    ],
  },
];

export const getTableauUrl = function (
  menuInfoList: MenuInfo[],
  pathname: string
): null | string {
  let url = null;
  const menuInfoLength = menuInfoList.length;
  for (let i = 0; i < menuInfoLength; i++) {
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
