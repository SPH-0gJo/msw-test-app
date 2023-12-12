import React from "react";
import { render, screen } from "@testing-library/react";
import UserForm, { UserFormInputs, UserFormInputsConfig } from "./UserForm";
import { FieldErrors } from "react-hook-form";
import userEvent from "@testing-library/user-event";

test("사용자 이름 유효성 검사 문구 출력", async () => {
  render(
    <UserForm
      formId={""}
      userFormInputsConfig={{} as UserFormInputsConfig}
      onFormValid={function (
        data: UserFormInputs,
        event?: React.BaseSyntheticEvent<object, any, any> | undefined
      ): unknown {
        throw new Error("Function not implemented.");
      }}
      onFormInvalid={function (
        errors: FieldErrors<UserFormInputs>,
        event?: React.BaseSyntheticEvent<object, any, any> | undefined
      ): unknown {
        throw new Error("Function not implemented.");
      }}
    />
  );

  userEvent.type(await screen.findByLabelText<HTMLInputElement>("이름"), "복");

  userEvent.click(await screen.findByLabelText<HTMLInputElement>("아이디"));

  expect(
    await screen.findByText(/한글 또는 영문 2자 이상 20자 이내/)
  ).toBeInTheDocument();
});
