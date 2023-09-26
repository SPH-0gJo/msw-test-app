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

  /**
   * 등록 모달의 input, select 태그등은 그대로 쓰되
   * 공통으로 빼낼수 있는 함수들은 빼내기 (validationCallback 등)
   * + groups는 store에 저장해서 한번만 불러오기
   */

  return (
    <Modal show={show} onHide={formHideHandler} className="custom-modal">
      <Modal.Header onHide={formHideHandler} closeButton>
        <h4 className="modal-title">수정</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="form-wrap">
          <form>
            <div className="mb-2">
              <label className="form-label">그룹</label>
              <select
                aria-label="Default select example"
                className="form-select"
              >
                <option value="">선택 없음 (게스트로 등록)</option>
              </select>
            </div>
          </form>
        </div>
      </Modal.Body>
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
