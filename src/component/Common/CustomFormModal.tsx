import React from "react";
import { FormModalProps } from "@/shared/type/modal";
import { Modal } from "react-bootstrap";
import Button from "@/component/ui-components/Button";

interface CustomFormModalProps extends FormModalProps {
  title: string;
  children: React.ReactNode;
  formId: string;
  formHideHandler: () => void;
}

/**
 * form을 포함하는 모달창 컴포넌트
 * @param param0
 * @returns
 */
const CustomFormModal = function ({
  show,
  title,
  children,
  formId,
  formHideHandler,
}: CustomFormModalProps) {
  return (
    <Modal show={show} onHide={formHideHandler} className="custom-modal">
      <Modal.Header onHide={formHideHandler} closeButton>
        <h4 className="modal-title">{title}</h4>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
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
          <Button
            type="submit"
            form={formId}
            size="sm"
            variant="primary"
            classList={["rounded-pill"]}
          >
            <i className="fe-edit"></i>저장
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomFormModal;
