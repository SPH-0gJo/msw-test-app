import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ConfirmDialogProps, CustomConfirmOpts } from "../types";
import confirmable from "../src/confirmable";

type ConfirmationProps = ConfirmDialogProps<CustomConfirmOpts, boolean>;

/**
 * 사용자로부터 진행 여부를 확인하는 확인창 컴포넌트
 * @param param0
 * @returns
 */
const Confirmation = ({
  show,
  proceed,
  title,
  confirmation,
  cancelLabel,
  okLabel,
}: ConfirmationProps) => (
  <Modal show={show} onHide={() => proceed(false)} className="custom-modal">
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{confirmation}</Modal.Body>
    <Modal.Footer>
      <Button onClick={() => proceed(false)}>{cancelLabel || "취소"}</Button>
      <Button className="button-l" onClick={() => proceed(true)}>
        {okLabel || "확인"}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default confirmable(Confirmation);
