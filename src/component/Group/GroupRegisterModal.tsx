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

  const { groupStore, commonStore } = useStores();

  const customAlert = commonStore.setToastMessage;

  const handleFormValid: SubmitHandler<GroupFormInputs> = async function (
    data
  ) {
    try {
      await groupStore.addGroup(data.groupName);
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

  const handleFormInvalid: SubmitErrorHandler<GroupFormInputs> = function () {};

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
