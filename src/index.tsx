import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import "@/resources/scss/main.scss";
// import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Default from "./views/Default";
import DashBoard from "./views/DashBoard/DashBoard";
import Users from "./views/System/Users/Users";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Default />} />
        <Route path="dashboard" element={<DashBoard />}>
          <Route path="one" />
          <Route path="two">
            <Route path="twoOne" />
          </Route>
          <Route path="three">
            <Route path="threeOne">
              <Route path="threeOneTwo" />
            </Route>
          </Route>
        </Route>
        <Route path="system">
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
