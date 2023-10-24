import { ERROR, VALIDATION_ERROR } from "@/shared/var/msg";
import React, { useCallback } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldErrorBox from "../ui-components/FieldErrorBox";
import { useStores } from "@/modules/Store";
import { ErrorData } from "@/shared/request";
import { AxiosError } from "axios";
import { FormInputConfig } from "../User/UserForm";

export interface GroupFormInputs {
  groupName: string;
}

export type GroupFormInputsConfig = {
  [k in keyof GroupFormInputs]?: FormInputConfig;
};

export interface GroupFormProps {
  formId: string;
  onFormValid: SubmitHandler<GroupFormInputs>;
  onFormInvalid: SubmitErrorHandler<GroupFormInputs>;
  groupFormInputsConfig?: GroupFormInputsConfig;
}

const GroupForm = function ({
  formId,
  onFormValid,
  onFormInvalid,
  groupFormInputsConfig,
}: GroupFormProps) {
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<GroupFormInputs>({
    mode: "onSubmit",
  });

  const groupNameErrorMsg = errors.groupName?.message;

  const groupNameDefaultValue = groupFormInputsConfig?.groupName?.value || "";

  const handleFormSubmit = handleSubmit(onFormValid, onFormInvalid);

  const { groupStore, commonStore } = useStores();

  const customAlert = commonStore.setToastMessage;

  const isGroupNameExist = useCallback(async (groupName: string) => {
    try {
      const result = await groupStore.isExist(groupName);
      return !result.data || ERROR.EXIST_GROUP_NAME;
    } catch (error: AxiosError<ErrorData, any> | any) {
      customAlert(ERROR.NOT_PROCESSED, "FAIL");
      console.error(error);
    }
  }, []);

  return (
    <div className="form-wrap" onSubmit={handleFormSubmit}>
      <form id={formId}>
        <div className="mb-2">
          <label className="form-label">그룹명</label>
          <input
            placeholder="이름을 입력해주세요."
            type="text"
            className="form-control"
            defaultValue={groupNameDefaultValue}
            {...register("groupName", {
              required: { value: true, message: VALIDATION_ERROR.GROUP_NAME },
              minLength: { value: 2, message: VALIDATION_ERROR.GROUP_NAME },
              maxLength: { value: 50, message: VALIDATION_ERROR.GROUP_NAME },
              pattern: {
                value: /^[a-zA-Z0-9가-힣]*$/,
                message: VALIDATION_ERROR.GROUP_NAME,
              },
              validate: isGroupNameExist,
              onBlur: () => {
                trigger("groupName");
              },
            })}
          />
        </div>
        {/* 에러메시지 영역 */}
        {groupNameErrorMsg && <FieldErrorBox message={groupNameErrorMsg} />}
      </form>
    </div>
  );
};

export default GroupForm;
