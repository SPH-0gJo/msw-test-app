import React from "react";
import PageNext from "./PageNext";
import PagePrev from "./PagePrev";
import PageEllipsis from "./PageEllipsis";
import { usePagination } from "@/shared/pagination";
import PageItem from "./PageItem";

type PaginationProps = {
  data: any[];
};

const Pagination = function ({ data }: PaginationProps) {
  const testData = new Array(100);
  const {
    pageList,
    page,
    hasPrev,
    hasNext,
    lastPage,
    hasGoLast,
    hasGoFirst,
    firstPage,
  } = usePagination(testData, 99);

  return (
    <div className="pagination-wrap">
      <ul className="pagination pagination-rounded">
        <PagePrev disabled={!hasPrev} />

        {hasGoFirst && (
          <>
            <PageItem>{firstPage}</PageItem>
            <PageEllipsis />
          </>
        )}

        {pageList.map((pg) => (
          <PageItem active={pg === page}>{pg}</PageItem>
        ))}

        {hasGoLast && (
          <>
            <PageEllipsis />
            <PageItem>{lastPage}</PageItem>
          </>
        )}

        <PageNext disabled={!hasNext} />
      </ul>
    </div>
  );
};

export default Pagination;
