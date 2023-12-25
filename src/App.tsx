import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

import Navbar from './components/Navbar';

const { Content } = Layout;

function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <BrowserRouter>
      <Layout>
        <Navbar currentPath={currentPath} setCurrentPath={setCurrentPath}/>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
