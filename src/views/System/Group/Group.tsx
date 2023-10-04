import TableSearch from "@/component/TableSearch";
import Button from "@/component/ui-components/Button";
import Table from "@/component/ui-components/Table";
import { useStores } from "@/modules/Store";
import { paginateData, searchData } from "@/shared/util/table";
import {
  GroupTableData,
  getGroupTableData,
  groupColumns,
  groupInitSearchParam,
  groupSearchOptionList,
  Group as TGroup,
} from "@/shared/var/group";
import { ERROR } from "@/shared/var/msg";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";

const Group = function () {
  //@@@@@@@ 선언 @@@@@@@

  //Table 데이터 영역
  const columns = useMemo(() => groupColumns, []);
  const [originData, setOriginData] = useState<GroupTableData[]>([]);

  //선택된 데이터 영역
  const [selectedData, setSelectedData] = useState(new Set<string>());

  //Search 영역
  const searchOptionList = useMemo(() => groupSearchOptionList, []);
  //검색 버튼 눌렀을때 적용되는 유효한 검색어
  const [searchParam, setSearchParam] = useState(groupInitSearchParam);
  const searchedData = useMemo(
    () => searchData(originData, searchParam),
    [originData, searchParam]
  );

  //Pagination 영역
  const initialPage = 1,
    pageSize = 10,
    pagingSize = 5;
  const [page, setPage] = useState(initialPage);

  const pageSizedPaginateData = paginateData.bind(null, pageSize);
  const pagedData = pageSizedPaginateData(searchedData, page);

  //@@@@@@@ 컴포넌트 로직 @@@@@@@

  const { groupStore } = useStores();

  const handleGroupModBtnClick = (target: TGroup) => {};

  const loadTableData = useCallback(function () {
    groupStore
      .findAll()
      .then((result) => {
        if (result.data) {
          const groups = getGroupTableData(result.data, handleGroupModBtnClick);
          setOriginData(groups);
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
            <Table<GroupTableData>
              columns={columns}
              data={pagedData}
              isSelectable={true}
              dataIdKey="groupId"
              selectedData={selectedData}
              setSelectedData={setSelectedData}
            />
          )}
        </div>
        {/* <Pagination>
      <PagePrev onClick={handlePagePrevClick} disabled={!hasPrev} />

      {hasGoFirst && (
        <>
          <PageItem onClick={handleGoFirstPageClick}>
            {firstPage}
          </PageItem>
          <PageEllipsis />
        </>
      )}

      <PageItemList pageList={pageList} page={page} setPage={setPage} />
      {hasGoLast && (
        <>
          <PageEllipsis />
          <PageItem onClick={handleGoLastPageClick}>{lastPage}</PageItem>
        </>
      )}

      <PageNext onClick={handlePageNextClick} disabled={!hasNext} />
    </Pagination> */}
      </div>
    </div>
  );
};

export default Group;
