//Select 컴포넌트 내부에 존재할 Option 정의
export interface Option<T> {
  value: keyof T;
  title: string;
}
