import Layout from '@/components/Layout';
import { Button, message } from 'antd';
import './generateText.css';

const GenerateText: React.FC = () => {
  const importFile = () => {
    // 创建文件选择输入框
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.doc,.docx'; // 限制文件类型为 word 文件
    input.multiple = true; // 允许选择多个文件

    // 监听文件选择事件
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files && files.length > 0) {
        // 验证文件数量
        if (files.length > 2) { // 限制最多上传 10 个文件
          message.error('最多只能上传 2 个文件');
          return;
        }

        // 验证每个文件的大小
        for (const file of files) {
          if (file.size > 10 * 1024 * 1024) { // 10MB 限制
            message.error(`文件 ${file.name} 大小不能超过 10MB`);
            return;
          }
        }

        // 处理上传的文件
        const uploadedFiles = Array.from(files);
        console.log('上传的文件:', uploadedFiles);
        message.success(`成功选择 ${uploadedFiles.length} 个文件`);

      }
    };

    // 触发文件选择对话框
    input.click();
  };
  const generateReport = () => {
    console.log('生成错题');
  };

  return (
    <Layout>
      <div style={{ padding: '24px' }}>
        <div className="button-container">
          <Button 
            type="primary" 
            onClick={importFile} 
            className="primary-button import-button"
          >
            导入文件
          </Button>
          <Button 
            type="primary" 
            className="primary-button import-button"
            onClick={generateReport}
          >
            生成错题
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default GenerateText;