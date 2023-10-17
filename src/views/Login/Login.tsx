import React from "react";
import Logo from "@/resources/images/logo-light.png";
import { SubmitHandler, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ErrorData } from "@/shared/request";
import { useStores } from "@/modules/Store";

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
    setError,
    trigger,
  } = useForm<Inputs>({
    mode: "onSubmit",
  });

  const { authStore } = useStores();
  const navigate = useNavigate();

  console.log(errors);

  const inputChangeHandler = function () {
    clearErrors();
  };

  //유효성 검사 후 error가 없을 때만 호출됨
  const formSubmitHandler: SubmitHandler<Inputs> = async function (data) {
    console.log("submit data", data);

    try {
      //로그인 요청
      await authStore.login(data.userId, data.password);

      //권한이 있는 메뉴 목록 요청 후 store에 세팅
      await authStore.configAuthMenuList();

      //메인 화면으로 이동
      navigate("/");
    } catch (error: AxiosError<ErrorData, any> | any) {
      //에러 출력
      console.error("login error", error);

      //HTTP 응답 에러
      if (error.response) {
        if (error.response.status === 500) {
          setError("root.serverError", {
            type: error.response.status,
            message: "로그인 중 오류가 발생했습니다. 관리자에게 문의하세요.",
          });
        } else {
          setError("root.apiError", {
            type: error.response.status,
            message:
              error.response.data.msg ||
              "입력하신 정보의 권한을 찾을 수 없습니다.",
          });
        }
      } else {
        //그외 프론트엔드 에러
        setError("root.etcError", {
          message: "로그인 중 오류가 발생했습니다. 관리자에게 문의하세요.",
        });
      }
    }
  };

  const checkKeyDown = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
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
            onSubmit={handleSubmit(formSubmitHandler)}
            //onKeyDown={(e) => checkKeyDown(e)}
          >
            <div className="form-row">
              <label htmlFor="userId" className="form-label">
                아이디
              </label>
              <input
                type="text"
                id="userId"
                className="form-control form-control-lg"
                {...register("userId", {
                  required: true,
                  onChange: inputChangeHandler,
                })}
                //onChange={inputChangeHandler}
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
                {...register("password", {
                  required: true,
                  onChange: inputChangeHandler,
                })}
                //onChange={inputChangeHandler}
              />
            </div>
            {(errors.userId || errors.password) && (
              <p className="validation-text">
                <i className="mdi mdi-alert-outline text-danger" />
                아이디 또는 비밀번호를 입력하세요.
              </p>
            )}
            {errors.root?.apiError && (
              <p className="validation-text">
                <i className="mdi mdi-alert-outline text-danger" />
                입력하신 정보의 권한을 찾을 수 없습니다.
              </p>
            )}
            {(errors.root?.serverError || errors.root?.etcError) && (
              <p className="validation-text">
                <i className="mdi mdi-alert-outline text-danger" />
                로그인 중 오류가 발생했습니다. 관리자에게 문의하세요.
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

        <div className="login-text">
          <h4>
            <i className="mdi mdi-information-slab-circle-outline text-success"></i>
            <b>생생 시민소리 분석시스템</b>이란?{" "}
          </h4>
          <p>
            뉴스포털 및 지역 커뮤니티 등을 통해 소통되는 남양주 관련정보를
            수집하고, 시정 민원데이터와 융합 분석 및 시각화 함으로써 지역
            여론동향을 빠르게 모니터링 할 수 있는 시스템 입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
