import React from "react";
import PageNext from "./PageNext";

const Pagination = function () {
  return (
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
        <PageNext />
        {/* <li className="page-item paginate_button next">
          <a className="page-link" href="#">
            <i className="mdi mdi-chevron-right" />
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Pagination;
