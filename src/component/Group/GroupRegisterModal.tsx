import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import CustomFormModal from "../CustomFormModal";
import GroupForm, { GroupFormInputs } from "./GroupForm";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR, SUCCESS } from "@/shared/var/msg";

interface GroupRegisterModalProps extends FormModalProps {}

const GroupRegisterModal = function (props: GroupRegisterModalProps) {
  const formId = "group-form-reg";

  const { toggleShow, onSubmitSuccess } = props;

  const formHideHandler = () => {
    toggleShow();
  };

  const { groupStore } = useStores();

  const handleFormValid: SubmitHandler<GroupFormInputs> = async function (
    data
  ) {
    console.log("모든 필드 validation 후 문제 없을 때 호출");

    try {
      await groupStore.addGroup(data.groupName);
      alert(SUCCESS.PROCCESSED);
      //팝업 창 리셋 후 닫기
      formHideHandler();
      //데이터 불러오기
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      alert(ERROR.NOT_PROCESSED);
    }
  };

  const handleFormInvalid: SubmitErrorHandler<GroupFormInputs> = function () {
    console.log("필드 중 유효하지 않은 값이 있을 때 호출");
  };

  return (
    <CustomFormModal
      {...props}
      title="등록"
      formId={formId}
      formHideHandler={formHideHandler}
    >
      <GroupForm
        formId={formId}
        onFormInvalid={handleFormInvalid}
        onFormValid={handleFormValid}
      />
    </CustomFormModal>
  );
};

export default GroupRegisterModal;
