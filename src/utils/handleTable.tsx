import React, { Key, ReactNode, useState } from 'react';
import { Input, Button, TablePaginationConfig } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';
import { FilterValue, SortOrder } from 'antd/es/table/interface';

interface UseTableFeature {
  handleTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: { 
      columnKey?: string; 
      field?: string;
      order?: SortOrder;
      } | undefined 
  ) => void;
  handleSearch: (
    selectedKeys: Key[], confirm: () => void 
  ) => void,
  handleReset: (clearFilters: (() => void) | undefined) => void;
  generateColumn: (
    dataIndex: string,
    title: string,
    render?: (text: any, record: any) => ReactNode
  ) => ColumnType<any>;
}


export const useTableFeatures = (): UseTableFeature => {
  const [sortedInfo, setSortedInfo] = useState<{columnKey?: string, field?: string, order?: SortOrder}>({});
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [searchText, setSearchText] = useState<string>('');


  const handleTableChange: UseTableFeature['handleTableChange'] = (pagination, filters, sorter) => {
    setSortedInfo(sorter || {});
    setFilteredInfo(filters);
  };

  const handleSearch: UseTableFeature['handleSearch'] = (selectedKeys, confirm) => {
    confirm();
    const searchString = selectedKeys[0] !== undefined ? String(selectedKeys[0]) : '';
    setSearchText(searchString);
  };

  const handleReset: UseTableFeature['handleReset'] = (clearFilters) => {
    if (clearFilters) clearFilters();
    setSearchText('');
  };

  const generateColumn: UseTableFeature['generateColumn'] = (dataIndex, title, render = undefined) => ({
    title,
    dataIndex,
    key: dataIndex,
    sorter: (a, b) => (a[dataIndex] as string).localeCompare(b[dataIndex]),
    sortOrder: sortedInfo.columnKey === dataIndex ? sortedInfo.order: undefined,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => (record[dataIndex] as string).toLowerCase().includes((value as string).toLowerCase()),
    render,
  });

  return { handleTableChange, handleSearch, handleReset, generateColumn };
};