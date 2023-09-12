import React from "react";

const Table = function () {
  return (
    <table className="table table-custom">
      <colgroup>
        <col width="6%" />
        <col width="6%" />
        <col width="auto" />
        <col width="auto" />
        <col width="auto" />
        <col width="10%" />w
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
  );
};

export default Table;
