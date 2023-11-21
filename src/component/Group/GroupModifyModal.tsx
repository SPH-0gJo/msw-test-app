import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import CustomFormModal from "@/component/Common/CustomFormModal";
import GroupForm, {
  GroupFormInputs,
  GroupFormInputsConfig,
} from "@/component/Group/GroupForm";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR, SUCCESS } from "@/shared/var/msg";
import { Group } from "@/shared/var/group";

interface GroupModifyModalProps extends FormModalProps {
  group: Group | null;
}
/**
 * 그룹 관리 메뉴에서 사용하는 수정 모달창 컴포넌트
 * @param props
 * @returns
 */
const GroupModifyModal = function (props: GroupModifyModalProps) {
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

  const handleFormInvalid: SubmitErrorHandler<GroupFormInputs> = function () {};

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
