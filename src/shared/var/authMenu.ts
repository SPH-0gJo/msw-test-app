import { MenuInfo } from "@/shared/var/menu";
import { Menu } from "@/shared/var/sysMenu";

export interface AuthMenu
  extends Omit<
    Menu,
    "etc" | "registDate" | "registSysuserId" | "updateDate" | "updateSysuserId"
  > {
  childMenu: AuthMenu[];
}

/**
 * 응답 데이터인 권한 대시보드 메뉴 데이터를 MenuInfo 형태로 정제하는 함수
 * @param authMenus
 * @param parentPath
 * @returns
 */
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
