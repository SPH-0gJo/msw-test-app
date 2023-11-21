import React from "react";
import { Spinner } from "react-bootstrap";
import ContentCenterWrapper from "@/component/ui-components/ContentCenterWrapper";

/**
 * 로딩바 컴포넌트
 * @returns
 */
const Loading = () => {
  return (
    <ContentCenterWrapper>
      <Spinner animation="border" />
    </ContentCenterWrapper>
  );
};

export default Loading;
