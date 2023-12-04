import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStores } from "@/modules/Store";
import { getTableauUrl } from "@/shared/var/menu";
import TableauViz from "./TableauViz";
import ContentCenterWrapper from "@/component/ui-components/ContentCenterWrapper";

const DEFAULT_URL = null; //"https://public.tableau.com/views/_16866371409120/sheet14";

/**
 * 대시보드 화면 컴포넌트
 * @returns
 */
const Dashboard = function () {
  const { pathname } = useLocation();
  const { dashboardStore, authStore } = useStores();

  const [url, setUrl] = useState<null | string>(DEFAULT_URL);
  const [ticket, setTicket] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  //앱의 URL이 바뀔때 마다 이에 맞는 태블로 임베딩 URL을 찾은 후에 URL에 티켓 삽입 후 대시보드 렌더링
  useEffect(() => {
    const authMenuInfoList = authStore.authMenuInfoList;
    const tableauUrl = getTableauUrl(authMenuInfoList, pathname);

    if (tableauUrl) {
      //console.log("tableauUrl is,,,", tableauUrl);
      setUrl(tableauUrl);
      setLoading(true);

      dashboardStore
        .getTicket()
        .then((ticket) => {
          if (ticket) {
            //console.log("ticket is,,,", ticket);
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

  return loading ? (
    <ContentCenterWrapper>
      <div>Loading...</div>
    </ContentCenterWrapper>
  ) : url && ticket ? (
    <TableauViz url={url} ticket={ticket} />
  ) : !url ? (
    <ContentCenterWrapper>
      <div>대시보드 URL이 존재하지 않습니다.</div>
    </ContentCenterWrapper>
  ) : (
    <ContentCenterWrapper>
      <div>대시보드 인증에 실패하였습니다.</div>
    </ContentCenterWrapper>
  );
};

export default Dashboard;
