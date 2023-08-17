import React from "react";

import { Outlet } from "react-router-dom";
import TopNavBar from "./layout/TopNavBar";
import LeftSideMenu from "./layout/LeftSideMenu";

function App() {
  return (
    <>
      {/* Top NavBar */}
      <TopNavBar />
      {/* Left Side Menu */}
      <LeftSideMenu />
      <div className="content-page">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
