import React, { useLayoutEffect } from "react";
import loadTableau from "./loadTableau";
import { tableauHostURL } from "@/shared/env";

/**
 * 태블로 서버로부터 반환받은 대시보드 화면을 렌더링하는 컴포넌트
 * @param param0
 * @returns
 */
const TableauViz = function ({ ticket, url }: { ticket: string; url: string }) {
  useLayoutEffect(() => {
    loadTableau(() => {
      console.log("tableau JS Loading ended!");
    });
  }, []);
  //대시보드 URL
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
};

export default TableauViz;
