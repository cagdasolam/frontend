import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ProductTable } from "../components/ProductTable";
import { Company } from "../types/Company";
import { Product } from "../types/Product";

const { Option } = Select;
const { Title } = Typography;

const companyData = localStorage.getItem("companies");
const companiesArray: Company[] = companyData ? JSON.parse(companyData) : [];

const productData = localStorage.getItem("products");
const ProductsArray: Product[] = productData ? JSON.parse(productData) : [];

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>(ProductsArray);
  const [companies, setCompanies] = useState<Company[]>(companiesArray);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCompanies = () => {
      setLoading(true);
      const companies = localStorage.getItem("companies");
      setCompanies(companies ? JSON.parse(companies) : []);
      setLoading(false);
    };

    const fetchProducts = () => {
      setLoading(true);
      const products = localStorage.getItem("products");
      setProducts(products ? JSON.parse(products) : []);
      setLoading(false);
    };

    fetchCompanies();
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
    form.setFieldsValue(product);
  };

  const handleRemove = async (productId: number) => {
    try {
      const newProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(newProducts);
      message.success("Product removed successfully");
    } catch (error) {
      console.error("Error removing product:", error);
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
        console.log("company:", values.company);
        const updatedProduct = {
          ...selectedProduct,
          ...values,
          company: companies.find((company) =>
            company.id === values.company.id
              ? values.company.id
              : values.company
          ),
        };
        const newProducts = products.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
        localStorage.setItem("products", JSON.stringify(newProducts));
        setProducts(newProducts);
        message.success("Product updated successfully");
      } else {
        console.log("Add product:", values);
        const newProduct = {
          ...values,
          company: companies.find((company) => company.id === values.company),
          id: products.length + 1,
        };
        console.log("New product:", newProduct);
        const newProducts = [...products, newProduct];
        localStorage.setItem("products", JSON.stringify(newProducts));
        setProducts(newProducts);
        message.success("Product added successfully");
      }

      handleModalClose();
    } catch (error) {
      console.error("Error adding/editing product:", error);
    }
  };

  return (
    <div>
      <Row align={"middle"} justify={"space-between"}>
        <Col>
          <Title level={2}>Products</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginRight: "16px" }}
            onClick={() => setModalVisible(true)}
          >
            Add New Product
          </Button>
        </Col>
      </Row>
      <ProductTable
        products={products}
        loading={loading}
        pagination={{ pageSize: 10 }}
        actions={true}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
      />

      <Modal
        title={selectedProduct ? "Edit Product" : "Add New Product"}
        open={modalVisible}
        onCancel={handleModalClose}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddEditProduct}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Product Category"
            rules={[
              { required: true, message: "Please enter product category" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Product Amount"
            rules={[{ required: true, message: "Please enter product amount" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amountUnit"
            label="Amount Unit"
            rules={[{ required: true, message: "Please enter amount unit" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please select a company" }]}
          >
            <Select placeholder="Select a company">
              {companies.map((company: Company) => (
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
