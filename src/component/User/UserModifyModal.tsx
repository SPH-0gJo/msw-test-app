import React, { useRef } from "react";
import { FormModalProps } from "@/shared/type/modal";
import { Modal } from "react-bootstrap";
import Button from "@/component/ui-components/Button";
import { User } from "@/shared/var/user";
import UserForm, {
  ExternalUserForm,
  UserFormInputs,
  UserFormInputsConfig,
} from "@/component/User/UserForm";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR, SUCCESS } from "@/shared/var/msg";

interface UserModifyModalProps extends FormModalProps {
  user: User | null;
}

/**
 * 사용자 관리 메뉴에서 사용하는 수정 모달창 컴포넌트
 * @param props
 * @returns
 */
const UserModifyModal = function ({
  show,
  toggleShow,
  user,
  onSubmitSuccess,
}: UserModifyModalProps) {
  const {
    accountStore,
    commonStore: { setToastMessage: customAlert },
  } = useStores();

  const formRef = useRef<ExternalUserForm>(null);

  const formHideHandler = () => {
    //팝업 창 닫기
    toggleShow();
    //팝업 창내 form 리셋
    //formRef.current!.formReset();
  };

  //form 필드 기본 설정값
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

  //form의 모든 필드가 유효성 검사를 통과한 경우 콜백 함수
  const handleFormValid: SubmitHandler<UserFormInputs> = async function (data) {
    const modUser = {
      sysuserId: user?.sysuserId,
      userId: user?.userId!,
      userName: data.userName,
      password: data.password === "" ? undefined : data.password,
      adminType: Boolean(parseInt(data.adminType)),
      groupId: data.groupId === "" ? undefined : data.groupId,
    };

    try {
      await accountStore.modifyAccount(modUser);
      customAlert(SUCCESS.PROCCESSED);
      //팝업 창 리셋 후 닫기
      formHideHandler();
      //데이터 불러오기
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      customAlert(ERROR.NOT_PROCESSED, "FAIL");
    }
  };

  //form의 필드 중 하나라도 유효하지 않은 경우 콜백함수
  const handleFormInvalid: SubmitErrorHandler<UserFormInputs> = function () {};

  const formId = "user-form-mod";

  return (
    <Modal show={show} onHide={formHideHandler} className="custom-modal">
      <Modal.Header onHide={formHideHandler} closeButton>
        <h4 className="modal-title">수정</h4>
      </Modal.Header>
      <Modal.Body>
        <UserForm
          ref={formRef}
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
