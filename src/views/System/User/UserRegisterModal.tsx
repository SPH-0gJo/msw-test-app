import { useStores } from "@/index";
import { Group } from "@/modules/Group/GroupRepository";
import { ErrorData } from "@/shared/request";
import { AxiosError } from "axios";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ERROR } from "./var/formMessage";
import FieldErrorBox from "./FieldErrorBox";

type UserRegisterModalProps = {
  show: boolean;
  toggleShow: () => void;
};

type UserRegisterFormInputs = {
  userName: string;
  userId: string;
  password: string;
  groupId?: string;
};

const isIdValid = function (value: any) {
  return value == "yjjo" || "이름이 yjjo가 아닙니다.";
};

const UserRegisterModal = function ({
  show,
  toggleShow,
}: UserRegisterModalProps) {
  const { groupStore, accountStore } = useStores();

  const [groups, setGroups] = useState<Group[]>([]);

  const [userIdResult, setUserIdResult] = useState(false);

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<UserRegisterFormInputs>();

  const isUserIdExist = useCallback(async (userId: string) => {
    try {
      const result = await accountStore.isExist(userId);

      //result.data : true => true
      //result.data : false => "에러 메시지"
      return !result.data || "이미 사용중인 아이디입니다.";
    } catch (error: AxiosError<ErrorData, any> | any) {
      console.error(error);
      alert("서버와의 통신중 오류가 발생헀습니다. 관리자에게 문의하여 주세요.");
    }
  }, []);

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

  return (
    <Modal show={show} onHide={toggleShow} className="custom-modal">
      <Modal.Header onHide={toggleShow} closeButton>
        <h4 className="modal-title">등록</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="form-wrap">
          <form>
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
                <i className="mdi mdi-alert-outline text-danger" />{" "}
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
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                    message:
                      "영문, 숫자, 특수문자 조합으로 이루어진 8~15자의 문자열만 허용됩니다.",
                  },
                  //focus-out 할 때마다 검증
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
                name="confirmpassword"
                type="password"
                id="confirmpassword"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">관리자</label>
              <select
                aria-label="Default select example"
                className="form-select"
              >
                <option value="1">관리자</option>
                <option value="2">사용자</option>
              </select>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-wrap">
          <Button
            variant="secondary"
            onClick={toggleShow}
            className="btn-sm rounded-pill"
          >
            <i className="fe-x-circle"></i>취소
          </Button>
          <Button onClick={toggleShow} className="btn-sm rounded-pill">
            <i className="fe-edit"></i>등록
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRegisterModal;
