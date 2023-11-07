import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

//Date Picker 관련
import { Range, DateRange, RangeKeyDict } from "react-date-range";
import { subMonths, format, addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Dropdown } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { getFormattedDateRange } from "@/shared/util/dateRange";
import Loading from "@/component/ui-components/Loading";

const Log = function () {
  //@@@@@@@ 선언 @@@@@@@

  //Table 데이터 영역
  const columns = useMemo(() => logColumns, []);
  const [originData, setOriginData] = useState<LogTableData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  //Date Picker DropDown 관련
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [showDatePicker]);

  const dpDropDownRef = useRef<HTMLDivElement | null>(null);

  //Date Picker 관련
  const initStartDate = addDays(subMonths(new Date(), 3), 1),
    initEndDate = new Date();

  const [startDate, setStartDate] = useState(initStartDate);
  const [endDate, setEndDate] = useState(initEndDate);

  const [state, setState] = useState<Range[]>([
    {
      startDate: initStartDate,
      endDate: initEndDate,
      key: "selection",
    },
  ]);

  //CSV 다운로드 관련
  const excelHeaders = columns.map((column) => ({
    key: column.key,
    label: column.value as string,
  }));

  const excelFileName = `생생소리정보시스템-접속이력-${getFormattedDateRange(
    startDate,
    endDate
  )}.csv`;

  //@@@@@@@ 컴포넌트 로직 @@@@@@@

  const {
    logStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  const loadTableData = useCallback(
    function () {
      setIsLoading(true);
      const startDateParam = format(startDate, "yyyy-MM-dd");
      const endDateParam = format(endDate, "yyyy-MM-dd");
      logStore
        .find(startDateParam, endDateParam)
        .then((result) => {
          if (result.data) {
            const logs = getLogTableData(result.data);
            setOriginData(logs);
          }
        })
        .catch((error) => {
          customAlert(ERROR.NOT_PROCESSED, "FAIL");
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [startDate, endDate]
  );

  useLayoutEffect(() => {
    loadTableData();
  }, [startDate, endDate]);

  //외부 영역 클릭시 datePickerDropDown 닫기
  useEffect(() => {
    const handleDpDropDownClose = (e: MouseEvent) => {
      if (
        showDatePicker &&
        !dpDropDownRef.current?.contains(e.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("click", handleDpDropDownClose);

    return () => document.removeEventListener("click", handleDpDropDownClose);
  }, [showDatePicker]);

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

  const handleDateRangeFilterClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleDatePicker();
  };

  const handleDatePickerRangeChange = (item: RangeKeyDict) => {
    const selection = item.selection;
    setState([selection]);
    const { startDate, endDate } = selection;
    setStartDate(startDate!);
    setEndDate(endDate!);

    setPage(firstPage);
  };

  return (
    <div className="card-box">
      <div className="card-box-body">
        <div className="table-control-top">
          <div className="table-control-top-side">
            {/* DateRangeFilter */}
            <div
              onClick={handleDateRangeFilterClick}
              className="form-control-dateRange form-control"
            >
              <i className="fe-calendar"></i>{" "}
              <span>{getFormattedDateRange(startDate, endDate)}</span>
            </div>
            <Dropdown.Menu ref={dpDropDownRef} show={showDatePicker}>
              <DateRange
                calendarFocus="backwards"
                editableDateInputs={true}
                onChange={handleDatePickerRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
                maxDate={initEndDate}
              />
            </Dropdown.Menu>

            <div className="table-search-wrap">
              <TableSearch<LogTableData>
                optionList={searchOptionList}
                onSubmit={handleSearchBtnClick}
              />
            </div>
          </div>

          <div className="btn-wrap">
            <CSVLink
              data={searchedData}
              headers={excelHeaders}
              filename={excelFileName}
              className="btn btn-primary btn-sm rounded-pill"
            >
              <i className="fe-file" />
              CSV
            </CSVLink>
          </div>
        </div>
        <div className="table-wrap">
          {isLoading ? (
            <Loading />
          ) : originData.length === 0 ? (
            <div>No Data</div>
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
