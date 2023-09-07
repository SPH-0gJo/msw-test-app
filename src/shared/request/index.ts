import axios, { AxiosError } from "axios";
import AuthRepository from "@/modules/Login/AuthRepository";

export type ErrorData = {
  code: number;
  msg: string;
};

let isTokenRefreshing = false;
let refreshSubscribers: any[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: any) => {
  refreshSubscribers.push(callback);
};

axios.defaults.baseURL = "/nyj-api";
axios.defaults.headers.common["Content-Type"] = "application/json";

// 서버에 API 요청 후, JWT 만료로 응답받을 시에 로그인 화면으로 redirect

/*
axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorData, any>) => {
    console.log("response", error);
    const { status, data, config } = error.response!;

    //토큰 만료 응답을 받은 경우
    if (
      status === 401 &&
      data.code === -110 &&
      config.url !== "/auth/refresh"
    ) {
      console.log("refresh 요청");
      //refresh 요청
      const { data } = await AuthRepository.refresh();

      //토큰 재세팅
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("r_token", data.refresh_token);

      //기존 요청 재요청
      return axios(config);
    } else if (status === 401 || status === 403) {
      // /auth/refresh 요청에서 토큰 만료 응답 받은 경우 포함 (이 말은 다른데서 로그인 했다는 뜻,,)
      console.log("login 페이지 이동");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

*/

axios.interceptors.response.use(
  // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  (response) => response,
  async (error: AxiosError<ErrorData, any>) => {
    console.log("response", error);
    const { status, data, config } = error.response!;

    //토큰 만료 응답을 받은 경우
    if (
      status === 401 &&
      data.code === -110 &&
      config.url !== "/auth/refresh"
    ) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;

        // 요청  refreshSubscribers에 저장
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken: string) => {
            //config.headers.Authorization = "Bearer " + accessToken;
            resolve(axios(config));
          });
        });

        //refresh 요청
        const { data } = await AuthRepository.refresh();

        //토큰 재세팅
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("r_token", data.refresh_token);

        isTokenRefreshing = false;

        //지연 요청 진행
        onTokenRefreshed(data.access_token);

        //??? 이렇게 되면 맨 처음 받은 refresh를 요구하는 요청은 누락되는거 아닌가,,,?

        return retryOriginalRequest;
      } else {
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken: string) => {
            //config.headers.Authorization = "Bearer " + accessToken;
            resolve(axios(config));
          });
        });

        return retryOriginalRequest;
      }
    } else if (status === 401 || status === 403) {
      // /auth/refresh 요청에서 토큰 만료 응답 받은 경우 포함 (이 말은 다른데서 로그인 했다는 뜻,,)
      console.log("login 페이지 이동");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config) {
    console.log("request", config);
    const accessToken = localStorage.getItem("token");

    //헤더에 삽입
    //로그인인 경우는 Bearer 토큰 추가하면 서버에서 에러반환,,
    if (
      config.url !== "/auth/login" &&
      config.url !== "/auth/refresh" &&
      accessToken
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const createPost = function <T>(url: string, requestBody: any) {
  return axios.post<T>(url, requestBody);
};

const createGet = function (url: string, config = {}) {
  return axios.get(url, config);
};

export { createGet, createPost };
