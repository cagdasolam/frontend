import { Card, Row, Col, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { CompanyTable } from '../components/CompanyTable';
import { ProductTable } from '../components/ProductTable';
import { Company } from '../types/Company';
import { Product } from '../types/Product';

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


const HomePage = () => {
  const [companyCount, setCompanyCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [companies, setCompanies] = useState<Company[]>(companiesArray);
  const [latestCompanies, setLatestCompanies] = useState<Company[]>(companiesArray);
  const [highestAmountProduct, setHighestAmountProduct] = useState([]);
  const [countByCountry, setCountByCountry] = useState([]);
  const [countByCompany, setCountByCompany] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect (() => {
    const getCompanyCount = () =>{
        setCompanyCount(companies.length);
    }

    const getProductCount = () =>{
        setProductCount(ProductsArray.length);
    }

    const getLatestCompanies = () =>{
        setLatestCompanies(companies.length < 3 ? companies : companies.slice(Math.max(companies.length - 3, 0)));
    }




    getCompanyCount();
    getProductCount();
    getLatestCompanies();

  }, [companies]);


  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={32}>
        <Col span={12}>
          <Card title="Company Overview" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic title="Numbers of companies in the system" value={companyCount} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Product Overview" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic title="Numbers of products in the system" value={productCount} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Latest Added Companies" style={{ marginBottom: '20px' }}>
            <CompanyTable
                companies={latestCompanies}
                loading={loading}
                pagination={false}
                actions={false}
                handleEdit={() => {}}
                handleRemove={() => {}}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Highest Amount Products" style={{ marginBottom: '20px' }}>
                <ProductTable 
                    products={highestAmountProduct} 
                    loading={loading} 
                    pagination={false} 
                    actions={false}
                    handleEdit={() => {}}
                    handleRemove={() => {}}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;