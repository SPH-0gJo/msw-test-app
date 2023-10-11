import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import CustomFormModal from "../CustomFormModal";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR, SUCCESS } from "@/shared/var/msg";
import { Menu } from "@/shared/var/sysMenu";
import MenuForm, { MenuFormInputs, MenuFormInputsConfig } from "./MenuForm";

interface MenuModifyModalProps extends FormModalProps {
  menu: Menu | null;
}

const MenuModifyModal = function (props: MenuModifyModalProps) {
  const formId = "group-form-mod";

  const { toggleShow, onSubmitSuccess, menu } = props;

  console.log("MenuModifyModal is mount", menu);

  const formHideHandler = () => {
    toggleShow();
  };

  const { menuStore } = useStores();

  const handleFormValid: SubmitHandler<MenuFormInputs> = async function (data) {
    console.log("모든 필드 validation 후 문제 없을 때 호출");

    // try {
    //   await groupStore.modifyGroup(group?.groupId!, data.groupName);
    //   alert(SUCCESS.PROCCESSED);
    //   //팝업 창 리셋 후 닫기
    //   formHideHandler();
    //   //데이터 불러오기
    //   onSubmitSuccess();
    // } catch (error) {
    //   console.error(error);
    //   alert(ERROR.NOT_PROCESSED);
    // }
  };

  const handleFormInvalid: SubmitErrorHandler<MenuFormInputs> = function () {
    console.log("필드 중 유효하지 않은 값이 있을 때 호출");
  };

  const menuFormInputsConfig: MenuFormInputsConfig = {
    upperMenuId: {
      value: menu?.bigparentId || "",
    },
    menupathName: {
      value: menu?.menupathName,
    },
    menuName: {
      value: menu?.menuName,
    },
    embedUrl: {
      value: menu?.embedUrl,
    },
    sortNo: {
      value: menu?.sortNo,
    },
    etc: {
      value: menu?.etc,
    },
  };

  return (
    <CustomFormModal
      {...props}
      title="수정"
      formId={formId}
      formHideHandler={formHideHandler}
    >
      <MenuForm
        formId={formId}
        onFormInvalid={handleFormInvalid}
        onFormValid={handleFormValid}
        menuFormInputsConfig={menuFormInputsConfig}
      />
    </CustomFormModal>
  );
};

export default MenuModifyModal;
