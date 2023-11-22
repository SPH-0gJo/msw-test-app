import { useMemo, useState } from "react";
/**
 * 페이지네이션에 필요한 변수, 함수를 반환하는 함수
 * @param data 표시할 데이터
 * @param initialPage 현재 page의 초기값
 * @param pageSize 한 페이지에 노출할 게시글 수
 * @param pagingSize 한 화면에 노출할 페이지 수
 * @returns
 */
export const usePagination = function (
  data: any[],
  initialPage: number = 1,
  pageSize: number = 10,
  pagingSize: number = 5
) {
  const [page, setPage] = useState(initialPage);

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

  return {
    page,
    setPage,
    lastPage,
    firstPage,
    hasNext,
    hasPrev,
    pageList,
    hasGoFirst,
    hasGoLast,
  };
};
