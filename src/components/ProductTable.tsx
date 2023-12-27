import { Table, Button, Space, TablePaginationConfig } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTableFeatures } from '../utils/handleTable';
import { Product } from '../types/Product.js';
import { Company } from '../types/Company';

type Props = {
    products: Product[];
    loading: boolean;
    pagination: false | TablePaginationConfig;
    actions: boolean;
    handleEdit: (product: any) => void;
    handleRemove: (productId: number) => void;
    }

const ProductTable = (props: Props) => {
  const { handleTableChange, generateColumn } = useTableFeatures();

  const columns = [
    generateColumn('name', 'Product Name'),
    generateColumn('category', 'Category'),
    generateColumn('amount', 'Amount'),
    generateColumn('amountUnit', 'Amount Unit'),
    generateColumn('company', 'Company Name', (record: Company) => {
      return record.name;
    }, (a: Company, b: Company) => a.name.localeCompare(b.name)
    )
  ];

  if (props.actions) {
    columns.push(
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Space size="middle">
            <Button ghost type='primary' icon={<EditOutlined />} onClick={() => props.handleEdit(record)}>
              Edit
            </Button>
            <Button danger icon={<DeleteOutlined />} onClick={() => props.handleRemove(record.id)}>
              Remove
            </Button>
          </Space>
        ),
      },)
  };

  return (
    <Table
      columns={columns}
      dataSource={props.products}
      loading={props.loading}
      rowKey="id"
      pagination={props.pagination}
      onChange={handleTableChange} />
  );
}

export { ProductTable };