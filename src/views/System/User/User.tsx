import React, { useEffect, useMemo, useState } from "react";
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

export type Column = {
  key: string;
  value: string | JSX.Element;
};

type Option = {
  value: string;
  title: string;
};

const filterData = function (pageSize: number, data: any[], page: number) {
  const startIdx = (page - 1) * pageSize;
  return data.slice(startIdx, startIdx + pageSize);
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

  const rawData = getUserTableData(users);
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

  const [searchParam, setSearchParam] = useState(initSearchParam);

  useEffect(() => setData(pageSizedFilterData(rawData, page)), [page]);

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

  const searchOptionList: Option[] = [
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
  ];

  return (
    <>
      <div className="card-box">
        <div className="card-box-body">
          <div className="table-control-top">
            <div className="table-search-wrap">
              <select
                onChange={(e) => {
                  setSearchParam((prevState) => ({
                    ...prevState,
                    field: e.target.value,
                  }));
                }}
                name=""
                id=""
              >
                {searchOptionList.map((opt) => (
                  <option
                    selected={opt.value === searchParam.field}
                    value={opt.value}
                  >
                    {opt.title}
                  </option>
                ))}
              </select>
              <input type="search" />
              <Button>
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
            <PagePrev
              onClick={() => {
                if (!hasPrev) return;
                setPage((prevState) => prevState - 1);
              }}
              disabled={!hasPrev}
            />

            {hasGoFirst && (
              <>
                <PageItem
                  onClick={() => {
                    setPage(firstPage);
                  }}
                >
                  {firstPage}
                </PageItem>
                <PageEllipsis />
              </>
            )}

            {pageList.map((pg) => (
              <PageItem
                onClick={() => {
                  setPage(pg);
                }}
                key={pg}
                active={pg === page}
              >
                {pg}
              </PageItem>
            ))}

            {hasGoLast && (
              <>
                <PageEllipsis />
                <PageItem
                  onClick={() => {
                    setPage(lastPage);
                  }}
                >
                  {lastPage}
                </PageItem>
              </>
            )}

            <PageNext
              onClick={() => {
                if (!hasNext) return;
                setPage((prevState) => prevState + 1);
              }}
              disabled={!hasNext}
            />
          </Pagination>
        </div>
      </div>
      {/* 모달창 */}
      <UserRegisterModal show={regModalShow} toggleShow={toggleRegModal} />
    </>
  );
};

export default User;
