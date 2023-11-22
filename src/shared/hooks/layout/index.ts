import { useMediaQuery } from "react-responsive";

/**
 * 화면 너비가 1200px 이상인지를 반환하는 함수
 * @returns
 */
export const useFullWidthMediaQuery = () =>
  useMediaQuery({
    query: "(min-width : 1200px)",
  });
