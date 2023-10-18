import React, { useLayoutEffect } from "react";
import loadTableau from "./loadTableau";
import { tableauHostURL } from "@/shared/env";

function TableauViz({ ticket, url }: { ticket: string; url: string }) {
  useLayoutEffect(() => {
    loadTableau(() => {
      console.log("tableau JS Loading ended!");
    });
  }, []);
  const trimmedUrl = url.startsWith("/") ? url.substring(1) : url;
  return (
    <div className="tableauPlaceholder">
      <object className="tableauViz" style={{ display: "none" }}>
        <param name="host_url" value={tableauHostURL} />
        <param name="embed_code_version" value={3} />
        <param name="site_root" value="" />
        <param name="name" value={trimmedUrl} />
        <param name="tabs" value="false" />
        <param name="toolbar" value="false" />
        <param name="showAppBanner" value="false" />
        <param name="ticket" value={ticket} />
      </object>
    </div>
  );
}

export default TableauViz;
