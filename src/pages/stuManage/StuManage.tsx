import Layout from '@/components/Layout';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';


const StuManage: React.FC = () => {
  const navigate = useNavigate();
  console.log(navigate);
  const addStudent = () => {
    console.log('添加学生');
  }
  return (
    <Layout>
      <Button type="primary" onClick={addStudent}>添加学生</Button>
      
    </Layout>
  );
};

export default StuManage;
