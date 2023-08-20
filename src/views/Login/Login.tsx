import React from "react";
import Logo from "@/resources/images/logo-light.png";

const Login = function () {
  return (
    <div className="login-container">
      <div className="login-inner">
        <div className="login-box">
          <div className="login-logo">
            <img src={Logo} alt="남양주 Logo" />
            <span className="logo-type">생생 시민소리 분석시스템</span>
          </div>
          <form action="">
            <div className="form-row">
              <label htmlFor="userId" className="form-label">
                아이디
              </label>
              <input
                type="text"
                id="userId"
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-row">
              <label htmlFor="userPw" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                id="userPw"
                className="form-control form-control-lg"
              />
            </div>
            <p className="validation-text">
              <i className="mdi mdi-alert-outline text-danger" /> 아이디 또는
              비밀번호가 일치하지 않습니다.
            </p>
            <button
              className="btn btn-primary rounded-pill login-btn"
              type="submit"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
