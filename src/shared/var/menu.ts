export interface MenuInfo {
  id?: string;
  title: string;
  path: string;
  children?: MenuInfo[];
  to: string;
  icon?: string;
  url?: string;
}

//시스템 관리 화면에서 사용할 메뉴 목록 변수
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

/**
 * 대시보드 메뉴 목록에서 pathname에 해당하는 메뉴의 태블로 임베딩 URL을 반환하는 함수
 * @param menuInfoList
 * @param pathname
 * @returns
 */
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
