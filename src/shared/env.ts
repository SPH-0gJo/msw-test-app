export const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://221.147.56.180:35030";
export const rootPath = process.env.REACT_APP_ROOT_PATH || "";
export const tableauSiteRoot = process.env.REACT_APP_T_SITE_ROOT || "";
export const tableauHostURL = process.env.REACT_APP_T_HOST_URL || "";

console.log("rootPath", rootPath);
console.log("tableauSiteRoot", tableauSiteRoot);
console.log("tableauHostURL", tableauHostURL);
console.log("apiBaseUrl", process.env.PUBLIC_URL);
console.log("apiBaseUrl", apiBaseUrl);
