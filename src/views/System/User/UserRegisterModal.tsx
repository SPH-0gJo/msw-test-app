import { useStores } from "@/index";
import { Group } from "@/modules/Group/GroupRepository";
import React, { useLayoutEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

type UserRegisterModalProps = {
  show: boolean;
  toggleShow: () => void;
};

const UserRegisterModal = function ({
  show,
  toggleShow,
}: UserRegisterModalProps) {
  const { groupStore } = useStores();

  const [groups, setGroups] = useState<Group[]>([]);

  useLayoutEffect(() => {
    console.log("Group useLayoutEffect");
    groupStore
      .findAll()
      .then((result) => {
        if (result.data) {
          setGroups(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Modal show={show} onHide={toggleShow} className="custom-modal">
      <Modal.Header onHide={toggleShow} closeButton>
        <h4 className="modal-title">등록</h4>
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
                {groups.map(({ groupId, groupName }) => (
                  <option value={groupId}>{groupName}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">이름</label>
              <input
                placeholder="이름을 입력해주세요."
                name="username"
                type="text"
                id="username"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">아이디</label>
              <input
                placeholder="아이디를 입력해주세요."
                name="email"
                type="email"
                id="email"
                className="form-control"
              />
            </div>

            <div className="mb-2">
              <label className="form-label">비밀번호</label>
              <input
                placeholder="비밀번호를 입력해주세요."
                name="password"
                type="password"
                id="password"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">비밀번호 확인</label>
              <input
                placeholder="비밀번호를 확인해주세요."
                name="confirmpassword"
                type="password"
                id="confirmpassword"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">관리자</label>
              <select
                aria-label="Default select example"
                className="form-select"
              >
                <option value="1">관리자</option>
                <option value="2">사용자</option>
              </select>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-wrap">
          <Button
            variant="secondary"
            onClick={toggleShow}
            className="btn-sm rounded-pill"
          >
            <i className="fe-x-circle"></i>취소
          </Button>
          <Button onClick={toggleShow} className="btn-sm rounded-pill">
            <i className="fe-edit"></i>등록
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRegisterModal;
