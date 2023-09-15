import React from "react";

type PaginationProps = {
  children?: React.ReactNode;
};

const Pagination = function ({ children }: PaginationProps) {
  return (
    <div className="pagination-wrap">
      <ul className="pagination pagination-rounded">{children}</ul>
    </div>
  );
};

export default Pagination;
