export type ColumnType<T> = {
    title: string;
    key: string;
    render?: (text: any, record: T) => React.ReactNode;
    sorter?: boolean | ((a: T, b: T) => number);
  };
