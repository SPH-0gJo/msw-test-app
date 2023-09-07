import React, { useEffect } from "react";
import DashLeftSideMenu from "./DashLeftSideMenu";
import { useLocation } from "react-router-dom";
import SysLeftSideMenu from "./SysLeftSideMenu";

import "./index.scss";
import loadLeftMenuScript from "@/main";

const LeftSideMenu = function () {
  const { pathname } = useLocation();
  console.log("----pathname----", pathname);

  useEffect(() => {
    // var sideNavLinks = document.querySelectorAll(".side-nav-link");
    // sideNavLinks.forEach(function (link) {
    //   link.addEventListener("click", (e) => {
    //     var label = link as HTMLAnchorElement;
    //     var parent = label.closest(".has-sub");
    //     var list = label.nextElementSibling as HTMLUListElement | null;
    //     if (!list || !parent) return;
    //     if (parent.classList.contains("is-open")) {
    //       list.style.display = "none";
    //       parent.classList.remove("is-open");
    //     } else {
    //       list.style.display = "block";
    //       parent.classList.add("is-open");
    //     }
    //   });
    // });

    loadLeftMenuScript();
  }, []);

  return pathname.startsWith("/system") ? (
    <SysLeftSideMenu />
  ) : (
    <DashLeftSideMenu />
  );
};

export default LeftSideMenu;
