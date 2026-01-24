import Layout from "@/components/Layout";
import EditableContext from "./EditableContex";
import DrawerComponent from "@/components/DrawerComponent";
import { Button } from "antd";
import { useState } from "react";

const StuManage: React.FC = () => {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  

  // 处理选中项变化
  const handleSelectChange = (keys: string[]) => {
    setSelectedKeys(keys);
  };

  // 打开 Drawer
  const openDrawer = () => {
    setDrawerStatus(true);
  };

  // 关闭 Drawer
  const closeDrawer = () => {
    setDrawerStatus(false);
  };

  return (
    <Layout>
      <div className="button-container">
        <Button
          type="primary"
          onClick={openDrawer}
          className="primary-button import-button"
        >
          添加学生
        </Button>
        <Button
          type="primary"
          onClick={() => console.log("父组件中选中项:", selectedKeys)}
          className="primary-button import-button"
        >
          删除
        </Button>
      </div>
      <EditableContext onSelectChange={handleSelectChange} selectedData={selectedKeys} />
      <DrawerComponent drawerStatus={drawerStatus} onClose={closeDrawer} />
    </Layout>
  );
};

export default StuManage;
