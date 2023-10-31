import React from "react";
import { Spinner } from "react-bootstrap";
import ContentCenterWrapper from "./ContentCenterWrapper";

const Loading = () => {
  return (
    <ContentCenterWrapper>
      <Spinner animation="border" />
    </ContentCenterWrapper>
  );
};

export default Loading;
