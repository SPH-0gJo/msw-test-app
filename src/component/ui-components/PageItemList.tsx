import React from "react";
import PageItem from "@/component/ui-components/PageItem";

/**
 * pageList : 표시할 페이지 목록
 * page : 현재 페이지
 * onClick : 페이지 클릭 이벤트 함수
 * setPage : setPage : 현재 페이지 상태를 변경하는 state 변경 함수
 */
interface PageItemListProps {
  pageList: number[];
  page: number;
  onClick?: (pg: number) => () => void;
  setPage: any;
}
/**
 * 페이지 목록 출력하는 컴포넌트
 * @param param0
 * @returns
 */
const PageItemList = function ({ pageList, page, setPage }: PageItemListProps) {
  return (
    <>
      {pageList.map((pg) => {
        return (
          <PageItem
            onClick={() => {
              setPage(pg);
            }}
            key={pg}
            active={pg === page}
          >
            {pg}
          </PageItem>
        );
      })}
    </>
  );
};

export default React.memo(PageItemList);
