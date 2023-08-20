import React from "react";
import Logo from "@/resources/images/logo-light.png";
import { useForm } from "react-hook-form";

type Inputs = {
  userId: string;
  password: string;
};

const Login = function () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>({
    mode: "onSubmit",
  });

  console.log(errors);

  const inputChangeHandler = function () {
    clearErrors();
  };

  return (
    <div className="login-container">
      <div className="login-inner">
        <div className="login-box">
          <div className="login-logo">
            <img src={Logo} alt="남양주 Logo" />
            <span className="logo-type">생생 시민소리 분석시스템</span>
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              console.log("submit data", data);
            })}
          >
            <div className="form-row">
              <label htmlFor="userId" className="form-label">
                아이디
              </label>
              <input
                type="text"
                id="userId"
                className="form-control form-control-lg"
                {...register("userId", { required: true })}
                onChange={inputChangeHandler}
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
                {...register("password", { required: true })}
                onChange={inputChangeHandler}
              />
            </div>
            {(errors.userId || errors.password) && (
              <p className="validation-text">
                <i className="mdi mdi-alert-outline text-danger" /> 아이디 또는
                비밀번호를 입력하세요.
              </p>
            )}
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
