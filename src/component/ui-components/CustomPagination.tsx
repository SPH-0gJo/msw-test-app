import React, { useCallback, useMemo } from "react";
import PagePrev from "@/component/ui-components/PagePrev";
import PageItem from "@/component/ui-components/PageItem";
import PageEllipsis from "@/component/ui-components/PageEllipsis";
import PageItemList from "@/component/ui-components/PageItemList";
import PageNext from "@/component/ui-components/PageNext";
import Pagination from "@/component/ui-components/Pagination";

/**
 * count : 총 게시물 수
 * pageSize : 한 페이지에 노출할 게시글 수
 * pagingSize : 한 화면에 노출할 페이지 수
 * page : 현재 페이지
 * setPage : 현재 페이지 상태를 변경하는 state 변경 함수
 */
interface PaginationProps {
  count: number;
  pageSize: number;
  pagingSize: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * 페이지 목록, 다음/이전 이동 버튼, 맨처음/마지막 이동버튼을 포함한 페이지네이션 관련 컴포넌트
 * @param param0
 * @returns
 */
const CustomPagination = function ({
  count,
  pageSize,
  pagingSize,
  page,
  setPage,
}: PaginationProps) {
  // 모든 페이지의 마지막 페이지
  const lastPage = useMemo(() => {
    //count = 0 인 경우 lastPage가 음수로 계산됨
    const calLastPage = Math.floor((count - 1) / pageSize) + 1;
    return calLastPage > 0 ? calLastPage : 1;
  }, [count, pageSize]);

  // 모든 페이지의 첫번째 페이지
  const firstPage = useMemo(() => 1, []);

  // 현재 페이지 목록의 다음 페이지 목록이 있는지
  const hasNext = useMemo(() => page < lastPage, [page, lastPage]);

  // 현재 페이지 목록의 이전 페이지 목록이 있는지
  const hasPrev = useMemo(() => page > 1, [page]);

  // 현재 화면에 노출될 페이지 목록
  const pageList = useMemo(() => {
    const pages = [];
    const startPage = pagingSize * Math.floor((page - 1) / pagingSize) + 1;
    const endPage =
      startPage + (pagingSize - 1) > lastPage
        ? lastPage
        : startPage + (pagingSize - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [pagingSize, page, lastPage]);

  // 모든 페이지의 첫번째 페이지로 이동 가능한지 여부
  const hasGoFirst = useMemo(
    () => !pageList.includes(firstPage),
    [firstPage, pageList]
  );

  // 모든 페이지의 마지막 페이지로 이동 가능한지 여부
  const hasGoLast = useMemo(
    () => !pageList.includes(lastPage),
    [pageList, lastPage]
  );

  // 이전 페이지 목록 이동 버튼 클릭 이벤트 함수
  const handlePagePrevClick = useCallback(() => {
    if (!hasPrev) return;
    setPage((prevState) => prevState - 1);
  }, [hasPrev, setPage]);

  // 첫 번째 페이지 이동 버튼 클릭 이벤트 함수
  const handleGoFirstPageClick = useCallback(() => {
    setPage(firstPage);
  }, [firstPage, setPage]);

  // 마지막 페이지 이동 버튼 클릭 이벤트 함수
  const handleGoLastPageClick = useCallback(() => {
    setPage(lastPage);
  }, [lastPage, setPage]);

  // 다음 페이지 목록 이동 버튼 클릭 이벤트 함수
  const handlePageNextClick = useCallback(() => {
    if (!hasNext) return;
    setPage((prevState) => prevState + 1);
  }, [hasNext, setPage]);

  return (
    <Pagination>
      <PagePrev onClick={handlePagePrevClick} disabled={!hasPrev} />

      {hasGoFirst && (
        <>
          <PageItem onClick={handleGoFirstPageClick}>{firstPage}</PageItem>
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
  );
};

export default React.memo(CustomPagination);
