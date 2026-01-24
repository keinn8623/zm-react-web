import React, { useState, useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';

const DrawerComponent: React.FC<{ drawerStatus: boolean; onClose?: () => void;}> = ({ drawerStatus, onClose }) => {
  const [open, setOpen] = useState(drawerStatus);

  // 监听 drawerStatus 变化
  useEffect(() => {
    setOpen(drawerStatus);
  }, [drawerStatus]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <Drawer
        title="添加学生"
        size={720}
        onClose={handleClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleClose} type="primary">
              提交
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" requiredMark={false}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
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
                {/* <Input type="number" placeholder="请输入年龄" /> */}
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
                name="class"
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
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerComponent;