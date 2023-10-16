import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import Button from "@/component/ui-components/Button";
import {
  LogTableData,
  getLogTableData,
  logColumns,
  logInitSearchParam,
  logSearchOptionList,
} from "@/shared/var/log";
import { paginateData, searchData } from "@/shared/util/table";
import { useStores } from "@/modules/Store";
import { ERROR } from "@/shared/var/msg";
import NonSelectableTable from "@/component/ui-components/NonSelectableTable";
import CustomPagination from "@/component/ui-components/CustomPagination";
import TableSearch from "@/component/TableSearch";

const Log = function () {
  //@@@@@@@ 선언 @@@@@@@

  //Table 데이터 영역
  const columns = useMemo(() => logColumns, []);
  const [originData, setOriginData] = useState<LogTableData[]>([]);

  //Search 영역
  const searchOptionList = useMemo(() => logSearchOptionList, []);
  //검색 버튼 눌렀을때 적용되는 유효한 검색어
  const [searchParam, setSearchParam] = useState(logInitSearchParam);
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

  const { logStore } = useStores();

  const loadTableData = useCallback(function () {
    logStore
      .find("2000-01-01", "2090-01-01")
      .then((result) => {
        if (result.data) {
          const logs = getLogTableData(result.data);
          setOriginData(logs);
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

  //@@@@@@ 콜백함수 선언 @@@@@@
  const handleSearchBtnClick = useCallback(function (
    selectVal: keyof LogTableData,
    inputVal: string
  ) {
    setPage(firstPage);
    setSearchParam({
      field: selectVal,
      query: inputVal,
    });
  }, []);

  return (
    <div className="card-box">
      <div className="card-box-body">
        <div className="table-control-top">
          <div className="table-search-wrap">
            <TableSearch<LogTableData>
              optionList={searchOptionList}
              onSubmit={handleSearchBtnClick}
            />
          </div>
          <div className="btn-wrap">
            <Button
              onClick={() => {}}
              variant="primary"
              size="sm"
              classList={["rounded-pill"]}
            >
              <i className="fe-file" />
              CSV
            </Button>
          </div>
        </div>
        <div className="table-wrap">
          {originData.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <NonSelectableTable<LogTableData>
              columns={columns}
              data={pagedData}
              dataIdKey="seq"
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
  );
};

export default Log;
