import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Radio, Row, Col, Select } from 'antd';
import axios from 'axios';

interface Values {
  title?: string;
  description?: string;
  modifier?: string;
}

interface CreateFormComponentProps {
  open: boolean;
  onClose: () => void;
}

const CreateFormComponent: React.FC<CreateFormComponentProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<Values>();


  const addStuInfo = async () => {
    try {
      const res = await axios.get('api/stu/add', { params: formValues });
      console.log('表单数据：', formValues);
      console.log('后端返回的数据：', res.data);
    } catch (error) {
      console.log('请求失败：', error);
    }
  };

  useEffect(() => {
    if (formValues) {
      addStuInfo();
    }
  }, [formValues]);
  

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values);
    setFormValues(values); // 只设置状态，不直接调用 addStuInfo
    onClose();
  };

  return (
    <Modal
      open={open}
      title="新增学生"
      okText="创建"
      cancelText="取消"
      okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
      onCancel={onClose}
      destroyOnHidden
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="stuName"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="grade"
            label="年级"
            rules={[{ required: true, message: '请输入年级' }]}
          >
            <Select
              placeholder="请选择年级"
              options={[
                { label: '一年级', value: 'grade1' },
                { label: '二年级', value: 'grade2' },
                { label: '三年级', value: 'grade3' },
                { label: '四年级', value: 'grade4' },
                { label: '五年级', value: 'grade5' },
                { label: '六年级', value: 'grade6' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="campus"
            label="校区"
            rules={[{ required: true, message: '请选择校区' }]}
          >
            <Select
              placeholder="请选择校区"
              options={[
                { label: '红旗河沟校区', value: 'campus1' },
                { label: '大坪校区', value: 'campus2' },
                { label: '大学城校区', value: 'campus3' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="clazz"
            label="班级"
            rules={[{ required: true, message: '请选择班级' }]}
          >
            <Select
              placeholder="请选择班级"
              options={[
                { label: '高一(1)班', value: 'class1' },
                { label: '高一(2)班', value: 'class2' },
                { label: '高一(3)班', value: 'class3' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: '请输入电话' }]}
          >
            <Input placeholder="请输入电话" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="teacher"
            label="老师"
            rules={[{ required: true, message: '请输入老师姓名' }]}
          >
            <Input placeholder="请输入老师姓名" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="备注"
          >
            <Input.TextArea rows={4} placeholder="请输入备注信息" />
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateFormComponent;
