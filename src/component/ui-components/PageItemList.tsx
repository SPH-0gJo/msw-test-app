import React from "react";
import PageItem from "./PageItem";

interface PageItemListProps {
  pageList: number[];
  page: number;
  onClick?: (pg: number) => () => void;
  setPage: any;
}

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
