import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useState } from "react";

const { SubMenu } = Menu;

const Header: React.FC = () => {
  const [current, setCurrent] = useState("1");
  
  const handleClick = (e: { key: string }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
            卓鸣课堂
          </Link>
        <div className="header-content">

          <nav className="nav">
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              mode="horizontal"
            >
              <Menu.Item key="1">课程中心</Menu.Item>
              <Menu.Item key="2">师资力量</Menu.Item>
              <Menu.Item key="3">学员评价</Menu.Item>
              <Menu.Item key="4">联系我们</Menu.Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    Navigation Three - Submenu
                  </span>
                }
              >
                <Menu.ItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
