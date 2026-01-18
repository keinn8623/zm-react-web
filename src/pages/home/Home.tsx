import React from 'react';
import Layout from '@/components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="home">
        <div className="container">
          <h1>欢迎来到 React 应用</h1>
          <p>这是一个基础的 React 项目架构示例</p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;