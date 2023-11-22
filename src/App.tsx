import "@/resources/scss/main.scss";

import { StoreProvider, stores } from "@/modules/Store";

import AppRoutes from "@/AppRoutes";
import { useEffect } from "react";
import { mobileScrollScript } from "@/shared/layout";

/**
 * App 화면 컴포넌트
 * @returns
 */
const App = function () {
  useEffect(() => {
    mobileScrollScript();
  }, []);

  return (
    <StoreProvider value={stores}>
      <AppRoutes />
    </StoreProvider>
  );
};

export default App;
