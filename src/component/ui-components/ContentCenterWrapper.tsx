import React from "react";

interface ContentCenterWrapperProps {
  children: React.ReactNode;
}

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
