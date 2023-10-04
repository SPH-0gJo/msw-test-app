import React, { useCallback, useMemo } from "react";
import PagePrev from "@/component/ui-components/PagePrev";
import PageItem from "@/component/ui-components/PageItem";
import PageEllipsis from "@/component/ui-components/PageEllipsis";
import PageItemList from "@/component/ui-components/PageItemList";
import PageNext from "@/component/ui-components/PageNext";
import Pagination from "@/component/ui-components/Pagination";

interface PaginationProps {
  count: number;
  pageSize: number;
  pagingSize: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CustomPagination = function ({
  count,
  pageSize,
  pagingSize,
  page,
  setPage,
}: PaginationProps) {
  const lastPage = useMemo(() => {
    //data.length = 0 인 경우 lastPage가 음수로 계산됨
    const calLastPage = Math.floor((count - 1) / pageSize) + 1;
    return calLastPage > 0 ? calLastPage : 1;
  }, [count]);

  const firstPage = useMemo(() => 1, []);

  const hasNext = useMemo(() => page < lastPage, [page, lastPage]);

  const hasPrev = useMemo(() => page > 1, [page]);

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
  }, [page, lastPage]);

  const hasGoFirst = useMemo(() => !pageList.includes(firstPage), [pageList]);

  const hasGoLast = useMemo(
    () => !pageList.includes(lastPage),
    [pageList, lastPage]
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
