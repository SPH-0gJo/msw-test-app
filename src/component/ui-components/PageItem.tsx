import classNames from "classnames";
import React from "react";

/**
 * children : 자식 컴포넌트
 * active : 페이지 아이템의 active 여부
 * disabled : 페이지 아이템의 disabled 여부
 * classList : 페이지 아이템에 적용할 class명 목록
 * onClick : 페이지 아이템 클릭 이벤트 함수
 */
export interface PageItemProps {
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  classList?: string[];
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
}

/**
 * 페이지네이션 항목 컴포넌트
 * @param param0
 * @returns
 */
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

export default React.memo(PageItem);
