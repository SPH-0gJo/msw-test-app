import { useFullWidthMediaQuery } from "@/shared/hooks/layout";
import classNames from "classnames";
import React from "react";

export interface FoldableWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  classNm: string;
  children?: React.ReactNode;
}
/**
 * 화면 너비에 따라 접히고 닫혀야하는 컴포넌트를 감싸는 Wrapper 컴포넌트
 * @param param0
 * @returns
 */
const FoldableWrapper = function ({
  classNm,
  children,
  ...otherProps
}: FoldableWrapperProps) {
  const isFullScreen = useFullWidthMediaQuery();

  return (
    <div
      className={classNames(classNm, {
        fold: !isFullScreen,
      })}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default FoldableWrapper;
