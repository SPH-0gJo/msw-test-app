const loadLeftMenuScript = ()=>{
    //MenuBar 접고 피는 코드 작성...
  //document.addEventListener("DOMContentLoaded", function() {
    var btnMenu = document.querySelector('.btn-menu');
    var leftSideMenu = document.querySelector('.left-side-menu');
    var contentPage = document.querySelector('.content-page');
    var topNav = document.querySelector('.top-nav');

    btnMenu.addEventListener('click', function() {
      leftSideMenu.classList.toggle('fold');
      contentPage.classList.toggle('fold');
      topNav.classList.toggle('fold');
    });
  //});

}


export default loadLeftMenuScript;




