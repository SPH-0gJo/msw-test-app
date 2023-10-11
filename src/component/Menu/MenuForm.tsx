import { useStores } from "@/modules/Store";
import { VALIDATION_ERROR } from "@/shared/var/msg";
import { observer } from "mobx-react";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldErrorBox from "../ui-components/FieldErrorBox";
import { FormInputConfig } from "../User/UserForm";

export interface MenuFormInputs {
  upperMenuId?: string;
  menupathName: string;
  menuName: string;
  embedUrl: string;
  sortNo: number | string;
  etc?: string;
}

export type MenuFormInputsConfig = {
  [k in keyof MenuFormInputs]?: FormInputConfig;
};

export interface MenuFormProps {
  formId: string;
  onFormValid: SubmitHandler<MenuFormInputs>;
  onFormInvalid: SubmitErrorHandler<MenuFormInputs>;
  groupFormInputsConfig?: MenuFormInputsConfig;
}

const MenuForm = function ({
  formId,
  onFormValid,
  onFormInvalid,
}: MenuFormProps) {
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<MenuFormInputs>({
    mode: "onSubmit",
  });

  const { menuStore } = useStores();

  //상위 메뉴 옵션
  const parentMenus = menuStore.parentMenus || [];
  const defaultParentMenu = { menuId: "", menuName: "없음" };

  //에러메시지
  const menuNameErrorMsg = errors.menuName?.message;
  const menuPathNameErrorMsg = errors.menupathName?.message;
  const sortNoErrorMsg = errors.sortNo?.message;
  const etcErrorMsg = errors.etc?.message;

  //Submit
  const handleFormSubmit = handleSubmit(onFormValid, onFormInvalid);

  return (
    <div className="form-wrap">
      <form id={formId} onSubmit={handleFormSubmit}>
        <div className="mb-2">
          <label className="form-label">상위메뉴</label>
          <select
            {...register("upperMenuId")}
            aria-label="Default select example"
            className="form-select"
          >
            {[defaultParentMenu, ...parentMenus].map(({ menuId, menuName }) => (
              <option key={menuId} value={menuId}>
                {menuName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">메뉴명</label>
          <input
            {...register("menuName", {
              required: {
                value: true,
                message: VALIDATION_ERROR.MENU_NAME,
              },
              minLength: { value: 2, message: VALIDATION_ERROR.MENU_NAME },
              maxLength: { value: 20, message: VALIDATION_ERROR.MENU_NAME },
              pattern: {
                value: /^[0-9a-zA-Z가-힣\s]*$/,
                message: VALIDATION_ERROR.MENU_NAME,
              },
              onBlur: () => {
                trigger("menuName");
              },
            })}
            placeholder="메뉴명을 입력해주세요.(ex. 시계열분석)"
            type="text"
            className="form-control"
          />
        </div>
        {/* 에러메시지 영역 */}
        {menuNameErrorMsg && <FieldErrorBox message={menuNameErrorMsg} />}

        <div className="mb-2">
          <label className="form-label">영문메뉴명</label>
          <input
            {...register("menupathName", {
              required: {
                value: true,
                message: VALIDATION_ERROR.MENU_PATH_NAME,
              },
              minLength: { value: 2, message: VALIDATION_ERROR.MENU_PATH_NAME },
              maxLength: {
                value: 30,
                message: VALIDATION_ERROR.MENU_PATH_NAME,
              },
              pattern: {
                value: /^[0-9a-z-]+$/,
                message: VALIDATION_ERROR.MENU_PATH_NAME,
              },
              //validate: isGroupNameExist,
              onBlur: () => {
                trigger("menupathName");
              },
            })}
            placeholder="영문메뉴명을 입력해주세요.(ex. serial)"
            type="text"
            className="form-control"
          />
        </div>
        {/* 에러메시지 영역 */}
        {menuPathNameErrorMsg && (
          <FieldErrorBox message={menuPathNameErrorMsg} />
        )}

        <div className="mb-2">
          <label className="form-label">정렬순서</label>
          <input
            {...register("sortNo", {
              required: {
                value: true,
                message: VALIDATION_ERROR.MENU_SORT_NO,
              },
              pattern: {
                value: /^[^0]\d*/,
                message: VALIDATION_ERROR.MENU_SORT_NO,
              },
              onBlur: () => {
                trigger("sortNo");
              },
            })}
            placeholder="정렬순서를 입력해주세요."
            type="number"
            min={0}
            className="form-control"
          />
        </div>
        {/* 에러메시지 영역 */}
        {sortNoErrorMsg && <FieldErrorBox message={sortNoErrorMsg} />}

        <div className="mb-2">
          <label className="form-label">Embed URL</label>
          <input
            {...register("embedUrl")}
            placeholder="Embed URL을 입력해주세요.(ex. /views/.../...)"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">설명</label>
          <textarea
            {...register("etc", {
              maxLength: {
                value: 1000,
                message: VALIDATION_ERROR.MENU_ETC,
              },
              onBlur: () => {
                trigger("etc");
              },
            })}
            className="form-control"
          />
          {/* 에러메시지 영역 */}
          {etcErrorMsg && <FieldErrorBox message={etcErrorMsg} />}
        </div>
      </form>
    </div>
  );
};

export default observer(MenuForm);
