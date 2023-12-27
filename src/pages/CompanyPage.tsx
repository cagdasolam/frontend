import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Typography, Row, Col } from 'antd';
import { PlusOutlined, } from '@ant-design/icons';

import { CompanyTable } from '../components/CompanyTable';
import { Company } from '../types/Company';

const { Title } = Typography;

const companiesArray: Company[] = 
[
    {
    id: 1,
    name: 'Company 1',
    legalNumber: '123456789',
    incorporationCountry: 'Canada',
    website: 'www.company1.com',
    },
    {
    id: 2,
    name: 'Company 2',
    legalNumber: '987654321',
    incorporationCountry: 'Canada',
    website: 'www.company2.com',
    },
];


const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>(companiesArray);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (company: Company) => {
    console.log('Edit company:', company);
    setSelectedCompany(company);
    setModalVisible(true);
    form.setFieldsValue(company);
  };

  const handleRemove = async (companyId: number) => {
    try {

			const newCompanies = companies.filter((company) => company.id !== companyId);
      console.log('Remove company:', companyId);
			setCompanies(newCompanies);
      message.success('Company removed successfully');
    } catch (error) {
      console.error('Error removing company:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCompany(null);
    form.resetFields();
  };

  const handleAddCompany = async (values: any) => {
    try {
      if (selectedCompany) {
        const updatedCompany = { ...selectedCompany, ...values };
				// change the exist company
				const newCompanies = companies.map((company) => {
					if (company.id === updatedCompany.id) {
						return updatedCompany;
					}
					return company;});
				setCompanies(newCompanies);;
        message.success('Company updated successfully');
      } else {        
        // create new company from values assign new id add to companies array
        
        const newCompany = { id: companies.length + 1, ...values };
        const newCompanies = [...companies, newCompany];
        setCompanies(newCompanies);
        console.log('Add new company:', newCompany);
        message.success('Company added successfully');
      }
      handleModalClose();
    } catch (error) {
      console.error('Error adding new company:', error);
    }
  };

  return (
    <div>
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <Title level={2}>Companies</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '16px' }} onClick={() => setModalVisible(true)}>
            Add New Company
          </Button>
        </Col>
      </Row>
			<CompanyTable companies={companies} loading={loading} actions={true} handleEdit={handleEdit} handleRemove={handleRemove} pagination={{ pageSize: 10 }} />

      <Modal
        title={selectedCompany ? 'Edit Company' : 'Add New Company'}
        open={modalVisible}
        onCancel={handleModalClose}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddCompany}>
          <Form.Item name="name" label="Company Name" rules={[{ required: true, message: 'Please enter company name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="legalNumber" label="Company Legal Number" rules={[{ required: true, message: 'Please enter company legal number' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="incorporationCountry" label="Incorporation Country" rules={[{ required: true, message: 'Please enter incorporation country' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website" rules={[{ required: true, message: 'Please enter website' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyList;