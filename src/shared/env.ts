//dev : SPH 내부 태블로 서버
//nyj1 : 남양주 내부망
//nyj2 : 남양주 외부망
const NYJ_1_T_HOST_URL = "";
const NYJ_2_T_HOST_URL = "https://siminsori.nyj.go.kr/voc/";
const nyjTableauHostUrl =
  process.env.REACT_APP_BUILD_ENV === "nyj1"
    ? NYJ_1_T_HOST_URL
    : NYJ_2_T_HOST_URL;
export const rootPath = process.env.REACT_APP_BUILD_ENV === "dev" ? "voc" : "";
export const nyjRootPath = rootPath === "" ? rootPath : rootPath + "/";
// export const tableauHostURL = "https://nyjdev.sphinfo.com/";
export const tableauHostURL =
  process.env.REACT_APP_BUILD_ENV === "dev"
    ? "https://nyjdev.sphinfo.com/"
    : nyjTableauHostUrl;
export const apiBaseUrl = "/nyj-api";
export const tableauSiteRoot =
  process.env.REACT_APP_BUILD_ENV === "dev" ? "" : "t/voc_analysis";

//console.log("nyjRootPath", nyjRootPath);
