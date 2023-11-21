import React from "react";

interface ContentCenterWrapperProps {
  children: React.ReactNode;
}

/**
 * children 컴포넌트를 중앙 정렬 시키는 Wrapper 컴포넌트
 * @param param0
 * @returns
 */
const ContentCenterWrapper = ({ children }: ContentCenterWrapperProps) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export default ContentCenterWrapper;
