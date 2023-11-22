import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStores } from "@/modules/Store";
import { Role, RoleGroup } from "@/shared/var/role";
import { ERROR, SUCCESS } from "@/shared/var/msg";

/**
 * 권한 관리 화면 컴포넌트
 * @returns
 */
const Authority = function () {
  const {
    authorityStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();
  const [groups, setGroups] = useState<RoleGroup[]>([]);
  const [originGroups, setOriginGroups] = useState<RoleGroup[]>([]);
  const [menus, setMenus] = useState<any>([]);
  const [originMenus, setOriginMenus] = useState<any>([]);
  const [role, setRole] = useState<string[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [searchGroupNm, setSearchGroupNm] = useState<String>("");
  const [searchMenuNm, setSearchMenuNm] = useState<String>("");
  const isMounted = useRef(false);

  function clickGroup(id: string) {
    setSelectedGroupId(id);
    setSearchMenuNm("");
    setMenus(originMenus);
  }

  function clickCancel() {
    setCheckItems([...role]);
  }

  function searchGroup() {
    setSelectedGroupId("");
    const result = originGroups.filter((group: RoleGroup) =>
      group.groupName.includes(searchGroupNm.toString())
    );
    setGroups(result);
  }

  function keySearchGroup(e: any) {
    if (e.key == "Enter") {
      searchGroup();
    }
  }

  function keySearchMenu(e: any) {
    if (e.key == "Enter") {
      searchMenu();
    }
  }

  function searchMenu() {
    const result = originMenus.filter((menu: any) =>
      menu.menuName.includes(searchMenuNm.toString())
    );
    setMenus(result);
  }

  const saveSearchGroupNm = (e: any) => {
    setSearchGroupNm(e.target.value);
  };

  const saveSearchMenuNm = (e: any) => {
    setSearchMenuNm(e.target.value);
  };

  async function clickSave() {
    if (selectedGroupId.length <= 0) {
      customAlert(ERROR.NO_SELECTION, "FAIL");
      return;
    }

    const role: Role = {
      groupId: selectedGroupId,
      menuIds: checkItems,
    };

    await authorityStore
      .saveRole(role)
      .then((res) => {
        if (res.data) {
          const role = res.data as Role;
          setRole(role.menuIds);
          customAlert(SUCCESS.PROCCESSED);
        }
      })
      .catch((error) => {
        console.error(error);
        customAlert(ERROR.NOT_PROCESSED, "FAIL");
      });
  }

  function checkItemHandler(id: string, isChecked: boolean) {
    if (isChecked) {
      setCheckItems([...checkItems, id]);
    } else if (!isChecked) {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  }

  async function getRole() {
    await authorityStore
      .listRole(selectedGroupId)
      .then((res) => {
        if (res.data) {
          const role = res.data as Role;
          setRole(role.menuIds);
          setCheckItems(role.menuIds);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (isMounted.current) {
      if (selectedGroupId.length > 0) {
        getRole();
      }
    } else {
      isMounted.current = true;
    }
  }, [selectedGroupId]);

  useLayoutEffect(() => {
    authorityStore
      .listGroup()
      .then((res) => {
        if (res.data) {
          setGroups(res.data as RoleGroup[]);
          setOriginGroups(res.data as RoleGroup[]);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    authorityStore
      .listMenu()
      .then((res) => {
        if (res.data) {
          setMenus(res.data);
          setOriginMenus(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="card-box">
            <div className="card-box-body">
              <div className="table-control-top">
                <div className="table-search-wrap">
                  <select name="" id="">
                    <option value="">그룹명</option>
                  </select>
                  <input
                    type="search"
                    onChange={saveSearchGroupNm}
                    onKeyDown={keySearchGroup}
                  />
                  <button className="btn" onClick={() => searchGroup()}>
                    <i className="fe-search" />
                  </button>
                </div>
              </div>
              <div className="table-wrap">
                <table className="table table-custom table-clickable">
                  <colgroup>
                    <col width="auto" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>그룹명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((item: any) => {
                      return (
                        <tr
                          className={
                            selectedGroupId === item.groupId ? "active" : ""
                          }
                          key={item.groupId}
                          onClick={() => clickGroup(item.groupId)}
                        >
                          <td>{item.groupName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card-box">
            <div className="card-box-body">
              <div className="table-control-top">
                <div className="table-search-wrap">
                  <select name="" id="">
                    <option value="">메뉴명</option>
                  </select>
                  <input
                    type="search"
                    onChange={saveSearchMenuNm}
                    onKeyDown={keySearchMenu}
                    value={searchMenuNm.toString()}
                  />
                  <button className="btn" onClick={() => searchMenu()}>
                    <i className="fe-search" />
                  </button>
                </div>
                <div className="btn-wrap">
                  <button
                    className="btn btn-sm rounded-pill btn-primary"
                    onClick={() => clickSave()}
                  >
                    <i className="fe-check-circle" />
                    저장
                  </button>
                  <button
                    className="btn btn-sm rounded-pill btn-dark"
                    onClick={() => clickCancel()}
                  >
                    <i className="fe-x-circle" />
                    취소
                  </button>
                </div>
              </div>
              <div className="table-wrap">
                <table className="table table-custom table-menu">
                  <colgroup>
                    <col width="auto" />
                    <col width="10%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>메뉴명</th>
                      <th>권한부여</th>
                    </tr>
                  </thead>
                  {selectedGroupId && (
                    <tbody>
                      {menus.map((item: any) => {
                        return (
                          <tr
                            key={item.menuId}
                            className={`tr-menu-depth${item.depth} no-child`}
                          >
                            <td>{item.menuName}</td>
                            <td>
                              <div className="checkbox">
                                <input
                                  type="checkbox"
                                  checked={checkItems.includes(item.menuId)}
                                  onChange={(e) =>
                                    checkItemHandler(
                                      item.menuId,
                                      e.currentTarget.checked
                                    )
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authority;
