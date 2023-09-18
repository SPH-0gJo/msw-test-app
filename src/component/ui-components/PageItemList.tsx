import React from "react";
import PageItem from "./PageItem";

interface PageItemListProps {
  pageList: number[];
  page: number;
  onClick: (pg: number) => () => void;
}

const PageItemList = function ({ pageList, page, onClick }: PageItemListProps) {
  return (
    <>
      {pageList.map((pg) => {
        return (
          <PageItem onClick={onClick(pg)} key={pg} active={pg === page}>
            {pg}
          </PageItem>
        );
      })}
    </>
  );
};

export default React.memo(PageItemList);
