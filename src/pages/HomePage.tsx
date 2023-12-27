import { Card, Row, Col, Statistic } from "antd";
import { useEffect, useState } from "react";
import { CompanyTable } from "../components/CompanyTable";
import { ProductTable } from "../components/ProductTable";
import { Company } from "../types/Company";
import { Product } from "../types/Product";
import {
  IncorporationCountryChart,
  ProductGroupByCompanyChart,
} from "../components/ChartComponent";

const HomePage = () => {
  const [companyCount, setCompanyCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [latestCompanies, setLatestCompanies] = useState<Company[]>([]);
  const [highestAmountProduct, setHighestAmountProduct] = useState<Product[]>(
    []
  );
  const [countByCountry, setCountByCountry] = useState<Record<string, number>>(
    {}
  );
  const [countByCompany, setCountByCompany] = useState<Record<string, number>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const companyData = localStorage.getItem("companies");
    const companiesArray: Company[] = companyData
      ? JSON.parse(companyData)
      : [];

    const productData = localStorage.getItem("products");
    const ProductsArray: Product[] = productData ? JSON.parse(productData) : [];

    setLoading(true);
    setCompanies(companiesArray);
    setProducts(ProductsArray);
    setLoading(false);
  }, []);

  useEffect(() => {
    const getCompanyCount = () => {
      setCompanyCount(companies.length);
    };
    const getLatestCompanies = () => {
      setLatestCompanies(
        companies.length < 3
          ? companies
          : companies.slice(Math.max(companies.length - 3, 0))
      );
    };
    const getCompanyCountByCountry = () => {
      const countByCountryRecord = companies.reduce(
        (acc: Record<string, number>, company) => {
          acc[company.incorporationCountry] =
            (acc[company.incorporationCountry] || 0) + 1;
          return acc;
        },
        {}
      );

      setCountByCountry(countByCountryRecord);
    };

    setLoading(true);
    getCompanyCountByCountry();
    getCompanyCount();
    getLatestCompanies();
    setLoading(false);
  }, [companies]);

  useEffect(() => {
    const getProductCount = () => {
      setProductCount(products.length);
    };
    const getHighestAmountProduct = () => {
      setHighestAmountProduct(
        products.sort((a, b) => b.amount - a.amount).slice(0, 3)
      );
    };

    const getProductCountByCompany = () => {
      const countByCompanyRecord = products.reduce(
        (acc: Record<string, number>, product) => {
          acc[product.company.name] = (acc[product.company.name] || 0) + 1;
          return acc;
        },
        {}
      );

      setCountByCompany(countByCompanyRecord);
    };

    setLoading(true);
    getProductCountByCompany();
    getProductCount();
    getHighestAmountProduct();
    setLoading(false);
  }, [products]);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={32}>
        <Col span={12}>
          <Card title="Company Overview" style={{ marginBottom: "20px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Numbers of companies in the system"
                    value={companyCount}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Product Overview" style={{ marginBottom: "20px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Numbers of products in the system"
                    value={productCount}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Latest Added Companies" style={{ marginBottom: "20px" }}>
            <CompanyTable
              companies={latestCompanies}
              loading={loading}
              pagination={false}
              actions={false}
              handleEdit={() => {}}
              handleRemove={() => {}}
            />
          </Card>
          <Col span={24}>
            <IncorporationCountryChart record={countByCountry} />
          </Col>
        </Col>

        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card
                title="Highest Amount Products"
                style={{ marginBottom: "20px" }}
              >
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
            <Col span={24}>
              <ProductGroupByCompanyChart record={countByCompany} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
