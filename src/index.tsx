import React from "react";
import { createRoot } from "react-dom/client";
import "@/resources/scss/main.scss";
import App from "./App";

const root = createRoot(document.getElementById("root") as HTMLElement);

console.log("process.env.REACT_APP_BUILD_ENV", process.env.REACT_APP_BUILD_ENV);

root.render(<App />);
