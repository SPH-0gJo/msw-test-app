import "@/resources/scss/main.scss";

import { StoreProvider, stores } from "@/modules/Store";

import AppRoutes from "./AppRoutes";

const App = function () {
  return (
    <StoreProvider value={stores}>
      <AppRoutes />
    </StoreProvider>
  );
};

export default App;
