import React from "react";
import PageItem from "./PageItem";

const PageNext = function () {
  return (
    <PageItem classList={["paginate_button", "next"]}>
      <a className="page-link" href="#">
        <i className="mdi mdi-chevron-right" />
      </a>
    </PageItem>
  );
};

export default PageNext;
