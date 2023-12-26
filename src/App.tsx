import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

import Navbar from './components/Navbar';
import Companypage from './pages/CompanyPage';
import ProductPage from './pages/ProductPage';

const { Content } = Layout;

function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <BrowserRouter>
      <Layout>
        <Navbar currentPath={currentPath} setCurrentPath={setCurrentPath}/>
        <Content>
          <Routes>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/companies" element={<Companypage />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/" element={<Navigate to="/companies" />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
