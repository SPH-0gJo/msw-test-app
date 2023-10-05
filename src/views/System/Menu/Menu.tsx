import Table from "@/component/ui-components/Table";
import { useStores } from "@/modules/Store";
import { paginateData, searchData } from "@/shared/util/table";
import { ERROR } from "@/shared/var/msg";
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

  //@@@@@@@ 컴포넌트 로직 @@@@@@@

  const { menuStore } = useStores();

  const handleMenuModBtnClick = (menu: TMenu) => {};

  const loadTableData = useCallback(function () {
    menuStore
      .findAll()
      .then((result) => {
        if (result.data) {
          const menus = getMenuTableData(result.data, handleMenuModBtnClick);
          setOriginData(menus);
        }
      })
      .catch((error) => {
        alert(ERROR.NOT_PROCESSED);
        console.error(error);
      });
  }, []);

  useLayoutEffect(() => {
    loadTableData();
  }, []);

  return (
    <>
      <div className="card-box">
        <div className="card-box-body">
          <div className="table-control-top">
            <div className="table-search-wrap">
              {/* <TableSearch<GroupTableData>
                optionList={searchOptionList}
                onSubmit={handleSearchBtnClick}
              /> */}
            </div>
            <div className="btn-wrap">
              {/* <Button
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
              </Button> */}
            </div>
          </div>
          <div className="table-wrap">
            {originData.length === 0 ? (
              <div>Loading...</div>
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
          {/* <CustomPagination
            count={count}
            pageSize={pageSize}
            pagingSize={pagingSize}
            page={page}
            setPage={setPage}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Menu;
