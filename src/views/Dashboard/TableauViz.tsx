import React, { useLayoutEffect } from "react";
import loadTableau from "./loadTableau";

function TableauViz({ ticket, url }: { ticket: string; url: string }) {
  useLayoutEffect(() => {
    loadTableau(() => {
      console.log("tableau JS Loading ended!");
    });
  }, []);
  return (
    <div className="tableauPlaceholder" style={{ width: 1366, height: 818 }}>
      <object
        className="tableauViz"
        width={1366}
        height={818}
        style={{ display: "none" }}
      >
        <param name="host_url" value="https%3A%2F%2Fnyjdev.sphinfo.com%2F" />
        <param name="embed_code_version" value={3} />
        <param name="site_root" value="" />
        <param name="name" value={url} />
        <param name="tabs" value="yes" />
        <param name="toolbar" value="yes" />
        <param name="showAppBanner" value="false" />
        <param name="ticket" value={ticket} />
      </object>
    </div>
  );
}

export default TableauViz;
