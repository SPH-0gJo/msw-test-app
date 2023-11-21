import React from "react";

interface PaginationProps {
  children?: React.ReactNode;
}

/**
 * 페이지네이션 영역 Wrapper 컴포넌트
 * @param param0
 * @returns
 */
const Pagination = function ({ children }: PaginationProps) {
  return (
    <div className="pagination-wrap">
      <ul className="pagination pagination-rounded">{children}</ul>
    </div>
  );
};

export default React.memo(Pagination);
