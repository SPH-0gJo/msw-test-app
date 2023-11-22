import React, { useState } from "react";
import Button from "@/component/ui-components/Button";
import { Option } from "@/shared/type/select";

interface TableSearchProps<T> {
  optionList: Option<T>[];
  onSubmit: (selectVal: keyof T, inputVal: string) => void;
}
/**
 * 테이블 검색 화면에서 사용되는 검색 영역 컴포넌트
 * @param param0
 * @returns
 */
const TableSearch = function <T>({
  optionList,
  onSubmit,
}: TableSearchProps<T>) {
  //Select 태그 값
  const initSelectVal = optionList[0].value;
  const [selectVal, setSelectVal] = useState(initSelectVal);

  //Input 태그 값
  const [inputVal, setInputVal] = useState("");

  return (
    <>
      {/* Search Select */}
      <select
        onChange={(e) => {
          setSelectVal(e.target.value as keyof T);
        }}
        name=""
        id=""
      >
        {optionList.map((opt, i) => {
          return (
            <option
              key={`opt-${i}`}
              selected={opt.value === selectVal}
              value={opt.value as string}
            >
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

export default React.memo(TableSearch) as typeof TableSearch;
