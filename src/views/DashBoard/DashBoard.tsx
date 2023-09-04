import React, { useEffect, useState } from "react";
import Tableau from "./Tableau";
import { useLocation } from "react-router-dom";
import { useStores } from "@/index";
import { getTableauUrl, menuInfoList } from "@/shared/var/menu";
import TableauViz from "./TableauViz";

const applyTicket = function (url: string, ticket: string) {
  return url.replace("/views", `/trusted/${ticket}/views`);
};

const DEFAULT_URL = null; //"https://public.tableau.com/views/_16866371409120/sheet14";

const Dashboard = function () {
  const { state, pathname } = useLocation();
  const { dashboardStore } = useStores();

  const [url, setUrl] = useState<null | string>(DEFAULT_URL);
  const [ticket, setTicket] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("pathname", pathname);
    const tableauUrl = getTableauUrl(menuInfoList, pathname);

    if (tableauUrl) {
      console.log("tableauUrl is,,,", tableauUrl);
      setUrl(tableauUrl);
      setLoading(true);
      dashboardStore
        .getTicket()
        .then((ticket) => {
          if (ticket) {
            console.log("ticket is,,,", ticket);
            //let authorizedUrl = applyTicket(tableauUrl, ticket);
            //console.log("authorizedUrl", authorizedUrl);
            //setUrl(authorizedUrl);
            setTicket(ticket);
          }
        })
        .catch((e: any) => {
          console.error(e);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUrl(null);
    }
  }, [pathname]);

  //mount시 ticket 발행 요청
  // useEffect(() => {
  //   if (state?.url) {
  //     setLoading(true);
  //     dashboardStore
  //       .getTicket()
  //       .then((ticket) => {
  //         if (ticket) {
  //           console.log("ticket is,,,", ticket);
  //           let authorizedUrl = applyTicket(state.url, ticket);
  //           console.log("authorizedUrl", authorizedUrl);
  //           setUrl(authorizedUrl);
  //         }
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }, [state?.url]);

  // return loading ? (
  //   <div>Loading...</div>
  // ) : url ? (
  //   <Tableau url={url} />
  // ) : (
  //   <div>대시보드 URL이 존재하지 않습니다.</div>
  // );

  return loading ? (
    <div>Loading...</div>
  ) : url && ticket ? (
    <TableauViz url={url} ticket={ticket} />
  ) : !url ? (
    <div>대시보드 URL이 존재하지 않습니다.</div>
  ) : (
    // <div>유효하지 않은 티켓이거나, 티켓 발행에 실패하였습니다.</div>
    <div>대시보드 인증에 실패하였습니다.</div>
  );
};

export default Dashboard;
