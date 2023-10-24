import { Group } from "@/modules/Group/GroupRepository";
import { ErrorData } from "@/shared/request";
import { AxiosError } from "axios";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ERROR, SUCCESS } from "@/shared/var/msg";
import FieldErrorBox from "../ui-components/FieldErrorBox";
import { AccountAddReqData } from "@/modules/Account/AccountRepository";
import { useStores } from "@/modules/Store";
import { FormModalProps } from "@/shared/type/modal";

interface UserRegisterModalProps extends FormModalProps {}

export type UserRegisterFormInputs = {
  userName: string;
  userId: string;
  password: string;
  confirmpassword: string;
  groupId?: string;
  adminType: boolean | string;
};

const UserRegisterModal = function ({
  show,
  toggleShow,
  onSubmitSuccess,
}: UserRegisterModalProps) {
  const {
    groupStore,
    accountStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  const [groups, setGroups] = useState<Group[]>([]);

  const [userIdResult, setUserIdResult] = useState(false);

  const {
    register,
    trigger,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<UserRegisterFormInputs>({
    mode: "onSubmit",
  });

  const isUserIdExist = useCallback(async (userId: string) => {
    try {
      const result = await accountStore.isExist(userId);

      //result.data : true => true
      //result.data : false => "에러 메시지"
      return !result.data || "이미 사용중인 아이디입니다.";
    } catch (error: AxiosError<ErrorData, any> | any) {
      console.error(error);
      customAlert(ERROR.NOT_PROCESSED);
    }
  }, []);

  //모든 필드 validation 후 문제 없을 때 호출
  const formValidSuccessCallback: SubmitHandler<UserRegisterFormInputs> =
    async function (data) {
      console.log("usergisterformsubmitdata", data);

      const addFormData: AccountAddReqData = {
        userId: data.userId,
        userName: data.userName,
        password: data.password,
        adminType: Boolean(parseInt(data.adminType as string)),
        //groupId: data.groupId,
      };

      if (data.groupId !== "") {
        addFormData.groupId = data.groupId;
      }

      try {
        await accountStore.addAccount(addFormData);
        customAlert(SUCCESS.PROCCESSED);
        //팝업 창 리셋 후 닫기
        formHideHandler();
        //데이터 불러오기
        onSubmitSuccess();
      } catch (error) {
        console.error(error);
        customAlert(ERROR.NOT_PROCESSED);
      }
    };

  //필드 중 유효하지 않은 값이 있을 때 호출
  const formValidFailCallback: SubmitErrorHandler<UserRegisterFormInputs> =
    function () {};

  //useCallback 사용불가
  const formHideHandler = () => {
    //팝업 창 닫기
    toggleShow();
    //팝업 창내 form 리셋
    reset();
    //아이디 유효 메시지 삭제
    setUserIdResult(false);
  };

  useLayoutEffect(() => {
    console.log("Group useLayoutEffect");
    groupStore
      .findAll()
      .then((result) => {
        if (result.data) {
          setGroups(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const formSubmitHandler = handleSubmit(
    formValidSuccessCallback,
    formValidFailCallback
  );

  return (
    <Modal show={show} onHide={formHideHandler} className="custom-modal">
      <Modal.Header onHide={formHideHandler} closeButton>
        <h4 className="modal-title">등록</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="form-wrap">
          <form onSubmit={formSubmitHandler}>
            <div className="mb-2">
              <label className="form-label">그룹</label>
              <select
                {...register("groupId")}
                aria-label="Default select example"
                className="form-select"
              >
                <option value="">선택 없음 (게스트로 등록)</option>
                {groups.map(({ groupId, groupName }) => (
                  <option value={groupId}>{groupName}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">이름</label>
              <input
                placeholder="이름을 입력해주세요."
                type="text"
                id="userName"
                className="form-control"
                {...register("userName", {
                  required: {
                    value: true,
                    message: "필수 입력 값입니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "최대 20자를 넘을 수 없습니다.",
                  },
                  onBlur: () => {
                    trigger("userName");
                  },
                })}
              />
            </div>
            {errors.userName && (
              <p className="validation-text">
                <i className="mdi mdi-alert-outline text-danger" />{" "}
                {errors.userName.message}
              </p>
            )}
            {/* 영문 또는 숫자 최대 25자 */}
            <div className="mb-2">
              <label className="form-label">아이디</label>
              <input
                placeholder="아이디를 입력해주세요."
                type="text"
                id="userId"
                className="form-control"
                {...register("userId", {
                  required: {
                    value: true,
                    message: "필수 입력 값입니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "최대 25자를 넘을 수 없습니다.",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]*$/,
                    message: "영문 또는 숫자만 입력 가능합니다.",
                  },
                  validate: isUserIdExist,
                  onBlur: () => {
                    trigger("userId").then((isValid) => {
                      setUserIdResult(isValid);
                    });
                  },
                  onChange: () => {
                    setUserIdResult(false);
                  },
                })}
              />
            </div>
            {errors.userId && (
              <p className="validation-text">
                <i className="mdi mdi-alert-outline text-danger" />{" "}
                {errors.userId.message}
              </p>
            )}
            {userIdResult && (
              <p className="validation-text">
                <i className="mdi mdi-alert-outline text-info" />{" "}
                {"사용가능한 아이디입니다."}
              </p>
            )}
            <div className="mb-2">
              <label className="form-label">비밀번호</label>
              <input
                placeholder="비밀번호를 입력해주세요."
                type="password"
                id="password"
                className="form-control"
                {...register("password", {
                  required: {
                    value: true,
                    message: ERROR.REQUIRED,
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{8,25}$/,
                    message:
                      "영문, 숫자, 특수문자 포함 8자 이상 25자 이하의 문자열만 허용됩니다.",
                  },
                  // //focus-out 할 때마다 검증
                  onBlur: () => {
                    trigger("password");
                  },
                })}
              />
            </div>
            {errors.password && (
              <FieldErrorBox message={errors.password.message!} />
            )}
            <div className="mb-2">
              <label className="form-label">비밀번호 확인</label>
              <input
                placeholder="비밀번호를 확인해주세요."
                type="password"
                className="form-control"
                {...register("confirmpassword", {
                  required: {
                    value: true,
                    message: ERROR.REQUIRED,
                  },
                  onBlur: () => {
                    trigger("confirmpassword");
                  },
                  validate: (value: string) => {
                    return value === getValues("password") || ERROR.PW_NOT_EQ;
                  },
                })}
              />
            </div>
            {errors.confirmpassword && (
              <FieldErrorBox message={errors.confirmpassword.message!} />
            )}
            <div className="mb-2">
              <label className="form-label">관리자</label>
              <select
                aria-label="Default select example"
                className="form-select"
                {...register("adminType")}
              >
                <option value={1}>관리자</option>
                <option value={0}>사용자</option>
              </select>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-wrap">
          <Button
            variant="secondary"
            onClick={formHideHandler}
            className="btn-sm rounded-pill"
          >
            <i className="fe-x-circle"></i>취소
          </Button>
          <Button onClick={formSubmitHandler} className="btn-sm rounded-pill">
            <i className="fe-edit"></i>등록
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRegisterModal;
