import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRouters } from "./routers/index.jsx";
import { Provider } from "react-redux";
import { appStores } from "./stores/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStores}>
      <AppRouters />
    </Provider>
  </StrictMode>
);
