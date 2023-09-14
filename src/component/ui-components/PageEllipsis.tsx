import React from "react";
import PageItem from "./PageItem";

const PageEllipsis = function () {
  return (
    <PageItem disabled={true}>
      <a className="page-link" href="#">
        ...
      </a>
    </PageItem>
  );
};

export default PageEllipsis;
