export interface Column<T> {
  key: keyof T;
  value: string | JSX.Element;
}

export interface SearchParam<T> {
  field: keyof T;
  query: string;
}
