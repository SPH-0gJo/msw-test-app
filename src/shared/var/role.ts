export interface RoleGroup {
	groupId: string;
	groupName: string;
  }

  export interface RoleMenu {
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

  export interface Role {
	groupId: string;
	menuIds: string[];
  }