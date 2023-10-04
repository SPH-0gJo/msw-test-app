import { ERROR, VALIDATION_ERROR } from "@/shared/var/msg";
import React, { useCallback } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldErrorBox from "../ui-components/FieldErrorBox";
import { useStores } from "@/modules/Store";
import { ErrorData } from "@/shared/request";
import { AxiosError } from "axios";

export interface GroupFormInputs {
  groupName: string;
}

export interface GroupFormProps {
  formId: string;
  onFormValid: SubmitHandler<GroupFormInputs>;
  onFormInvalid: SubmitErrorHandler<GroupFormInputs>;
}

const GroupForm = function ({
  formId,
  onFormValid,
  onFormInvalid,
}: GroupFormProps) {
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<GroupFormInputs>({
    mode: "onSubmit",
  });

  const groupNameErrorMsg = errors.groupName?.message;

  const handleFormSubmit = handleSubmit(onFormValid, onFormInvalid);

  const { groupStore } = useStores();

  const isGroupNameExist = useCallback(async (groupName: string) => {
    try {
      const result = await groupStore.isExist(groupName);
      return !result.data || ERROR.EXIST_GROUP_NAME;
    } catch (error: AxiosError<ErrorData, any> | any) {
      console.error(error);
      alert(ERROR.NOT_PROCESSED);
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
