import Layout from "@/components/Layout";
import EditableContext from "./StuEditableContex";
import DrawerComponent from "@/components/DrawerComponent";
import AdvancedSearchForm from "@/pages/stuManage/AdvancedSearchForm";
import { Button, message } from "antd";
import { useState } from "react";

const StuManage: React.FC = () => {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  

  // 处理选中项变化
  const handleSelectChange = (keys: string[]) => {
    setSelectedKeys(keys);
  };

  // 删除选中项
  const deleteSelected = () => {
    if (selectedKeys.length === 0) {
      message.warning("请选择要删除的学生");
      return;
    }
    message.success(`成功删除 ${selectedKeys.length} 个学生`);
    setSelectedKeys([]);
  }

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
      {/* <div className="button-container">
        <Button
          type="primary"
          onClick={openDrawer}
          className="primary-button import-button"
        >
          添加学生
        </Button>
        <Button
          type="primary"
          onClick={deleteSelected}
          className="primary-button import-button"
        >
          删除
        </Button>
      </div>
      <EditableContext onSelectChange={handleSelectChange} selectedData={selectedKeys} />
      <DrawerComponent drawerStatus={drawerStatus} onClose={closeDrawer} /> */}
      <AdvancedSearchForm />
    </Layout>
  );
};

export default StuManage;
