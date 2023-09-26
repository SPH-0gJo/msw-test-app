import { ERROR, VALIDATION_ERROR } from "@/shared/var/msg";
import React from "react";
import { useForm } from "react-hook-form";

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
}

const UserForm = function ({ userFormInputsConfig }: UserFormProps) {
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

  return (
    <div className="form-wrap">
      <form>
        {/* 그룹 */}
        <div className="mb-2">
          <label className="form-label">그룹</label>
          <select
            {...register("groupId")}
            aria-label="Default select example"
            className="form-select"
            defaultValue={userFormInputsConfig.groupId?.value || ""}
          >
            <option value="">선택 없음 (게스트로 등록)</option>
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
                //trigger("userName");
                //setError에 trigger 기능 포함 되어있는것으로 보임..
                setError("userName", {
                  type: "custom",
                  message: VALIDATION_ERROR.USER_NAME,
                });
              },
            })}
          />
        </div>
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
                setError("password", {
                  type: "custom",
                  message: VALIDATION_ERROR.PASSWORD,
                });
              },
            })}
          />
        </div>
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
                setError("confirmpassword", {
                  type: "custom",
                  message: ERROR.PW_NOT_EQ,
                });
              },
              validate: (value: string) => {
                return value === getValues("password");
              },
            })}
          />
        </div>
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

export default UserForm;
