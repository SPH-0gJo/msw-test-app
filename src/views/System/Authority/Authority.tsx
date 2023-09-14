import React from "react";
import { Button, Modal } from "react-bootstrap";
import Table from "@/component/ui-components/Table";
import {UserData} from "@/shared/var/user";

const Authority = function () {
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <div className="card-box">
            <div className="card-box-body">
              <div className="table-control-top">
                <div className="table-search-wrap">
                  <select name="" id="">
                    <option value="">그룹명</option>
                  </select>
                  <input type="search" />
                  <button className="btn">
                    <i className="fe-search" />
                  </button>
                </div>
              </div>
              <div className="table-wrap">
                <table className="table table-custom table-clickable">
                  <colgroup>
                    <col width="auto" />
                  </colgroup>
                  <thead>
                  <tr>
                    <th>그룹명</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>복지정책과</td>
                  </tr>
                  <tr>
                    <td>환경정책과</td>
                  </tr>
                  <tr>
                    <td>주택과</td>
                  </tr>
                  <tr className="active">
                    <td>시의원</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card-box">
            <div className="card-box-body">
              <div className="table-control-top">
                <div className="table-search-wrap">
                  <select name="" id="">
                    <option value="">메뉴명</option>
                  </select>
                  <input type="search" />
                  <button className="btn">
                    <i className="fe-search" />
                  </button>
                </div>
                <div className="btn-wrap">
                  <button className="btn btn-sm rounded-pill btn-primary">
                    <i className="fe-check-circle" />
                    저장
                  </button>
                  <button className="btn btn-sm rounded-pill btn-dark">
                    <i className="fe-x-circle" />
                    취소
                  </button>
                </div>
              </div>
              <div className="table-wrap">
                <table className="table table-custom table-menu">
                  <colgroup>
                    <col width="auto" />
                    <col width="10%" />
                  </colgroup>
                  <thead>
                  <tr>
                    <th>메뉴명</th>
                    <th>권한부여</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="tr-menu-depth1 active">
                    <td>메인 대시보드</td>
                    <td>
                      <div className="checkbox">
                        <input type="checkbox" />
                      </div>
                    </td>
                  </tr>
                  <tr className="tr-menu-depth2 active">
                    <td>시군구별</td>
                    <td>
                      <div className="checkbox">
                        <input type="checkbox" />
                      </div>
                    </td>
                  </tr>
                  <tr className="tr-menu-depth3 ">
                    <td>시군구 상세 보드</td>
                    <td>
                      <div className="checkbox">
                        <input type="checkbox" />
                      </div>
                    </td>
                  </tr>
                  <tr className="tr-menu-depth3">
                    <td>시군구 요약 보드</td>
                    <td>
                      <div className="checkbox">
                        <input type="checkbox" />
                      </div>
                    </td>
                  </tr>
                  <tr className="tr-menu-depth2">
                    <td>기관별</td>
                    <td>
                      <div className="checkbox">
                        <input type="checkbox" />
                      </div>
                    </td>
                  </tr>
                  {/*<tr class="tr-menu-depth3">
                  <td>기관별 상세 보드</td>
                  <td>
                    <div class="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>
                <tr class="tr-menu-depth3">
                  <td>기관별 요약 보드</td>
                  <td>
                    <div class="checkbox">
                      <input type="checkbox" />
                    </div>
                  </td>
                </tr>*/}
                  </tbody>
                </table>
              </div>
              <div className="pagination-wrap">
                <ul className="pagination pagination-rounded">
                  <li className="page-item paginate_button previous disabled">
                    <a className="page-link" href="#">
                      <i className="mdi mdi-chevron-left" />
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      5
                    </a>
                  </li>
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      12
                    </a>
                  </li>
                  <li className="page-item paginate_button next">
                    <a className="page-link" href="#">
                      <i className="mdi mdi-chevron-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authority;
