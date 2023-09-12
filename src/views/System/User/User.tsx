import React, { useState } from "react";
import UserRegisterModal from "@/component/User/UserRegisterModal";
import Table from "@/component/ui-components/Table";
import CheckBox from "@/component/ui-components/CheckBox";

const User = function () {
  //등록 모달
  const [regModalShow, setRegModalShow] = useState<boolean>(false);

  // Show/hide the modal
  const toggleRegModal = () => {
    setRegModalShow(!regModalShow);
  };

  const columns = [
    {
      key: "ckboxall",
      value: <CheckBox />,
    },
    {
      key: "no",
      value: "NO",
    },
    {
      key: "groupName",
      value: "그룹명",
    },
    {
      key: "userId",
      value: "아이디",
    },
    {
      key: "userName",
      value: "이름",
    },
    {
      key: "useYn",
      value: "사용여부",
    },
    {
      key: "registDate",
      value: "등록일",
    },
    {
      key: "mng",
      value: "관리",
    },
  ];

  return (
    <>
      <div className="card-box">
        <div className="card-box-body">
          <div className="table-control-top">
            <div className="table-search-wrap">
              <select name="" id="">
                <option value="">아이디</option>
                <option value="">그룹명</option>
                <option value="">이름</option>
              </select>
              <input type="search" />
              <button className="btn">
                <i className="fe-search" />
              </button>
            </div>
            <div className="btn-wrap">
              <button
                onClick={toggleRegModal}
                className="btn btn-sm rounded-pill btn-primary"
              >
                <i className="fe-edit" />
                등록
              </button>
              <button className="btn btn-sm rounded-pill btn-danger">
                <i className="fe-x-circle" />
                선택 삭제
              </button>
            </div>
          </div>
          <div className="table-wrap">
            <Table />
          </div>
          <div className="pagination-wrap">
            <ul className="pagination pagination-rounded">
              <li className="page-item paginate_button previous disabled">
                <a className="page-link" href="#">
                  <i className="mdi mdi-chevron-left" />
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  12
                </a>
              </li>
              <li className="page-item paginate_button next">
                <a className="page-link" href="#">
                  <i className="mdi mdi-chevron-right" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* 모달창 */}
      <UserRegisterModal show={regModalShow} toggleShow={toggleRegModal} />
    </>
  );
};

export default User;
