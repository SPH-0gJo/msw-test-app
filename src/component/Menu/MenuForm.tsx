import { VALIDATION_ERROR } from "@/shared/var/msg";
import React from "react";
import { useForm } from "react-hook-form";

export interface MenuFormInputs {
  upperMenuId: string;
  menupathName: string;
  menuName: string;
  embedUrl: string;
  sortNo: number;
  etc: string;
}

const MenuForm = function () {
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm<MenuFormInputs>({
    mode: "onSubmit",
  });

  return (
    <div className="form-wrap">
      <form>
        <div className="mb-2">
          <label className="form-label">상위메뉴</label>
          <select
            {...register("upperMenuId")}
            aria-label="Default select example"
            className="form-select"
          >
            <option value="">없음</option>
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
        <div className="mb-2">
          <label className="form-label">Embed URL</label>
          <input
            placeholder="Embed URL을 입력해주세요.(ex. /views/.../...)"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">설명</label>
          <textarea className="form-control" />
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
