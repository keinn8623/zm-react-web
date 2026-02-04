import React, { useState, useContext } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Checkbox } from 'antd';

interface DataType {
  key: string;
  name: string;
  campus: string;
  grade: string;
  class: string;
  phone: string;
  checked: boolean;
}

const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i.toString(),
  name: `Edward ${i}`,
  campus: `Campus ${i}`,
  grade: `Grade ${i}`,
  class: `Class ${i}`,
  phone: `1380000000${i}`,
  checked: false,
}));

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: DataType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber size="small" style={{ textAlign: 'center' }} /> : <Input size="small" style={{ textAlign: 'center' }} />;

  return (
    <td {...restProps} style={{ textAlign: 'center' }}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0, textAlign: 'center' }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const StuEditableContext: React.FC<{ onSelectChange: (keys: string[]) => void; selectedData: string[] }> = ({ onSelectChange }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>(originData);
  const [editingKey, setEditingKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Partial<DataType>;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        // 为新添加的行设置默认 checked 状态
        newData.push({ ...row as DataType, checked: false });
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox 
          indeterminate={(() => {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = currentPage * pageSize;
            const currentPageData = data.slice(startIndex, endIndex);
            return currentPageData.some(item => item.checked) && !currentPageData.every(item => item.checked);
          })()}
          checked={(() => {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = currentPage * pageSize;
            const currentPageData = data.slice(startIndex, endIndex);
            return currentPageData.length > 0 && currentPageData.every(item => item.checked);
          })()}
          onChange={(e) => {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = currentPage * pageSize;
            const newData = data.map((item, index) => {
              if (index >= startIndex && index < endIndex) {
                return { ...item, checked: e.target.checked };
              }
              return item;
            });
            setData(newData);
            // 输出已勾选的 key
            const checkedKeys = newData.filter(item => item.checked).map(item => item.key);
            console.log('已勾选的 key:', checkedKeys);
            // 调用父组件的选中项变化处理函数
            onSelectChange(checkedKeys);
          }}
        >
        </Checkbox>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: '5%',
      align: 'center',
      render: (_: boolean, record: DataType) => (
        <Checkbox 
          checked={record.checked}
          onChange={(e) => {
            const newData = data.map(item => 
              item.key === record.key ? { ...item, checked: e.target.checked } : item
            );
            setData(newData);
            // 输出已勾选的 key
            const checkedKeys = newData.filter(item => item.checked).map(item => item.key);
            console.log('已勾选的 key:', checkedKeys);
            // 调用父组件的选中项变化处理函数
            onSelectChange(checkedKeys);
          }}
        />
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '15%',
      align: 'center',
      editable: true,
    },
    {
      title: '校区',
      dataIndex: 'campus',
      width: '15%',
      align: 'center',
      editable: true,
    },
    {
      title: '年级',
      dataIndex: 'grade',
      width: '15%',
      align: 'center',
      editable: true,
    },
    {
      title: '班级',
      dataIndex: 'class',
      width: '15%',
      align: 'center',
      editable: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: '15%',
      align: 'center',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '10%',
      align: 'center',
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps<DataType>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      align: 'center',
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <Form form={form} component={false}>
        <Table<DataType>
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          size="small"
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          scroll={{ y: 480 }}
          pagination={{
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
              cancel();
            },
            current: currentPage,
            pageSize: pageSize,
            size: "small",
          }}
        />
      </Form>
    </div>
  );
};

export default StuEditableContext;
