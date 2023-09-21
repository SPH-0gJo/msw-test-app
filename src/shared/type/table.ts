export type Column = {
  key: string;
  value: string | JSX.Element;
};

export interface SearchParam {
  field: string;
  query: string;
}
