import { useMediaQuery } from "react-responsive";

export const useFullWidthMediaQuery = () =>
  useMediaQuery({
    query: "(min-width : 1200px)",
  });
