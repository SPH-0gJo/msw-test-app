import React from "react";

const UserForm = function () {
  return (
    <div className="form-wrap">
      <form>
        {/* 그룹 */}
        <div className="mb-2">
          <label className="form-label">그룹</label>
          <select aria-label="Default select example" className="form-select">
            <option value="">선택 없음 (게스트로 등록)</option>
          </select>
        </div>
        {/* 이름 */}
        <div className="mb-2">
          <label className="form-label">이름</label>
          <input
            placeholder="이름을 입력해주세요."
            type="text"
            id="userName"
            className="form-control"
          />
        </div>
        {/* 아이디 */}
        <div className="mb-2">
          <label className="form-label">아이디</label>
          <input
            placeholder="아이디를 입력해주세요."
            type="text"
            id="userId"
            className="form-control"
          />
        </div>
        {/* 비밀번호 */}
        <div className="mb-2">
          <label className="form-label">비밀번호</label>
          <input
            placeholder="비밀번호를 입력해주세요."
            type="password"
            id="password"
            className="form-control"
          />
        </div>
        {/* 비밀번호 확인 */}
        <div className="mb-2">
          <label className="form-label">비밀번호 확인</label>
          <input
            placeholder="비밀번호를 확인해주세요."
            type="password"
            className="form-control"
          />
        </div>
        {/* 관리자 여부  */}
        <div className="mb-2">
          <label className="form-label">관리자</label>
          <select aria-label="Default select example" className="form-select">
            <option value={1}>관리자</option>
            <option value={0}>사용자</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
