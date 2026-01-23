import React from "react";
import { Breadcrumb } from "antd";


const Header: React.FC = () => {
  return (
    <header className="header">
      <Breadcrumb separator="/">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    </header>
  );
};

export default Header;
