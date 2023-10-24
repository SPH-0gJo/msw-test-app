import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ConfirmDialogProps, CustomConfirmOpts } from "../types";
import confirmable from "../src/confirmable";

// interface ConfirmProps {
//   show: boolean;
//   proceed: (arg0: boolean) => void;
//   dismiss: (arg0: boolean) => void;
//   cancel: (arg0: boolean) => void;
//   title: string;
//   confirmation: string;
//   cancelLabel?: string;
//   okLabel?: string;
// }

type ConfirmationProps = ConfirmDialogProps<CustomConfirmOpts, boolean>;

const Confirmation = (props: ConfirmationProps) => (
  <Modal
    animation={false}
    show={props.show}
    onHide={() => props.proceed(false)}
    backdrop={true}
    className="custom-modal"
  >
    <Modal.Header>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{props.confirmation}</Modal.Body>
    <Modal.Footer>
      <Button onClick={() => props.proceed(false)}>
        {props.cancelLabel || "cancel"}
      </Button>
      <Button className="button-l" onClick={() => props.proceed(true)}>
        {props.okLabel || "ok"}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default confirmable(Confirmation);
