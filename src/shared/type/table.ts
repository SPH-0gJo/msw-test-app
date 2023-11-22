//Table의 컬럼 정의
export interface Column<T> {
  key: keyof T;
  value: string | JSX.Element;
  width?: string;
}

//TableSearch 검색 Param 정의
export interface SearchParam<T> {
  field: keyof T;
  query: string;
}
