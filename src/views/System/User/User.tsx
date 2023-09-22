import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import UserRegisterModal from "@/component/User/UserRegisterModal";
import Table from "@/component/ui-components/Table";
import CheckBox from "@/component/ui-components/CheckBox";
import { UserTableData, getUserTableData, users } from "@/shared/var/user";
import Pagination from "@/component/ui-components/Pagination";
import PageNext from "@/component/ui-components/PageNext";
import PagePrev from "@/component/ui-components/PagePrev";
import PageEllipsis from "@/component/ui-components/PageEllipsis";
import { usePagination } from "@/shared/pagination";
import PageItem from "@/component/ui-components/PageItem";
import PageItemList from "@/component/ui-components/PageItemList";
import { Column, SearchParam } from "@/shared/type/table";
import { Option } from "@/shared/type/select";
import TableSearch from "@/component/TableSearch";
import { paginateData, searchData } from "@/shared/util/table";
import Button from "@/component/ui-components/Button";
import { useStores } from "@/modules/Store";
import { CONFIRM } from "@/shared/var/msg";

const User = function () {
  const { accountStore } = useStores();

  //등록 모달
  const [regModalShow, setRegModalShow] = useState<boolean>(false);

  // Show/hide the modal
  const toggleRegModal = () => {
    setRegModalShow(!regModalShow);
  };

  const pageSize = 10,
    initPage = 1;

  //pageSize는 고정이므로 매번 넣기보다는 Currying...
  const pageSizedPaginateData = paginateData.bind(null, pageSize);

  const [originData, setOriginData] = useState<UserTableData[]>([]);

  useLayoutEffect(() => {
    accountStore
      .findAll()
      .then((result) => {
        console.log("result", result);

        if (result.data) {
          const users = getUserTableData(result.data);
          setOriginData(users);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const initSearchParam: SearchParam = {
    field: "userName",
    query: "",
  };

  //검색 버튼 눌렀을때 적용되는 유효한 검색어
  const [searchParam, setSearchParam] = useState(initSearchParam);

  const searchedData = useMemo(
    () => searchData(originData, searchParam),
    [originData, searchParam]
  );

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
  } = usePagination(searchedData, initPage, pageSize);

  const pagedData = pageSizedPaginateData(searchedData, page);

  //Column의 key는 data의 정보를 가져 오기위해서는 data 객체의 key와 동일해야함.

  const columns: Column[] = useMemo(
    () => [
      // {
      //   key: "ckbox",
      //   value: <CheckBox />,
      // },
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

  const handleGoLastPageClick = useCallback(() => {
    setPage(lastPage);
  }, [lastPage]);

  const handlePageNextClick = useCallback(() => {
    if (!hasNext) return;
    setPage((prevState) => prevState + 1);
  }, [hasNext]);

  const handleSearchBtnClick = useCallback(
    (selectVal: string, inputVal: string) => {
      setSearchParam({
        field: selectVal,
        query: inputVal,
      });
    },
    []
  );

  const [selectedData, setSelectedData] = useState(new Set<string>());

  const handleDeleteBtnClick = useCallback(
    function () {
      const isConfirmed = window.confirm(CONFIRM.DELETE);
      if (isConfirmed) {
        //accountStore.deleteAccounts()
        console.log(selectedData);
      }
    },
    [selectedData]
  );

  return (
    <>
      <div className="card-box">
        <div className="card-box-body">
          <div className="table-control-top">
            <div className="table-search-wrap">
              <TableSearch
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
            {originData.length === 0 ? (
              <div>Loading...</div>
            ) : (
              <Table<UserTableData>
                columns={columns}
                data={pagedData}
                isSelectable={true}
                dataIdKey="sysuserId"
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />
            )}
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

            <PageItemList pageList={pageList} page={page} setPage={setPage} />
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
