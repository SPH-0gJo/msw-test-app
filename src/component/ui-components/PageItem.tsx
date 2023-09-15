import classNames from "classnames";
import React from "react";

export type PageItemProps = {
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  classList?: string[];
  onClick?: () => void;
};

//일종의 wrapper 역할이자 페이지 아이템 역할
const PageItem = function ({
  children,
  active = false,
  disabled = false,
  classList = [],
  onClick,
}: PageItemProps) {
  return (
    <li
      onClick={onClick}
      className={classNames("page-item", { active, disabled }, ...classList)}
    >
      <a className="page-link" href="#">
        {children}
      </a>
    </li>
  );
};

export default PageItem;
