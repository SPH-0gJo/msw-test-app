import React from "react";
import PageItem from "@/component/ui-components/PageItem";

/**
 * 맨 처음/마지막 페이지와 현재 페이지 목록 사이에서 ... 을 표시하는 페이지 컴포넌트
 * @returns
 */
const PageEllipsis = function () {
  return <PageItem disabled={true}>...</PageItem>;
};

export default React.memo(PageEllipsis);
