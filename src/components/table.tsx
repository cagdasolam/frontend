import { Table, Button, Space, SpinProps, TablePaginationConfig } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { UseTableFeature, useTableFeatures } from '../utils/handleTable.jsx';
import { Company } from '../types/Company.js';

type Props = { 
    companies: Company[];
    loading: boolean | SpinProps;
    pagination: false | TablePaginationConfig;
    actions: boolean;
    handleEdit: (company: Company) => void;
    handleRemove: (companyId: number) => void;
}

const CompanyTable = (props: Props) => {
  const { handleTableChange, handleSearch, handleReset, generateColumn }: UseTableFeature = useTableFeatures();

  const columns = [
    generateColumn('name', 'Company Name'),
    generateColumn('legalNumber', 'Company Legal Number'),
    generateColumn('incorporationCountry', 'Incorporation Country'),
    generateColumn('website', 'Website'),
  ];

  if (props.actions) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button ghost type="primary" icon={<EditOutlined />} onClick={() => props.handleEdit(record)}>Edit</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => props.handleRemove(record._id)}>Remove</Button>
        </Space>
      ),
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={props.companies}
      loading={props.loading}
      rowKey="_id"
      pagination={props.pagination}
      onChange={handleTableChange}
    />
  );

};

export { CompanyTable };