import { ERROR, VALIDATION_ERROR } from "@/shared/var/msg";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldErrorBox from "@/component/ui-components/FieldErrorBox";
import { useStores } from "@/modules/Store";
import { observer } from "mobx-react";

export interface UserFormInputs {
  userName: string;
  userId: string;
  password: string;
  confirmpassword: string;
  groupId?: string;
  adminType: boolean | string;
}

export interface FormInputConfig {
  value?: string | number;
  disabled?: boolean;
  label?: string;
}

export type UserFormInputsConfig = {
  [k in keyof UserFormInputs]?: FormInputConfig;
};

export interface UserFormProps {
  userFormInputsConfig: UserFormInputsConfig;
  onFormValid: SubmitHandler<UserFormInputs>;
  onFormInvalid: SubmitErrorHandler<UserFormInputs>;
}

const UserForm = function ({
  userFormInputsConfig,
  onFormValid,
  onFormInvalid,
}: UserFormProps) {
  const { accountStore } = useStores();

  useLayoutEffect(() => {
    if (accountStore.groups === null) {
      accountStore
        .findAllGroups()
        .then((result) => {
          if (result.data) {
            accountStore.setGroups(result.data);
            return;
          }
          throw new Error(ERROR.STATUS_OK_BUT_FAIL);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    }
  }, []);

  const groupIdDefaultValue = userFormInputsConfig.groupId?.value || "";

  const {
    register,
    trigger,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<UserFormInputs>({
    mode: "onSubmit",
  });

  const validateSetError = useCallback(
    (inputName: keyof UserFormInputs, errorMessage: string) => {
      trigger(inputName).then((result) => {
        if (result) return;
        setError(inputName, {
          type: "custom",
          message: errorMessage,
        });
      });
    },
    []
  );

  const handleFormSubmit = handleSubmit(onFormValid, onFormInvalid);

  const groups = accountStore.groups;

  return (
    <div className="form-wrap">
      <form onSubmit={handleFormSubmit}>
        {/* 그룹 */}
        <div className="mb-2">
          <label className="form-label">그룹</label>
          <select
            {...register("groupId")}
            aria-label="Default select example"
            className="form-select"
          >
            {groups === null ? (
              <option>Loading...</option>
            ) : (
              [
                { groupId: "", groupName: "선택 없음 (게스트로 등록)" },
                ...groups,
              ].map(({ groupId, groupName }) => (
                <option
                  selected={groupIdDefaultValue === groupId}
                  key={groupId}
                  value={groupId}
                >
                  {groupName}
                </option>
              ))
            )}
          </select>
        </div>
        {/* 이름 */}
        <div className="mb-2">
          <label className="form-label">이름</label>
          <input
            placeholder="이름을 입력해주세요."
            type="text"
            className="form-control"
            defaultValue={userFormInputsConfig.userName?.value || ""}
            {...register("userName", {
              required: true,
              minLength: 2,
              maxLength: 20,
              pattern: /^[a-zA-Z가-힣]*$/,
              onBlur: () => {
                validateSetError("userName", VALIDATION_ERROR.USER_NAME);
              },
            })}
          />
        </div>
        {errors.userName?.message && (
          <FieldErrorBox message={errors.userName?.message} />
        )}
        {/* 아이디 */}
        <div className="mb-2">
          <label className="form-label">아이디</label>
          <input
            placeholder="아이디를 입력해주세요."
            type="text"
            defaultValue={userFormInputsConfig.userId?.value || ""}
            disabled={userFormInputsConfig.userId?.disabled || false}
            className="form-control"
          />
        </div>
        {/* 비밀번호 */}
        <div className="mb-2">
          <label className="form-label">
            {userFormInputsConfig.password?.label || "비밀번호"}
          </label>
          <input
            placeholder="비밀번호를 입력해주세요."
            type="password"
            className="form-control"
            {...register("password", {
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,25}$/,
              onBlur: () => {
                validateSetError("password", VALIDATION_ERROR.PASSWORD);
              },
            })}
          />
        </div>
        {errors.password?.message && (
          <FieldErrorBox message={errors.password?.message} />
        )}
        {/* 비밀번호 확인 */}
        <div className="mb-2">
          <label className="form-label">
            {userFormInputsConfig.confirmpassword?.label || "비밀번호 확인"}
          </label>
          <input
            placeholder="비밀번호를 확인해주세요."
            type="password"
            className="form-control"
            {...register("confirmpassword", {
              required: true,
              onBlur: () => {
                validateSetError("confirmpassword", ERROR.PW_NOT_EQ);
              },
              validate: (value: string) => {
                return value === getValues("password");
              },
            })}
          />
        </div>
        {errors.confirmpassword?.message && (
          <FieldErrorBox message={errors.confirmpassword?.message} />
        )}
        {/* 관리자 여부  */}
        <div className="mb-2">
          <label className="form-label">관리자</label>
          <select
            {...register("adminType")}
            aria-label="Default select example"
            className="form-select"
            defaultValue={userFormInputsConfig.adminType?.value || 1}
          >
            <option value={1}>관리자</option>
            <option value={0}>사용자</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default observer(UserForm);
