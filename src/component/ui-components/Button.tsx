import React, { MouseEventHandler } from "react";
import { ButtonVariant } from "react-bootstrap/esm/types";

type ButtonSize = "xs" | "sm" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  classList?: string[];
  children?: React.ReactNode;
  onClick?: MouseEventHandler;
}

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
