import React from "react";
import PageItem, { PageItemProps } from "@/component/ui-components/PageItem";

/**
 * 다음 페이지 목록 이동 버튼 컴포넌트
 * @param param0
 * @returns
 */
const PageNext = function ({ disabled, onClick }: PageItemProps) {
  return (
    <PageItem
      onClick={onClick}
      classList={["paginate_button", "next"]}
      disabled={disabled}
    >
      <i className="mdi mdi-chevron-right" />
    </PageItem>
  );
};

export default React.memo(PageNext);
