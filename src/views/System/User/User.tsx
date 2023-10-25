import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import UserRegisterModal from "@/component/User/UserRegisterModal";
import Table from "@/component/ui-components/Table";
import CheckBox from "@/component/ui-components/CheckBox";
import { UserTableData, getUserTableData, users } from "@/shared/var/user";
import Pagination from "@/component/ui-components/Pagination";
import PageNext from "@/component/ui-components/PageNext";
import PagePrev from "@/component/ui-components/PagePrev";
import PageEllipsis from "@/component/ui-components/PageEllipsis";
import { usePagination } from "@/shared/hooks/pagination";
import PageItem from "@/component/ui-components/PageItem";
import PageItemList from "@/component/ui-components/PageItemList";
import { Column, SearchParam } from "@/shared/type/table";
import { Option } from "@/shared/type/select";
import TableSearch from "@/component/TableSearch";
import { paginateData, searchData } from "@/shared/util/table";
import Button from "@/component/ui-components/Button";
import { useStores } from "@/modules/Store";
import { CONFIRM, ERROR, SUCCESS } from "@/shared/var/msg";
import { useModal } from "@/shared/hooks/modal";
import UserModifyModal from "@/component/User/UserModifyModal";
import { User as TUser } from "@/shared/var/user";
import { customConfirm } from "@/confirm-lib/util";

const User = function () {
  const {
    accountStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  //등록 모달
  const { modalShow: regModalShow, toggleModal: toggleRegModal } = useModal();

  //수정 모달
  const { modalShow: modModalShow, toggleModal: toggleModModal } = useModal();

  const pageSize = 10,
    initPage = 1;

  //pageSize는 고정이므로 매번 넣기보다는 Currying...
  const pageSizedPaginateData = paginateData.bind(null, pageSize);

  const [originData, setOriginData] = useState<UserTableData[]>([]);

  //수정 대상 사용자
  const [modifyUser, setModifyUser] = useState<TUser | null>(null);

  const handleUserModBtnClick = function (user: TUser) {
    setModifyUser(user);
    toggleModModal();
  };

  const loadTableData = useCallback(function () {
    accountStore
      .findAll()
      .then((result) => {
        console.log("result", result);

        if (result.data) {
          const users = getUserTableData(result.data, handleUserModBtnClick);
          setOriginData(users);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useLayoutEffect(() => {
    loadTableData();
  }, []);

  const initSearchParam: SearchParam<UserTableData> = {
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

  const columns: Column<UserTableData>[] = useMemo(
    () => [
      {
        key: "no",
        value: "NO",
        width: "5%",
      },
      {
        key: "groupName",
        value: "그룹명",
      },
      {
        key: "userId",
        value: "아이디",
        width: "10%",
      },
      {
        key: "userName",
        value: "이름",
        width: "20%",
      },
      {
        key: "registDate",
        value: "등록일",
        width: "20%",
      },
      {
        key: "mng",
        value: "관리",
        width: "10%",
      },
    ],
    []
  );

  const searchOptionList: Option<UserTableData>[] = useMemo(
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
    (selectVal: keyof UserTableData, inputVal: string) => {
      //검색한 결과에는 현재 페이지가 없을 수 있으므로 반드시 1페이지 출력
      setPage(firstPage);
      setSearchParam({
        field: selectVal,
        query: inputVal,
      });
    },
    []
  );

  const [selectedData, setSelectedData] = useState(new Set<string>());

  const handleDeleteBtnClick = useCallback(async () => {
    const isConfirmed = await customConfirm(CONFIRM.DELETE);
    if (isConfirmed) {
      const selectedDataArr = Array.from(selectedData);
      accountStore
        .deleteAccounts(selectedDataArr)
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
              <TableSearch<UserTableData>
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
      {/* 등록 모달창 */}
      <UserRegisterModal
        show={regModalShow}
        toggleShow={toggleRegModal}
        onSubmitSuccess={loadTableData}
      />

      {/* 수정 모달창  */}
      {/* todo : user -> data로 추상화 (메뉴관리, 그룹관리에서도 사용)  */}
      <UserModifyModal
        show={modModalShow}
        toggleShow={toggleModModal}
        onSubmitSuccess={loadTableData}
        user={modifyUser}
      />
    </>
  );
};

export default User;
