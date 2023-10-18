import "@/resources/scss/main.scss";

import { StoreProvider, stores } from "@/modules/Store";
import { authMenuInfoList } from "./shared/var/authMenu";
import AppRoutes from "./AppRoutes";

console.log("authMenuInfoList", authMenuInfoList);

const App = function () {
  return (
    <StoreProvider value={stores}>
      <AppRoutes />
    </StoreProvider>
  );
};

export default App;
