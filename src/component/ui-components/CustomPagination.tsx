import React, { useCallback, useMemo } from "react";
import PagePrev from "./PagePrev";
import PageItem from "./PageItem";
import PageEllipsis from "./PageEllipsis";
import PageItemList from "./PageItemList";
import PageNext from "./PageNext";

interface PaginationProps {
  data: any[];
  pageSize: number;
  pagingSize: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CustomPagination = function ({
  data,
  pageSize,
  pagingSize,
  page,
  setPage,
}: PaginationProps) {
  const lastPage = useMemo(() => {
    //data.length = 0 인 경우 lastPage가 음수로 계산됨
    const calLastPage = Math.floor((data.length - 1) / pageSize) + 1;
    return calLastPage > 0 ? calLastPage : 1;
  }, [data]);

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
    <div className="pagination-wrap">
      <ul className="pagination pagination-rounded">
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
      </ul>
    </div>
  );
};

export default React.memo(CustomPagination);
