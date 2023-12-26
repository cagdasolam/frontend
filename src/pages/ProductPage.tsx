import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, message, Typography, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProductTable } from '../components/ProductTable';
import { Company } from '../types/Company';
import { Product } from '../types/Product';


const { Option } = Select;
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

const ProductsArray: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    category: 'Category 1',
    amount: 10,
    amountUnit: 'kg',
    company: companiesArray[0],
  },
  {
    id: 2,
    name: 'Product 2',
    category: 'Category 2',
    amount: 2,
    amountUnit: 'kg',
    company: companiesArray[1],
  },
];

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>(ProductsArray);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [form] = Form.useForm();


  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    form.setFieldsValue(product);
  };

  const handleRemove = async (productId: number) => {
    try {
      const newProducts = products.filter((product) => product.id !== productId);
      setProducts(newProducts);
      message.success('Product removed successfully');
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedProduct(null);
    form.resetFields();
  };

  const handleAddEditProduct = async (values: any) => {
    try {
      if (selectedProduct) {
        const updatedProduct = { ...selectedProduct, ...values };
        const newProducts = products.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
        setProducts(newProducts);
        message.success('Product updated successfully');
      } else {
        console.log('Add product:', values);
        const newProduct = {
          ...values,
          id: ProductsArray.length + 1,
        };
        const newProducts = [...products, newProduct];
        setProducts(newProducts);
        message.success('Product added successfully');
      }

      handleModalClose();
    } catch (error) {
      console.error('Error adding/editing product:', error);
    }
  };



  return (
    <div>
      <Row align={'middle'} justify={'space-between'}>
        <Col>
          <Title level={2}>Products</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '16px' }} onClick={() => setModalVisible(true)}>
            Add New Company
          </Button>
        </Col>
      </Row>
      <ProductTable products={products} companies={companiesArray} loading={loading} pagination={{ pageSize: 10 }} actions={true} handleEdit={handleEdit} handleRemove={handleRemove} />

      <Modal
        title={selectedProduct ? 'Edit Product' : 'Add New Product'}
        open={modalVisible}
        onCancel={handleModalClose}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddEditProduct}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Product Category"
            rules={[{ required: true, message: 'Please enter product category' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Product Amount"
            rules={[{ required: true, message: 'Please enter product amount' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amountUnit"
            label="Amount Unit"
            rules={[{ required: true, message: 'Please enter amount unit' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select a company' }]}
          >
            <Select placeholder="Select a company">

              {companiesArray.map((company: Company) => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}

            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductPage;