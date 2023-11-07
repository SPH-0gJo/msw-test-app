import React, { useEffect, useRef, useState } from "react";

type customWindow = typeof window & {
  tableau: any;
};

const { tableau } = window as customWindow;

type TableauProps = {
  url: string;
  ticket: string;
};
function Tableau({ url, ticket }: TableauProps) {
  const ref = useRef(null);
  const viz = useRef(null);

  const trimmedUrl = url.startsWith("/") ? url.substring(1) : url;

  const testUrl = `https://nyjdev.sphinfo.com/trusted/${ticket}/views/${trimmedUrl}`;

  //dom이 마운트되면
  useEffect(() => {
    const divElement = ref.current;
    let vizWidth = "1600px",
      vizHeight = "1027px";

    //모바일 화면
    if (
      divElement !== null &&
      (divElement as HTMLDivElement).offsetWidth <= 500
    ) {
      vizWidth = "100%";
      vizHeight = "3127px";
    }

    if (viz.current) {
      (viz.current as any).dispose();
    }

    viz.current = new tableau.Viz(ref.current, testUrl, {
      height: vizHeight,
      width: vizWidth,
      //device: "phone",
      onFirstInteractive: function (e: any) {
        const iframeElem = e.getViz()["_impl"]["$1l"]; //document.getElementsByTagName("iframe")[0];
        var cssLink = document.createElement("link");
        cssLink.href =
          "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        // console.log(e.getViz());
        // console.log(e.getViz()["_impl"]["$1l"]);
        console.dir(iframeElem);
        //iframeElem.ownerDocument.head.appendChild(cssLink);
      },
    });
  }, [testUrl]);

  return <div style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default Tableau;
