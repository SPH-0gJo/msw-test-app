import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import CustomFormModal from "../CustomFormModal";
import GroupForm, { GroupFormInputs, GroupFormInputsConfig } from "./GroupForm";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR, SUCCESS } from "@/shared/var/msg";
import { Group } from "@/shared/var/group";

interface GroupModifyModalProps extends FormModalProps {
  group: Group | null;
}

const GroupModifyModal = function (props: GroupModifyModalProps) {
  console.log("GroupModifyModal is mount");
  const formId = "group-form-mod";

  const { toggleShow, onSubmitSuccess, group } = props;

  const formHideHandler = () => {
    toggleShow();
  };

  const { groupStore, commonStore } = useStores();

  const customAlert = commonStore.setToastMessage;

  const handleFormValid: SubmitHandler<GroupFormInputs> = async function (
    data
  ) {
    console.log("모든 필드 validation 후 문제 없을 때 호출");

    try {
      await groupStore.modifyGroup(group?.groupId!, data.groupName);
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

  const handleFormInvalid: SubmitErrorHandler<GroupFormInputs> = function () {
    console.log("필드 중 유효하지 않은 값이 있을 때 호출");
  };

  const groupFormInputsConfig: GroupFormInputsConfig = {
    groupName: {
      value: group?.groupName,
    },
  };

  return (
    <CustomFormModal
      {...props}
      title="수정"
      formId={formId}
      formHideHandler={formHideHandler}
    >
      <GroupForm
        formId={formId}
        onFormInvalid={handleFormInvalid}
        onFormValid={handleFormValid}
        groupFormInputsConfig={groupFormInputsConfig}
      />
    </CustomFormModal>
  );
};

export default GroupModifyModal;
