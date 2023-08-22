export type MenuInfo = {
  title: string;
  path: string;
  children?: MenuInfo[];
  to: string;
  icon?: string;
};

export const menuInfoList: MenuInfo[] = [
  {
    title: "생생 시민소리",
    path: "dashboard",
    to: "/dashboard",
    icon: "mdi mdi-chart-box-outline",
    children: [
      {
        title: "키워드 분석",
        path: "Dashboard_1",
        to: "/dashboard/Dashboard_1",
      },
      {
        title: "감정 분석",
        path: "Dashboard_2",
        to: "/dashboard/Dashboard_2",
      },
      {
        title: "게시글 분석",
        path: "Dashboard_3",
        to: "/dashboard/Dashboard_3",
      },
      {
        title: "채널 분석",
        path: "Dashboard_4",
        to: "/dashboard/Dashboard_4",
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
