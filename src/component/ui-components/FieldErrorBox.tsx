import React from "react";

type FieldErrorBoxProps = {
  message: string;
};

const FieldErrorBox = function ({ message }: FieldErrorBoxProps) {
  return (
    <p className="validation-text">
      <i className="mdi mdi-alert-outline text-danger" /> {message}
    </p>
  );
};

export default FieldErrorBox;
