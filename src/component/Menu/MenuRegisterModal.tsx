import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import CustomFormModal from "@/component/CustomFormModal";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useStores } from "@/modules/Store";
import { ERROR, SUCCESS } from "@/shared/var/msg";
import MenuForm, { MenuFormInputs } from "./MenuForm";
import { MenuAddParam } from "@/modules/Menu/MenuRepository";

interface MenuRegisterModalProps extends FormModalProps {}

const MenuRegisterModal = function (props: MenuRegisterModalProps) {
  const formId = "menu-form-reg";

  const { toggleShow, onSubmitSuccess } = props;

  const formHideHandler = () => {
    toggleShow();
  };

  const { menuStore } = useStores();

  const handleFormValid: SubmitHandler<MenuFormInputs> = async function (data) {
    console.log("모든 필드 validation 후 문제 없을 때 호출", data);

    const param: MenuAddParam = {
      ...data,
      upperMenuId: data.upperMenuId || undefined,
      //etc: data.etc || undefined,
      sortNo: Number(data.sortNo),
    };

    try {
      await menuStore.addMenu(param);
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

  const handleFormInvalid: SubmitErrorHandler<MenuFormInputs> = function () {
    console.log("필드 중 유효하지 않은 값이 있을 때 호출");
  };

  return (
    <CustomFormModal
      {...props}
      title="등록"
      formId={formId}
      formHideHandler={formHideHandler}
    >
      <MenuForm
        formId={formId}
        onFormValid={handleFormValid}
        onFormInvalid={handleFormInvalid}
      />
    </CustomFormModal>
  );
};

export default MenuRegisterModal;
