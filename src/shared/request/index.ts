import axios, { AxiosError, AxiosRequestConfig } from "axios";
import AuthRepository from "@/modules/Login/AuthRepository";
import { apiBaseUrl, rootPath } from "@/shared/env";

export interface ErrorData {
  code: number;
  msg: string;
}
//토큰이 리프레싱 요청 진행중인지 여부
let isTokenRefreshing = false;
//토큰 리프레시 후 시행될 함수들 목록
let refreshSubscribers: any[] = [];

//토큰 리프레시로 인해 지연된 함수들을 실행하는 함수
const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.map((callback) => callback(accessToken));
  refreshSubscribers = [];
};

//토큰 리프레시 후 시행할 함수 목록에 함수를 추가하는 함수
const addRefreshSubscriber = (callback: any) => {
  refreshSubscribers.push(callback);
};

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";

// 서버에 API 요청 후, JWT 만료로 응답받을 시에 로그인 화면으로 redirect

axios.interceptors.response.use(
  // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  (response) => response,
  async (error: AxiosError<ErrorData, any>) => {
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
            resolve(axios(config));
          });
        });

        try {
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
        } catch (e) {
          console.error(e);
          return Promise.reject(error);
        }
      } else {
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken: string) => {
            resolve(axios(config));
          });
        });

        return retryOriginalRequest;
      }
    } else if (status === 401 || status === 403) {
      //auth/refresh 요청에서 토큰 만료 응답 받은 경우 포함 (이 말은 다른데서 로그인 했다는 뜻,,)
      if (config.url !== "/auth/login") {
        localStorage.removeItem("token");
        localStorage.removeItem("r_token");
        window.location.href =
          rootPath === "" ? "/login" : `/${rootPath}/login`;
      }
      //로그인에 실패한 경우는 로그인 페이지로 redirect 없이 reject만 반환
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config) {
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

/**
 * Post 요청을 생성하는 함수
 * @param url
 * @param requestBody
 * @returns
 */
const createPost = function <T>(url: string, requestBody: any) {
  return axios.post<T>(url, requestBody);
};

/**
 * Get 요청을 생성하는 함수
 * @param url
 * @param config
 * @returns
 */
const createGet = function <T>(
  url: string,
  config: AxiosRequestConfig<any> | undefined = {}
) {
  return axios.get<T>(url, config);
};

export { createGet, createPost };
