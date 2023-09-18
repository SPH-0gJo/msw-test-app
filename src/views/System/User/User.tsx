import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserRegisterModal from "@/component/User/UserRegisterModal";
import Table from "@/component/ui-components/Table";
import CheckBox from "@/component/ui-components/CheckBox";
import { UserData, getUserTableData, users } from "@/shared/var/user";
import Pagination from "@/component/ui-components/Pagination";
import PageNext from "@/component/ui-components/PageNext";
import PagePrev from "@/component/ui-components/PagePrev";
import PageEllipsis from "@/component/ui-components/PageEllipsis";
import { usePagination } from "@/shared/pagination";
import PageItem from "@/component/ui-components/PageItem";
import Button from "@/component/ui-components/Button";
import PageItemList from "@/component/ui-components/PageItemList";
import _ from "lodash";

export type Column = {
  key: string;
  value: string | JSX.Element;
};

type Option = {
  value: string;
  title: string;
};

interface SearchParam {
  field: string;
  query: string;
}

const filterData = function (pageSize: number, data: any[], page: number) {
  const startIdx = (page - 1) * pageSize;
  return data.slice(startIdx, startIdx + pageSize);
};

const searchFilterData = function <T>(data: T[], searchParam: SearchParam) {
  const cloneData = _.cloneDeep(data);

  const regex = new RegExp(searchParam.query, "g");

  const searchAppliedData = cloneData.filter((dt: T) => {
    const value = dt[searchParam.field as keyof T];
    if (!value || typeof value !== "string") {
      return false;
    }
    return regex.test(value);
  });

  return searchAppliedData;
};

const _filterData = function <T>(
  pageSize: number,
  data: T[],
  page: number,
  searchParam: SearchParam
) {
  const cloneData = _.cloneDeep(data);

  const regex = new RegExp(searchParam.query, "g");

  const searchAppliedData = cloneData.filter((dt: T) => {
    const value = dt[searchParam.field as keyof T];
    if (!value || typeof value !== "string") {
      return false;
    }
    return regex.test(value);
  });

  const startIdx = (page - 1) * pageSize;
  return searchAppliedData.slice(startIdx, startIdx + pageSize);
};

const User = function () {
  //등록 모달
  const [regModalShow, setRegModalShow] = useState<boolean>(false);

  // Show/hide the modal
  const toggleRegModal = () => {
    setRegModalShow(!regModalShow);
  };

  const pageSize = 10,
    initPage = 1;

  //pageSize는 고정이므로 매번 넣기보다는 Currying...
  const pageSizedFilterData = filterData.bind(null, pageSize);

  //전체 데이터 (검색등으로 변경되기고, 전체 페이지 목록 계산에 영향)
  const originData = getUserTableData(users);
  const [rawData, setRawData] = useState(_.cloneDeep(originData));

  //한 페이지에 표시되는 데이터
  const initData = pageSizedFilterData(rawData, initPage);
  const [data, setData] = useState(initData);

  const {
    pageList,
    page,
    hasPrev,
    hasNext,
    lastPage,
    hasGoLast,
    hasGoFirst,
    firstPage,
    setPage,
  } = usePagination(rawData, initPage, pageSize);

  const initSearchParam = {
    field: "userName",
    query: "",
  };

  const [searchParam, setSearchParam] = useState<SearchParam>(initSearchParam);

  //검색어 입력시 rawData state가 변경 -> 아래 함수 자동으로 호출
  // page 변경시 page state가 변경  -> 아래 함수 자동으로 호출
  useEffect(() => setData(pageSizedFilterData(rawData, page)), [rawData, page]);

  //Column의 key는 data의 정보를 가져 오기위해서는 data 객체의 key와 동일해야함.

  const columns: Column[] = useMemo(
    () => [
      {
        key: "ckbox",
        value: <CheckBox />,
      },
      {
        key: "no",
        value: "NO",
      },
      {
        key: "groupName",
        value: "그룹명",
      },
      {
        key: "userId",
        value: "아이디",
      },
      {
        key: "userName",
        value: "이름",
      },
      {
        key: "registDate",
        value: "등록일",
      },
      {
        key: "mng",
        value: "관리",
      },
    ],
    []
  );

  const searchOptionList: Option[] = useMemo(
    () => [
      {
        value: "userId",
        title: "아이디",
      },
      {
        value: "groupName",
        title: "그룹명",
      },
      {
        value: "userName",
        title: "이름",
      },
    ],
    []
  );

  const handlePagePrevClick = useCallback(() => {
    if (!hasPrev) return;
    setPage((prevState) => prevState - 1);
  }, [hasPrev]);

  const handleGoFirstPageClick = useCallback(() => {
    setPage(firstPage);
  }, [firstPage]);

  const handlePageItemClick = useCallback((pg: number) => {
    return () => {
      setPage(pg);
    };
  }, []);

  const handleGoLastPageClick = useCallback(() => {
    setPage(lastPage);
  }, [lastPage]);

  const handlePageNextClick = useCallback(() => {
    if (!hasNext) return;
    setPage((prevState) => prevState + 1);
  }, [hasNext]);

  const handleSearchSelectChange: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      setSearchParam((prevState) => ({
        ...prevState,
        field: e.target.value,
      }));
    }, []);

  const handleSearchBtnClick = useCallback(() => {
    setRawData((prevState: UserData[]) =>
      searchFilterData<UserData>(prevState, searchParam)
    );
    //const filteredData = _filterData(pageSize, rawData, page, searchParam);
    //setData(filteredData);
  }, [searchParam]);

  return (
    <>
      <div className="card-box">
        <div className="card-box-body">
          <div className="table-control-top">
            <div className="table-search-wrap">
              {/* Search Select */}
              <select onChange={handleSearchSelectChange} name="" id="">
                {searchOptionList.map((opt) => {
                  //page 클릭시 page, data state 변경으로 인해 2번 렌더링되는 이슈
                  console.log("option created");
                  return (
                    <option
                      selected={opt.value === searchParam.field}
                      value={opt.value}
                    >
                      {opt.title}
                    </option>
                  );
                })}
              </select>
              {/* Search Input */}
              <input
                value={searchParam.query}
                type="search"
                onChange={(e) => {
                  setSearchParam((prevState) => ({
                    ...prevState,
                    query: e.target.value,
                  }));
                }}
              />
              {/* Search Button */}
              <Button onClick={handleSearchBtnClick}>
                <i className="fe-search" />
              </Button>
            </div>
            <div className="btn-wrap">
              <button
                onClick={toggleRegModal}
                className="btn btn-sm rounded-pill btn-primary"
              >
                <i className="fe-edit" />
                등록
              </button>
              <button className="btn btn-sm rounded-pill btn-danger">
                <i className="fe-x-circle" />
                선택 삭제
              </button>
            </div>
          </div>
          <div className="table-wrap">
            <Table<UserData> columns={columns} data={data} />
          </div>
          <Pagination>
            <PagePrev onClick={handlePagePrevClick} disabled={!hasPrev} />

            {hasGoFirst && (
              <>
                <PageItem onClick={handleGoFirstPageClick}>
                  {firstPage}
                </PageItem>
                <PageEllipsis />
              </>
            )}

            <PageItemList
              pageList={pageList}
              page={page}
              onClick={handlePageItemClick}
            />
            {/* {pageList.map((pg) => {
              console.log("pageList");
              return (
                <PageItem
                  onClick={(e) => {
                    console.dir(e.target);
                  }}
                  key={pg}
                  active={pg === page}
                >
                  {pg}
                </PageItem>
              );
            })} */}

            {hasGoLast && (
              <>
                <PageEllipsis />
                <PageItem onClick={handleGoLastPageClick}>{lastPage}</PageItem>
              </>
            )}

            <PageNext onClick={handlePageNextClick} disabled={!hasNext} />
          </Pagination>
        </div>
      </div>
      {/* 모달창 */}
      <UserRegisterModal show={regModalShow} toggleShow={toggleRegModal} />
    </>
  );
};

export default User;
