import React, { useState } from "react";
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

const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [createStatus, setCreateStatus] = useState(false);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const getFields = () => {
    const children: React.ReactNode[] = [];
    children.push(
      <Col span={8}>
        <Form.Item
          name="name"
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
          />
        </Form.Item>
      </Col>,
    );
    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
            <Button type="primary" htmlType="submit">
              删除
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                // 重置DatePicker
                DatePicker.RangePicker.value = null;
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
    </>
  );
};

const App: React.FC = () => {
  const { token } = theme.useToken();

  const listStyle: React.CSSProperties = {
    lineHeight: "200px",
    textAlign: "center",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

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

  return (
    <>
      <AdvancedSearchForm />
      <div style={listStyle}>
        Search Result List  // TODO 使用Context处理多层组件中传递数据
        <StuEditableContext onSelectChange={handleSelectChange} selectedData={selectedKeys} />
      </div>
    </>
  );
};

export default App;
