import MenuModifyModal from "@/component/Menu/MenuModifyModal";
import MenuRegisterModal from "@/component/Menu/MenuRegisterModal";
import TableSearch from "@/component/Common/TableSearch";
import Button from "@/component/ui-components/Button";
import CustomPagination from "@/component/ui-components/CustomPagination";
import Loading from "@/component/ui-components/Loading";
import Table from "@/component/ui-components/Table";
import { customConfirm } from "@/confirm-lib/util";
import { useStores } from "@/modules/Store";
import { useModal } from "@/shared/hooks/modal";
import { paginateData, searchData } from "@/shared/util/table";
import { CONFIRM, ERROR, SUCCESS } from "@/shared/var/msg";
import {
  MenuTableData,
  getMenuTableData,
  menuColumns,
  menuInitSearchParam,
  menuSearchOptionList,
  Menu as TMenu,
} from "@/shared/var/sysMenu";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";

const Menu = function () {
  //@@@@@@@ 선언 @@@@@@@

  //Table 데이터 영역
  const columns = useMemo(() => menuColumns, []);
  const [originData, setOriginData] = useState<MenuTableData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //선택된 데이터 영역
  const [selectedData, setSelectedData] = useState(new Set<string>());

  //Search 영역
  const searchOptionList = useMemo(() => menuSearchOptionList, []);
  //검색 버튼 눌렀을때 적용되는 유효한 검색어
  const [searchParam, setSearchParam] = useState(menuInitSearchParam);
  const searchedData = useMemo(
    () => searchData(originData, searchParam),
    [originData, searchParam]
  );
  //총 데이터 수
  const count = useMemo(() => searchedData.length, [searchedData]);

  //Pagination 영역
  const initialPage = 1,
    pageSize = 10,
    pagingSize = 5;
  const firstPage = initialPage;
  const [page, setPage] = useState(initialPage);

  const pageSizedPaginateData = paginateData.bind(null, pageSize);
  const pagedData = pageSizedPaginateData(searchedData, page);

  //모달 영역
  const { modalShow: regModalShow, toggleModal: toggleRegModal } = useModal();
  const { modalShow: modModalShow, toggleModal: toggleModModal } = useModal();

  //수정 영역
  const [modifyMenu, setModifyMenu] = useState<TMenu | null>(null);

  //@@@@@@@ 컴포넌트 로직 @@@@@@@

  const {
    menuStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  const handleMenuModBtnClick = (menu: TMenu) => {
    setModifyMenu(menu);
    toggleModModal();
  };

  const loadTableData = useCallback(function () {
    setIsLoading(true);
    menuStore
      .findAll()
      .then((result) => {
        if (result.data) {
          const menus = getMenuTableData(result.data, handleMenuModBtnClick);
          setOriginData(menus);
          //스토어에 메뉴 목록 저장
          menuStore.setMenus(result.data);
        }
      })
      .catch((error) => {
        customAlert(ERROR.NOT_PROCESSED, "FAIL");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useLayoutEffect(() => {
    loadTableData();
  }, []);

  //@@@@@@ 콜백함수 선언 @@@@@@
  const handleSearchBtnClick = useCallback(function (
    selectVal: keyof MenuTableData,
    inputVal: string
  ) {
    setPage(firstPage);
    setSearchParam({
      field: selectVal,
      query: inputVal,
    });
  }, []);

  const handleDeleteBtnClick = useCallback(async () => {
    if (selectedData.size === 0) {
      customAlert(ERROR.NO_SELECTION, "FAIL");
      return;
    }
    const isConfirmed = await customConfirm(CONFIRM.DELETE);
    if (isConfirmed) {
      const selectedDataArr = Array.from(selectedData);
      menuStore
        .deleteMenus(selectedDataArr)
        .then((result) => {
          if (result.data) {
            customAlert(SUCCESS.PROCCESSED);
            setPage(firstPage);
            loadTableData();
          } else {
            throw new Error(ERROR.STATUS_OK_BUT_FAIL);
          }
        })
        .catch((e) => {
          console.error(e);
          customAlert(ERROR.NOT_PROCESSED, "FAIL");
        });
    }
  }, [selectedData]);

  return (
    <>
      <div className="card-box">
        <div className="card-box-body">
          <div className="table-control-top">
            <div className="table-search-wrap">
              <TableSearch<MenuTableData>
                optionList={searchOptionList}
                onSubmit={handleSearchBtnClick}
              />
            </div>
            <div className="btn-wrap">
              <Button
                onClick={toggleRegModal}
                variant="primary"
                size="sm"
                classList={["rounded-pill"]}
              >
                <i className="fe-edit" />
                등록
              </Button>
              <Button
                onClick={handleDeleteBtnClick}
                variant="danger"
                size="sm"
                classList={["rounded-pill"]}
              >
                <i className="fe-x-circle" />
                선택 삭제
              </Button>
            </div>
          </div>
          <div className="table-wrap">
            {isLoading ? (
              <Loading />
            ) : originData.length === 0 ? (
              <div>No Data</div>
            ) : (
              <Table<MenuTableData>
                columns={columns}
                data={pagedData}
                isSelectable={true}
                dataIdKey="menuId"
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            )}
          </div>
          <CustomPagination
            count={count}
            pageSize={pageSize}
            pagingSize={pagingSize}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>

      {/* 등록 모달 */}
      <MenuRegisterModal
        show={regModalShow}
        toggleShow={toggleRegModal}
        onSubmitSuccess={loadTableData}
      />

      {/* 수정 모달 */}
      <MenuModifyModal
        show={modModalShow}
        toggleShow={toggleModModal}
        onSubmitSuccess={loadTableData}
        menu={modifyMenu}
      />
    </>
  );
};

export default Menu;
