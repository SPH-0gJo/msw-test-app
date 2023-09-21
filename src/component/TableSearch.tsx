import React, { useState } from "react";
import Button from "@/component/ui-components/Button";
import { Option } from "@/shared/type/select";
interface TableSearchProps {
  optionList: Option[];
  onSubmit: (selectVal: string, inputVal: string) => void;
}

const TableSearch = function ({ optionList, onSubmit }: TableSearchProps) {
  //Select 태그 값
  const initSelectVal = optionList.length > 0 ? optionList[0].value : "";
  const [selectVal, setSelectVal] = useState(initSelectVal);

  //Input 태그 값
  const [inputVal, setInputVal] = useState("");

  return (
    <>
      {/* Search Select */}
      <select
        onChange={(e) => {
          setSelectVal(e.target.value);
        }}
        name=""
        id=""
      >
        {optionList.map((opt) => {
          return (
            <option selected={opt.value === selectVal} value={opt.value}>
              {opt.title}
            </option>
          );
        })}
      </select>
      {/* Search Input */}
      <input
        value={inputVal}
        type="search"
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
      />
      {/* Search Button */}
      <Button
        onClick={() => {
          onSubmit(selectVal, inputVal);
        }}
      >
        <i className="fe-search" />
      </Button>
    </>
  );
};

export default React.memo(TableSearch);
