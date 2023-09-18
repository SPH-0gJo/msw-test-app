import React from "react";
import PageItem, { PageItemProps } from "./PageItem";

const PagePrev = function ({ disabled, onClick }: PageItemProps) {
  return (
    <PageItem
      onClick={onClick}
      classList={["paginate_button", "prev"]}
      disabled={disabled}
    >
      <a className="page-link" href="#">
        <i className="mdi mdi-chevron-left" />
      </a>
    </PageItem>
  );
};

export default React.memo(PagePrev);
