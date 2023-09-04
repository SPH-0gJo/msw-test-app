export type MenuInfo = {
  title: string;
  path: string;
  children?: MenuInfo[];
  to: string;
  icon?: string;
  url?: string;
};

export const menuInfoList: MenuInfo[] = [
  {
    title: "생생 시민소리",
    path: "dashboard",
    to: "/dashboard",
    icon: "mdi mdi-chart-box-outline",
    url: "yeoron_server0817/Main",
    children: [
      {
        title: "키워드 분석",
        path: "Dashboard_1",
        to: "/dashboard/Dashboard_1",
        url: "yeoron_server0817/Keyword",
      },
      {
        title: "감정 분석",
        path: "Dashboard_2",
        to: "/dashboard/Dashboard_2",
        url: "yeoron_server0817/Sentiment",
      },
      {
        title: "게시글 분석",
        path: "Dashboard_3",
        to: "/dashboard/Dashboard_3",
        url: "yeoron_server0817/Post",
      },
      {
        title: "채널 분석",
        path: "Dashboard_4",
        to: "/dashboard/Dashboard_4",
        url: "yeoron_server0817/Channel",
      },
    ],
  },
  {
    title: "뉴스 분석",
    path: "newsAnalysis",
    to: "/newsAnalysis",
    icon: "mdi mdi-chart-pie-outline",
    children: [
      {
        title: "메뉴 레벨2",
        path: "Dashboard_1",
        to: "/newsAnalysis/Dashboard_1",
        children: [
          {
            title: "메뉴 레벨3",
            path: "Dashboard_2",
            to: "/newsAnalysis/Dashboard_1/Dashboard_2",
          },
          {
            title: "메뉴 레벨3",
            path: "Dashboard_3",
            to: "/newsAnalysis/Dashboard_1/Dashboard_3",
          },
        ],
      },
      {
        title: "메뉴 레벨2",
        path: "Dashboard_2",
        to: "/newsAnalysis/Dashboard_2",
      },
      {
        title: "메뉴 레벨2",
        path: "Dashboard_3",
        to: "/newsAnalysis/Dashboard_3",
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
