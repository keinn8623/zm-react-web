import React, { useState, useEffect, useImperativeHandle } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Checkbox, Spin, message } from 'antd';
import axios from 'axios';

interface DataType {
  key: string;
  name: string;
  campus: string;
  grade: string;
  clazz: string;
  phone: string;
  checked: boolean;
}

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

interface StuEditableContextProps {
  onSelectChange: (keys: string[]) => void;
  selectedData: string[];
  searchParams?: any;
  onDeleteSuccess?: () => void;
}

const StuEditableContext: React.FC<StuEditableContextProps> = React.forwardRef(({ onSelectChange, selectedData, searchParams, onDeleteSuccess }, ref) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  // 删除选中项
  const deleteSelected = async (keys: string[]) => {
    if (keys.length === 0) {
      message.warning('请选择要删除的学生');
      return;
    }
    try {
      setLoading(true);
      
      // 发送删除请求到后端接口
      await axios.post('/api/stu/delete', keys);
      message.success(`成功删除 ${keys.length} 个学生`);
      // 调用删除成功回调，刷新数据
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      
      // 刷新当前页面数据
      const fetchData = async () => {
        // 构建查询参数，确保只传递非空值并处理日期范围
        const params = {};
        if (searchParams) {
          Object.entries(searchParams).forEach(([key, value]) => {
            // 跳过空值
            if (value !== undefined && value !== null && value !== '') {
              if (key === 'data' && Array.isArray(value) && value.length === 2) {
                // 处理日期范围，分别赋值给 startTime 和 endTime
                const [startDate, endDate] = value;
                if (startDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const start = new Date(startDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  start.setHours(start.getHours() + 8);
                  params['startTimeStr'] = start.toISOString();
                }
                if (endDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const end = new Date(endDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  end.setHours(end.getHours() + 8);
                  params['endTimeStr'] = end.toISOString();
                }
              } else if (key === 'date' && Array.isArray(value) && value.length === 2) {
                // 处理可能的 date 字段，同样转换为 startTime 和 endTime
                const [startDate, endDate] = value;
                if (startDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const start = new Date(startDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  start.setHours(start.getHours() + 8);
                  params['startTimeStr'] = start.toISOString();
                }
                if (endDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const end = new Date(endDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  end.setHours(end.getHours() + 8);
                  params['endTimeStr'] = end.toISOString();
                }
              } else if (key !== 'data' && key !== 'date') {
                // 处理其他参数
                params[key] = value;
              }
            }
          });
        }
        
        const response = await axios.get('/api/stu/query', {
          params
        });
        // 确保 data 始终是一个数组
        if (Array.isArray(response.data.data)) {
          // 处理后端返回的数据，确保每个数据项都有 key 属性
          const processedData = response.data.data.map((item) => ({
            ...item,
            key: item.stuInfoId,
            // 确保每个数据项都有 checked 属性
            checked: false
          }));
          setData(processedData);
        } else {
          console.error('后端返回的数据格式错误，期望数组:', response.data);
          message.error('数据格式错误，请联系管理员');
          setData([]);
        }
      };
      await fetchData();
    } catch (error) {
      console.error('删除学生数据失败:', error);
      message.error('删除学生数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 暴露删除方法给父组件
  useImperativeHandle(ref, () => ({
    deleteSelected: (keys: string[]) => deleteSelected(keys)
  }));

  // 同步 selectedData 和 data 状态中的 checked 属性
  useEffect(() => {
    if (selectedData) {
      setData(prevData => {
        return prevData.map(item => ({
          ...item,
          checked: selectedData.includes(item.key)
        }));
      });
    }
  }, [selectedData]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('searchParams:', searchParams);
      try {
        setLoading(true);
        // 构建查询参数，确保只传递非空值并处理日期范围
        const params = {};
        if (searchParams) {
          Object.entries(searchParams).forEach(([key, value]) => {
            // 跳过空值
            if (value !== undefined && value !== null && value !== '') {
              if (key === 'data' && Array.isArray(value) && value.length === 2) {
                // 处理日期范围，分别赋值给 startTime 和 endTime
                const [startDate, endDate] = value;
                if (startDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const start = new Date(startDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  start.setHours(start.getHours() + 8);
                  params['startTimeStr'] = start.toISOString();
                }
                if (endDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const end = new Date(endDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  end.setHours(end.getHours() + 8);
                  params['endTimeStr'] = end.toISOString();
                }
              } else if (key === 'date' && Array.isArray(value) && value.length === 2) {
                // 处理可能的 date 字段，同样转换为 startTime 和 endTime
                const [startDate, endDate] = value;
                if (startDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const start = new Date(startDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  start.setHours(start.getHours() + 8);
                  params['startTimeStr'] = start.toISOString();
                }
                if (endDate) {
                  // 转换为时间类型，确保使用上海时区（UTC+8）
                  const end = new Date(endDate);
                  // 调整为上海时区（UTC+8），确保日期正确
                  end.setHours(end.getHours() + 8);
                  params['endTimeStr'] = end.toISOString();
                }
              } else if (key !== 'data' && key !== 'date') {
                // 处理其他参数
                params[key] = value;
              }
            }
          });
        }
        
        console.log('最终传递给后端的参数:', params);
        
        const response = await axios.get('/api/stu/query', {
          params
        });
        // 确保 data 始终是一个数组
        if (Array.isArray(response.data.data)) {
          // 处理后端返回的数据，确保每个数据项都有 key 属性
          const processedData = response.data.data.map((item) => ({
            ...item,
            key: item.stuInfoId,
            // 确保每个数据项都有 checked 属性
            checked: false
          }));
          setData(processedData);
          console.log('处理后的数据:', processedData);
        } else {
          console.error('后端返回的数据格式错误，期望数组:', response.data);
          message.error('数据格式错误，请联系管理员');
          setData([]);
        }
      } catch (error) {
        console.error('获取学生数据失败:', error);
        message.error('获取学生数据失败，请稍后重试');
        // 失败时使用空数组
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ stuName: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record: DataType) => {
    console.log('保存行数据:', record.key);
    console.log('保存行数据:', record);
    try {
      const row = (await form.validateFields()) as Partial<DataType>;

      const newData = [...data];
      const index = newData.findIndex((item) => record.key === item.key);
      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };
        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey('');
        
        // 发送更新请求到后端接口
        console.log("==============准备发送更新请求==============")
        console.log("请求 URL: /api/stu/update")
        console.log("请求数据:", updatedItem)
        let response;
        try {
          setLoading(true);
          response = await axios.post('/api/stu/update', updatedItem);
          console.log("==============更新请求发送成功==============")
          message.success(response.data.message);
        } catch (error) {
          console.error('更新学生数据失败:', error);
          message.error(response?.data?.message || '更新学生数据失败，请稍后重试');
        } finally {
          setLoading(false);
        }
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
      dataIndex: 'stuName',
      width: '15%',
      align: 'center',
      editable: false,
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
      dataIndex: 'clazz',
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
            <Typography.Link onClick={() => save(record)} style={{ marginInlineEnd: 8 }}>
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
      <Spin spinning={loading} tip="加载中...">
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
      </Spin>
    </div>
  );
});

export default StuEditableContext;
