import { FormModalProps } from "@/shared/type/modal";
import React from "react";
import CustomModal from "../CustomModal";
import GroupForm from "./GroupForm";

interface GroupRegisterModalProps extends FormModalProps {}

const GroupRegisterModal = function (props: GroupRegisterModalProps) {
  return (
    <CustomModal
      {...props}
      title="등록"
      onSubmit={() => {
        console.log("submit");
      }}
      onHide={() => {
        console.log("hide");
      }}
    >
      <GroupForm />
    </CustomModal>
  );
};

export default GroupRegisterModal;
