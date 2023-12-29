import { Table, Button, Space, TablePaginationConfig } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTableFeatures } from "../utils/handleTable";
import { ColumnType } from "../types/ColumnType";

type Props<T> = {
  dataSource: T[];
  loading: boolean;
  pagination: false | TablePaginationConfig;
  actions: boolean;
  handleEdit: (product: any) => void;
  handleRemove: (productId: number) => void;
  columns: ColumnType<T>[];
};

const GenericTable = <T extends {}>(props: Props<T>) => {
  const { handleTableChange, generateColumn } = useTableFeatures();

  const columns = props.columns.map((column) => {
    if (column.sorter) {
      return generateColumn(
        column.key,
        column.title,
        column.render,
        column.sorter
      );
    } else {
      return generateColumn(column.key, column.title, column.render);
    }
  });

  if (props.actions) {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            ghost
            type="primary"
            icon={<EditOutlined />}
            onClick={() => props.handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => props.handleRemove(record.id)}
          >
            Remove
          </Button>
        </Space>
      ),
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      rowKey="id"
      pagination={props.pagination}
      onChange={handleTableChange}
    />
  );
};

export { GenericTable };
