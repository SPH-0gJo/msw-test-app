import React, { useLayoutEffect, useState } from "react";
import { FormModalProps } from "@/shared/type/modal";
import { Modal } from "react-bootstrap";
import Button from "@/component/ui-components/Button";
import { User } from "@/shared/var/user";
import UserForm, { UserFormInputs, UserFormInputsConfig } from "./UserForm";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR } from "@/shared/var/msg";

interface UserModifyModalProps extends FormModalProps {
  user: User | null;
}

const UserModifyModal = function ({
  show,
  toggleShow,
  user,
}: UserModifyModalProps) {
  const formHideHandler = () => {
    //팝업 창 닫기
    toggleShow();
    //팝업 창내 form 리셋
    reset();
  };

  const { accountStore } = useStores();

  console.log("UserModifyModal", user);

  /**
   * 등록 모달의 input, select 태그등은 그대로 쓰되
   * 공통으로 빼낼수 있는 함수들은 빼내기 (validationCallback 등)
   * + groups는 store에 저장해서 한번만 불러오기
   */

  const modUserFormInputsConfig: UserFormInputsConfig = {
    groupId: {
      value: user?.groupId || "",
    },
    userName: {
      value: user?.userName,
    },
    userId: {
      value: user?.userId,
      disabled: true,
    },
    password: {
      label: "신규 비밀번호",
    },
    confirmpassword: {
      label: "신규 비밀번호 확인",
    },
    adminType: {
      value: user?.adminType ? 1 : 0,
    },
  };

  const handleFormValid = async function (
    data: UserFormInputs,
    formReset: any
  ) {
    console.log("모든 필드 validation 후 문제 없을 때 호출");
    const modUser = {
      sysuserId: user?.sysuserId,
      userId: user?.userId!,
      userName: data.userName,
      password: data.password,
      adminType: Boolean(parseInt(data.adminType)),
      groupId: data.groupId === "" ? undefined : data.groupId,
    };

    try {
      await accountStore.modifyAccount(modUser);
    } catch (error) {
      console.error(error);
      alert(ERROR.NOT_PROCESSED);
    }
  };

  const handleFormInvalid: SubmitErrorHandler<UserFormInputs> = function () {
    console.log("필드 중 유효하지 않은 값이 있을 때 호출");
  };

  const formId = "user-form-mod";

  return (
    <Modal show={show} onHide={formHideHandler} className="custom-modal">
      <Modal.Header onHide={formHideHandler} closeButton>
        <h4 className="modal-title">수정</h4>
      </Modal.Header>
      <Modal.Body>
        <UserForm
          formId={formId}
          userFormInputsConfig={modUserFormInputsConfig}
          onFormValid={handleFormValid}
          onFormInvalid={handleFormInvalid}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-wrap">
          <Button
            variant="secondary"
            onClick={formHideHandler}
            size="sm"
            classList={["rounded-pill"]}
          >
            <i className="fe-x-circle"></i>취소
          </Button>
          <Button
            type="submit"
            form={formId}
            size="sm"
            variant="primary"
            classList={["rounded-pill"]}
          >
            <i className="fe-edit"></i>저장
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(UserModifyModal);
