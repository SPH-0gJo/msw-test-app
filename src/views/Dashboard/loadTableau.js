const loadTableau = (callback) => {
    // const existingScript = document.getElementById('tableauJS');
    // if (!existingScript) {
    //   const script = document.createElement('script');
    //   script.src = 'https://nyjdev.sphinfo.com/javascripts/api/viz_v1.js';
    //   script.id = 'tableauJS';
    //   document.body.appendChild(script);
    //   script.onload = () => { 
    //     if (callback) callback();
    //   };
    // }

    const existingScript = document.getElementById('tableauJS');
    if(existingScript){
        existingScript.remove();
    }
    //if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://nyjdev.sphinfo.com/javascripts/api/viz_v1.js';
      script.id = 'tableauJS';
      document.body.appendChild(script);
      script.onload = () => { 
        if (callback) callback();
      };
    //}

    if (existingScript && callback) callback();
  };
  export default loadTableau;