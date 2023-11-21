import React from "react";

interface FieldErrorBoxProps {
  message: string;
}

/**
 * input 값이 유효하지 않을 경우 하위에 표시될 에러 메시지 영역 컴포넌트
 * @param param0
 * @returns
 */
const FieldErrorBox = function ({ message }: FieldErrorBoxProps) {
  return (
    <p className="validation-text">
      <i className="mdi mdi-alert-outline text-danger" /> {message}
    </p>
  );
};

export default FieldErrorBox;
