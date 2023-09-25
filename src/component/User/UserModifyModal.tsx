import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import { Modal } from "react-bootstrap";
import Button from "@/component/ui-components/Button";
import { User } from "@/shared/var/user";

interface UserModifyModalProps extends FormModalProps {
  user: User | null;
}

const UserModifyModal = function ({
  show,
  toggleShow,
  user,
}: UserModifyModalProps) {
  const formHideHandler = () => {
    //팝업 창 닫기
    toggleShow();
  };

  console.log("UserModifyModal", user);

  return (
    <Modal show={show} onHide={formHideHandler} className="custom-modal">
      <Modal.Header onHide={formHideHandler} closeButton>
        <h4 className="modal-title">수정</h4>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <div className="btn-wrap">
          <Button
            variant="secondary"
            onClick={formHideHandler}
            size="sm"
            classList={["rounded-pill"]}
          >
            <i className="fe-x-circle"></i>취소
          </Button>
          <Button size="sm" variant="primary" classList={["rounded-pill"]}>
            <i className="fe-edit"></i>저장
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModifyModal;
