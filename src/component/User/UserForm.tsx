import { ERROR, VALIDATION_ERROR } from "@/shared/var/msg";
import React, {
  useCallback,
  useLayoutEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldErrorBox from "@/component/ui-components/FieldErrorBox";
import { useStores } from "@/modules/Store";
import { observer } from "mobx-react";

export interface UserFormInputs {
  userName: string;
  userId: string;
  password?: string;
  confirmpassword?: string;
  groupId: string;
  adminType: "1" | "0";
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
  formId: string;
  userFormInputsConfig: UserFormInputsConfig;
  onFormValid: SubmitHandler<UserFormInputs>;
  onFormInvalid: SubmitErrorHandler<UserFormInputs>;
}

export interface ExternalUserForm {
  formReset: () => void;
}

const UserForm = forwardRef<ExternalUserForm, UserFormProps>(function (
  { userFormInputsConfig, formId, onFormInvalid, onFormValid },
  ref
) {
  const groupIdDefaultValue = userFormInputsConfig.groupId?.value || "";
  const isGroupDisabled = userFormInputsConfig.groupId?.disabled || false;
  const isAdminTypeDisabled = userFormInputsConfig.adminType?.disabled || false;
  const adminTypeDefaultValue =
    userFormInputsConfig.adminType?.value === 0 ? 0 : 1;
  const {
    accountStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  useLayoutEffect(() => {
    if (!isGroupDisabled && accountStore.groups === null) {
      accountStore
        .findAllGroups()
        .then((result) => {
          if (result.data) {
            accountStore.setGroups(result.data);
            return;
          }
          throw new Error(ERROR.STATUS_OK_BUT_FAIL);
        })
        .then(() => {
          reset((values) => ({
            ...values,
            groupId: groupIdDefaultValue as string,
          }));
        })
        .catch((error) => {
          console.error(error);
          customAlert(error, "FAIL");
        });
    }
  }, []);

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

  useImperativeHandle(ref, () => ({
    formReset: () => {
      reset();
    },
  }));

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
      <form id={formId} onSubmit={handleFormSubmit}>
        {/* 그룹 */}
        <div className="mb-2">
          <label className="form-label">그룹</label>
          <select
            {...register("groupId")}
            aria-label="Default select example"
            className="form-select"
            disabled={isGroupDisabled}
          >
            {isGroupDisabled && <option>{groupIdDefaultValue}</option>}
            {!isGroupDisabled && groups === null && (
              <option>Loading...</option>
            )}{" "}
            {!isGroupDisabled &&
              groups &&
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
              ))}
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
              required: { value: true, message: VALIDATION_ERROR.USER_NAME },
              minLength: { value: 2, message: VALIDATION_ERROR.USER_NAME },
              maxLength: { value: 20, message: VALIDATION_ERROR.USER_NAME },
              pattern: {
                value: /^[a-zA-Z가-힣]*$/,
                message: VALIDATION_ERROR.USER_NAME,
              },
              onBlur: () => {
                //validateSetError("userName", VALIDATION_ERROR.USER_NAME);
                trigger("userName");
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
              required: {
                value: false,
                message: VALIDATION_ERROR.PASSWORD,
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,25}$/,
                message: VALIDATION_ERROR.PASSWORD,
              },
              onBlur: () => {
                //validateSetError("password", VALIDATION_ERROR.PASSWORD);
                trigger("password");
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
              required: { value: false, message: ERROR.PW_NOT_EQ },
              onBlur: () => {
                //validateSetError("confirmpassword", ERROR.PW_NOT_EQ);
                trigger("confirmpassword");
              },
              validate: (value?: string) => {
                return value === getValues("password") || ERROR.PW_NOT_EQ;
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
            defaultValue={adminTypeDefaultValue}
            disabled={isAdminTypeDisabled}
          >
            <option value={1}>관리자</option>
            <option value={0}>사용자</option>
          </select>
        </div>
      </form>
    </div>
  );
});

export default observer(UserForm);
