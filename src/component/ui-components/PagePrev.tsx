import React from "react";
import PageItem, { PageItemProps } from "@/component/ui-components/PageItem";

/**
 * 이전 페이지 목록 이동 버튼 컴포넌트
 * @param param0
 * @returns
 */
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
