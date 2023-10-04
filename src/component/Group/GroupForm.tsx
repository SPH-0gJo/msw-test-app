import React from "react";

const GroupForm = function () {
  return (
    <div className="form-wrap">
      <form>
        <div className="mb-2">
          <label className="form-label">그룹명</label>
          <input
            placeholder="이름을 입력해주세요."
            type="text"
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
};

export default GroupForm;
