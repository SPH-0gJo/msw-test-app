import { tableauURL } from "@/shared/env";

/**
 * 태블로 자바스크립트 라이브러리를 동적으로 불러오는 함수 
 * @param {} callback 
 */
const loadTableau = (callback) => {
    const existingScript = document.getElementById('tableauJS');
    if(existingScript){
        existingScript.remove();
    }
      const script = document.createElement('script');
      script.src = `${tableauURL}/javascripts/api/viz_v1.js`;
      script.id = 'tableauJS';
      document.body.appendChild(script);
      script.onload = () => { 
        if (callback) callback();
      };

    if (existingScript && callback) callback();
  };
  export default loadTableau;