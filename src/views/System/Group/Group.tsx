import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import GroupRegisterModal from "@/component/Group/GroupRegisterModal";
import TableSearch from "@/component/TableSearch";
import Button from "@/component/ui-components/Button";
import CustomPagination from "@/component/ui-components/CustomPagination";
import Table from "@/component/ui-components/Table";
import { useStores } from "@/modules/Store";
import { useModal } from "@/shared/hooks/modal";
import { paginateData, searchData } from "@/shared/util/table";
import {
  GroupTableData,
  getGroupTableData,
  groupColumns,
  groupInitSearchParam,
  groupSearchOptionList,
  Group as TGroup,
} from "@/shared/var/group";
import { CONFIRM, ERROR, SUCCESS } from "@/shared/var/msg";
import GroupModifyModal from "@/component/Group/GroupModifyModal";
import { customConfirm } from "@/confirm-lib/util";

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
  const [modifyGroup, setModifyGroup] = useState<TGroup | null>(null);

  //@@@@@@@ 컴포넌트 로직 @@@@@@@

  const { groupStore, commonStore } = useStores();

  const handleGroupModBtnClick = (group: TGroup) => {
    setModifyGroup(group);
    toggleModModal();
  };

  const customAlert = commonStore.setToastMessage;

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
        //alert(ERROR.NOT_PROCESSED);
        customAlert(ERROR.NOT_PROCESSED, "FAIL");
        console.error(error);
      });
  }, []);

  useLayoutEffect(() => {
    loadTableData();
  }, []);

  //@@@@@@ 콜백함수 선언 @@@@@@
  const handleSearchBtnClick = useCallback(function (
    selectVal: keyof GroupTableData,
    inputVal: string
  ) {
    setPage(firstPage);
    setSearchParam({
      field: selectVal,
      query: inputVal,
    });
  }, []);

  const handleDeleteBtnClick = useCallback(async () => {
    //const isConfirmed = window.confirm(CONFIRM.DELETE);
    const isConfirmed = await customConfirm(CONFIRM.DELETE);
    if (isConfirmed) {
      const selectedDataArr = Array.from(selectedData);
      groupStore
        .deleteGroups(selectedDataArr)
        .then((result) => {
          if (result.data) {
            //alert(SUCCESS.PROCCESSED);
            customAlert(SUCCESS.PROCCESSED);
            setPage(firstPage);
            loadTableData();
          } else {
            throw new Error(ERROR.STATUS_OK_BUT_FAIL);
          }
        })
        .catch((e) => {
          console.error(e);
          //alert(ERROR.NOT_PROCESSED);
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
              <TableSearch<GroupTableData>
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
          <CustomPagination
            count={count}
            pageSize={pageSize}
            pagingSize={pagingSize}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>

      {/* 등록 모달창 */}
      <GroupRegisterModal
        show={regModalShow}
        toggleShow={toggleRegModal}
        onSubmitSuccess={loadTableData}
      />

      {/* 수정 모달창 */}
      <GroupModifyModal
        show={modModalShow}
        toggleShow={toggleModModal}
        onSubmitSuccess={loadTableData}
        group={modifyGroup}
      />
    </>
  );
};

export default Group;
