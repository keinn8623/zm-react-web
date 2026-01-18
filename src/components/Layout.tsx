import React from 'react';
import type { ReactNode } from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
// import Header from './Header';
import Footer from './Footer';

const { SubMenu } = Menu;
const { Sider, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <AntLayout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
            {collapsed ? <span>111</span> : <span>卓鸣课堂</span>}
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={[]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title={
              <span> 
                <span>人员管理</span>
              </span>
            }
          >
            <Menu.Item key="5" icon={<UserOutlined />}>学生管理</Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>教师管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<VideoCameraOutlined />}
            title={
              <span>
                <span>考试管理</span>
              </span>
            }
          >
            <Menu.Item key="9" icon={<UploadOutlined />}>成绩录入</Menu.Item>
            <Menu.Item key="10" icon={<VideoCameraOutlined />}>成绩分析</Menu.Item>
            <Menu.Item key="11" icon={<UploadOutlined />}>生成错题</Menu.Item>
          </SubMenu>
          <Menu.Item key="12" icon={<UploadOutlined />}>操作日志</Menu.Item>
        </Menu>
      </Sider>
      <AntLayout>
        <AntLayout.Header style={{ background: '#fff', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '16px' }}>
          <div onClick={toggle} style={{ cursor: 'pointer' }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </AntLayout.Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Footer />
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;