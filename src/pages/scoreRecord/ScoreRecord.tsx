import Layout from "@/components/Layout";
import ScoreEditableContext from "./ScoreEditableContex";
import { Button, message } from "antd";
import { useState } from "react";
import TeacherAdvancedSearch from "./TeacherAdvancedSearch";

const ScoreRecord: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState(false);
  const importScoreExcel = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls";
    input.multiple = false;

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      let file;
      if (target.files && target.files.length > 0) {
        file = target.files[0];
        if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
          // 只允许上传 Excel 文件
          message.error(`请上传Excel文件`);
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          // 10MB 限制
          message.error(`文件 ${file.name} 大小不能超过 2MB`);
          return;
        }
        console.log('upload file:', file);
        message.success(`文件 ${file.name} 上传成功`);
        setUploadStatus(true);
      }
    };
    input.click();
  };
  return (
    <Layout>
      <div className="button-container">
        <Button
          type="primary"
          onClick={importScoreExcel}
          className="primary-button import-button"
        >
          导入文件
        </Button>
      </div>
      <TeacherAdvancedSearch />
    </Layout>
  );
};

export default ScoreRecord;
