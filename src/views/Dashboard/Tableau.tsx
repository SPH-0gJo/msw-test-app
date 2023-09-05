import React, { useEffect, useRef, useState } from "react";

type customWindow = typeof window & {
  tableau: any;
};

const { tableau } = window as customWindow;

type TableauProps = {
  url: string;
};

function Tableau({ url }: TableauProps) {
  const ref = useRef(null);
  const viz = useRef(null);

  const testUrl =
    "http://34.22.86.214/trusted/VJQ04WBvSOaOsZgLOLatMQ==:c9JaVaoSxNl03hImPViQtZfJ/views/yeoron_server0817/Sentiment?:iid=1";

  //dom이 마운트되면
  useEffect(() => {
    console.dir(ref.current);
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

    viz.current = new tableau.Viz(ref.current, url, {
      height: vizHeight,
      width: vizWidth,
      //device: "phone",
      onFirstVizSizeKnown: function (e: any) {
        console.log(e);
      },
    });
  }, [url]);

  return <div style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default Tableau;
