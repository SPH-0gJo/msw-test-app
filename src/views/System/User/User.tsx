import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const User = function () {
  const [standard, setStandard] = useState<boolean>(false);

  // Show/hide the modal
  const toggleStandard = () => {
    setStandard(!standard);
  };

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
                onClick={toggleStandard}
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
            <table className="table table-custom">
              <colgroup>
                <col width="6%" />
                <col width="6%" />
                <col width="auto" />
                <col width="auto" />
                <col width="auto" />
                <col width="10%" />
                <col width="auto" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </th>
                  <th>NO</th>
                  <th>그룹명</th>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>사용여부</th>
                  <th>등록일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>4</td>
                  <td>환경민원</td>
                  <td>HongGD</td>
                  <td>홍길동</td>
                  <td>N</td>
                  <td>2023.06.29</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>3</td>
                  <td>시의원</td>
                  <td>ParkSJ</td>
                  <td>박서준</td>
                  <td>N</td>
                  <td>2023.06.29</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>2</td>
                  <td>환경민원</td>
                  <td>HongEC</td>
                  <td>홍은채</td>
                  <td>N</td>
                  <td>2023.06.01</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>1</td>
                  <td>관리자</td>
                  <td>YiSJ</td>
                  <td>이승재</td>
                  <td>Y</td>
                  <td>2023.05.25</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>4</td>
                  <td>환경민원</td>
                  <td>HongGD</td>
                  <td>홍길동</td>
                  <td>N</td>
                  <td>2023.06.29</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>3</td>
                  <td>시의원</td>
                  <td>ParkSJ</td>
                  <td>박서준</td>
                  <td>N</td>
                  <td>2023.06.29</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>2</td>
                  <td>환경민원</td>
                  <td>HongEC</td>
                  <td>홍은채</td>
                  <td>N</td>
                  <td>2023.06.01</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>1</td>
                  <td>관리자</td>
                  <td>YiSJ</td>
                  <td>이승재</td>
                  <td>Y</td>
                  <td>2023.05.25</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>3</td>
                  <td>시의원</td>
                  <td>ParkSJ</td>
                  <td>박서준</td>
                  <td>N</td>
                  <td>2023.06.29</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>2</td>
                  <td>환경민원</td>
                  <td>HongEC</td>
                  <td>홍은채</td>
                  <td>N</td>
                  <td>2023.06.01</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>1</td>
                  <td>관리자</td>
                  <td>YiSJ</td>
                  <td>이승재</td>
                  <td>Y</td>
                  <td>2023.05.25</td>
                  <td>
                    <button className="btn btn-xs rounded-pill btn-success">
                      수정
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
      <Modal show={standard} onHide={toggleStandard} className="custom-modal">
        <Modal.Header onHide={toggleStandard} closeButton>
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
                  <option>시의원</option>
                  <option value="1">관리자</option>
                  <option value="2">사용자</option>
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
              onClick={toggleStandard}
              className="btn-sm rounded-pill"
            >
              <i className="fe-x-circle"></i>취소
            </Button>
            <Button onClick={toggleStandard} className="btn-sm rounded-pill">
              <i className="fe-edit"></i>등록
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default User;
