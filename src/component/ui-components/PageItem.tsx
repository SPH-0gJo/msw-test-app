import classNames from "classnames";
import React from "react";

type PageItemProps = {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  classList?: string[];
};

//일종의 wrapper 역할
const PageItem = function ({
  children,
  active = false,
  disabled = false,
  classList = [],
}: PageItemProps) {
  return (
    <li className={classNames("page-item", { active, disabled }, ...classList)}>
      <a className="page-link" href="#">
        {children}
      </a>
    </li>
  );
};

export default PageItem;
