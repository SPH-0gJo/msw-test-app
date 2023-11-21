/**
 * 아이폰 브라우저 높이 관련 height 100vh 이슈 수정 코드
 */
export const mobileScrollScript = () => {
  let vh: number = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh: number = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
};

/**
 * LeftMenuBar 접고 피는 코드
 */
export const loadLeftMenuScript = () => {
  const btnMenu = document.querySelector(".btn-menu");
  const leftSideMenu = document.querySelector(".left-side-menu");
  const contentPage = document.querySelector(".content-page");
  const topNav = document.querySelector(".top-nav");

  btnMenu?.addEventListener("click", function () {
    leftSideMenu?.classList.toggle("fold");
    contentPage?.classList.toggle("fold");
    topNav?.classList.toggle("fold");
  });
};
