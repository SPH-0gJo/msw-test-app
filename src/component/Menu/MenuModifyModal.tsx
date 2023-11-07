import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import CustomFormModal from "../CustomFormModal";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR, SUCCESS } from "@/shared/var/msg";
import { Menu } from "@/shared/var/sysMenu";
import MenuForm, { MenuFormInputs, MenuFormInputsConfig } from "./MenuForm";
import { MenuModParam } from "@/modules/Menu/MenuRepository";
import { AxiosError } from "axios";
import { ErrorData } from "@/shared/request";

interface MenuModifyModalProps extends FormModalProps {
  menu: Menu | null;
}

const MenuModifyModal = function (props: MenuModifyModalProps) {
  const formId = "menu-form-mod";

  const { toggleShow, onSubmitSuccess, menu } = props;

  const formHideHandler = () => {
    toggleShow();
  };

  const { menuStore, commonStore } = useStores();
  const customAlert = commonStore.setToastMessage;

  const handleFormValid: SubmitHandler<MenuFormInputs> = async function (data) {
    const param: MenuModParam = {
      ...data,
      upperMenuId: data.upperMenuId || undefined,
      sortNo: Number(data.sortNo),
      menuId: menu?.menuId!,
    };

    try {
      await menuStore.modifyMenu(param);
      customAlert(SUCCESS.PROCCESSED);
      //팝업 창 리셋 후 닫기
      formHideHandler();
      //데이터 불러오기
      onSubmitSuccess();
    } catch (error: AxiosError<ErrorData, any> | any) {
      console.error(error);
      if (error.response) {
        if (error.response.data.code === -401) {
          customAlert(ERROR.EXIST_MENU_PATH_NAME, "FAIL");
          return;
        }
      }
      customAlert(ERROR.NOT_PROCESSED, "FAIL");
    }
  };

  const handleFormInvalid: SubmitErrorHandler<MenuFormInputs> = function () {};

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
