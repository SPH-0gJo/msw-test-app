import React from "react";
import PageItem, { PageItemProps } from "./PageItem";

const PagePrev = function ({ disabled }: PageItemProps) {
  return (
    <PageItem classList={["paginate_button", "prev"]} disabled={disabled}>
      <a className="page-link" href="#">
        <i className="mdi mdi-chevron-left" />
      </a>
    </PageItem>
  );
};

export default PagePrev;
