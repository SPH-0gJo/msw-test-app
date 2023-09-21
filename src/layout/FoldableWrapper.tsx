import { useFullWidthMediaQuery } from "@/shared/layout";
import classNames from "classnames";
import React from "react";

export interface FoldableWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  classNm: string;
  children?: React.ReactNode;
}

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
