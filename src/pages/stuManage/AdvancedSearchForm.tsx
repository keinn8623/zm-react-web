import React, { useState, createContext, useContext, useRef } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  theme,
  DatePicker,
  message,
} from "antd";
import CreateFormComponent from "@/components/CreateFormComponent";
import StuEditableContext from "./StuEditableContex";

const SelectedContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>, any, React.Dispatch<React.SetStateAction<any>>]>([[], () => {}, {}, () => {}]);

const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [createStatus, setCreateStatus] = useState(false);
  const [selectedKeys, setSelectedKeys, searchParams, setSearchParams] = useContext(SelectedContext);
  const stuEditableRef = useRef<any>(null);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  // 删除选中项
  const deleteSelected = () => {
    console.log("==============AdvancedSearchForm deleteSelected 函数被调用==============")
    console.log("选中的 keys:", selectedKeys)
    console.log("stuEditableRef.current:", stuEditableRef.current)
    
    if (selectedKeys.length === 0) {
      message.warning("请选择要删除的学生");
      return;
    }
    // 调用 StuEditableContext 组件的 deleteSelected 方法
    if (stuEditableRef.current) {
      console.log("==============准备调用 StuEditableContext 的 deleteSelected 方法==============")
      stuEditableRef.current.deleteSelected(selectedKeys);
      // 清空选中状态
      setSelectedKeys([]);
    } else {
      console.error("stuEditableRef.current 为空，无法调用 deleteSelected 方法")
    }
  }

  // 处理选中项变化
  const handleSelectChange = (keys: string[]) => {
    console.log("==============AdvancedSearchForm handleSelectChange 函数被调用==============")
    console.log("选中的 keys:", keys)
    setSelectedKeys(keys);
  }

  const getFields = () => {
    const children: React.ReactNode[] = [];
    children.push(
      <Col span={8}>
        <Form.Item
          name="stuName"
          label="姓名"
          rules={[
            {
              required: false,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item
          name="campus"
          label="校区"
          rules={[
            {
              required: false,
              message: "Select something!",
            },
          ]}
          initialValue=""
        >
          <Select
            options={[
              {
                value: "1",
                label: "大坪",
              },
              {
                value: "2",
                label: "红旗河沟",
              },
            ]}
          />
        </Form.Item>
      </Col>,
      <Col span={8}>
        <Form.Item
          name="grade"
          label="年级"
          rules={[
            {
              required: false,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item
          name="class"
          label="班级"
          rules={[
            {
              required: false,
              message: "Select something!",
            },
          ]}
          initialValue=""
        >
          <Select
            options={[
              {
                value: "1",
                label: "11111",
              },
              {
                value: "2",
                label: "222",
              },
            ]}
          />
        </Form.Item>
      </Col>,
      <Col span={8} style={{ display: "flex", flexDirection: "column" }}>
        <Form.Item
          name="date"
          label="日期"
          rules={[
            {
              required: false,
              message: "Select something!",
            },
          ]}
        >
          <DatePicker.RangePicker
            placeholder={["Start Date", "至今"]}
            allowEmpty={[true, true]}
            allowClear={true}
            onChange={(date, dateString) => {
              console.log(date, dateString);
            }}
            // 时区设置为上海（UTC+8）
            // Ant Design 的 DatePicker 默认使用本地时区，这里确保使用上海时区
          />
        </Form.Item>
      </Col>,
    );
    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    // 更新搜索参数
    setSearchParams(values);
  };

  // 删除选中项
  const handleDeleteSelected = () => {
    if (selectedKeys.length === 0) {
      message.warning("请选择要删除的学生");
      return;
    }
    console.log("StuEditableContext中勾选的数据:", selectedKeys);
    message.success(`成功删除 ${selectedKeys.length} 个学生`);
  };

  return (
    <>
      <Form
        form={form}
        name="advanced_search"
        style={formStyle}
        onFinish={onFinish}
      >
        <Row gutter={24}>{getFields()}</Row>
        <div style={{ textAlign: "center" }}>
          <Space size="small">
            <Button type="primary" onClick={() => setCreateStatus(true)}>
              新增
            </Button>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button type="primary" onClick={deleteSelected}>
              删除
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Space>
        </div>
      </Form>
      <CreateFormComponent
        open={createStatus}
        onClose={() => setCreateStatus(false)}
      />
      <div style={listStyle}>
        <StuEditableContext 
          ref={stuEditableRef}
          onSelectChange={handleSelectChange} 
          selectedData={selectedKeys} 
          searchParams={searchParams}
        />
      </div>
    </>
  );
};

const listStyle: React.CSSProperties = {
  textAlign: "center",
  background: "#f5f5f5",
  borderRadius: "8px",
  marginTop: 16,
  padding: 16,
  boxSizing: "border-box",
};



const App: React.FC = () => {
  const { token } = theme.useToken();

  const listStyle: React.CSSProperties = {
    textAlign: "center",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
    padding: 16,
    boxSizing: "border-box",
  };
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<any>({});

  

  // 处理选中项变化
  const handleSelectChange = (keys: string[]) => {
    setSelectedKeys(keys);
  };

  return (
    <SelectedContext.Provider value={[selectedKeys, setSelectedKeys, searchParams, setSearchParams]}>
      <AdvancedSearchForm />
    </SelectedContext.Provider>
  );
};

export default App;
