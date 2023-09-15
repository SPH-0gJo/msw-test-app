import React from "react";
import PageItem, { PageItemProps } from "./PageItem";

const PageNext = function ({ disabled, onClick }: PageItemProps) {
  return (
    <PageItem
      onClick={onClick}
      classList={["paginate_button", "next"]}
      disabled={disabled}
    >
      <a className="page-link" href="#">
        <i className="mdi mdi-chevron-right" />
      </a>
    </PageItem>
  );
};

export default PageNext;
