import React, { MouseEventHandler } from "react";
import { ButtonVariant } from "react-bootstrap/esm/types";

type ButtonSize = "xs" | "sm" | "lg";

/**
 * variant : 버튼 테마
 * size : 버튼 사이즈
 * classList : 버튼에 적용할 class name 리스트
 * children : 버튼의 자식 컴포넌트
 * onClick : 버튼 클릭 이벤트 함수
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  classList?: string[];
  children?: React.ReactNode;
  onClick?: MouseEventHandler;
}

/**
 * 커스텀 버튼 컴포넌트
 * @param param0
 * @returns
 */
const Button = function ({
  variant,
  size,
  classList,
  children,
  ...otherProps
}: ButtonProps) {
  const btnClass = "btn";
  const classes = [btnClass];
  if (variant) classes.push(`${btnClass}-${variant}`);
  if (size) classes.push(`${btnClass}-${size}`);
  if (classList) classes.push(...classList);

  return (
    <button {...otherProps} className={classes.join(" ")}>
      {children}
    </button>
  );
};

export default Button;
