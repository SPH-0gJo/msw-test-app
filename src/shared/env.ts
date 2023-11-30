export const rootPath = process.env.REACT_APP_BUILD_ENV === "dev" ? "voc" : "";
export const nyjRootPath = rootPath === "" ? rootPath : rootPath + "/";
export const tableauHostURL = "https://nyjdev.sphinfo.com/";
export const apiBaseUrl = "/nyj-api";
export const tableauSiteRoot =
  process.env.REACT_APP_BUILD_ENV === "dev" ? "t/voc_analysis" : "";

//console.log("nyjRootPath", nyjRootPath);
