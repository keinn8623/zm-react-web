import React from 'react';
import Layout from '@/components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="about">
        <div className="container">
          <h1>关于我们</h1>
          <p>这是一个使用 React + TypeScript + Vite 构建的项目</p>
          <p>包含了完整的项目架构和基础组件</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;