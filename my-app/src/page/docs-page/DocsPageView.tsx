import React, { useEffect, useState } from 'react';
import Sidebar from '../../componet/Sidebar';
import MarkdownDisplay from '../../componet/MarkdownDisplay';
import Directory from '../../componet/Directory';

//TODO 待开发 自动读取markdown文件夹下的md
//TODO 图片显示异常
const DocsPageView = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');

  useEffect(() => {
    // 模拟读取 Markdown 文件列表
    const fetchedFiles = ['file1.md', 'file2.md','github-page-coding-record.md'];
    setFiles(fetchedFiles);
  }, []);

  useEffect(() => {
    if (currentFile) {
      // 读取 Markdown 文件内容，路径指向 markdown 文件夹
      /**
       * 注意！ 这里要把markdown文件都放到public路径下，才能访问到
       */
      fetch(`/markdown/${currentFile}`) // 确保路径指向正确
        .then((response) => {
          if (!response.ok) {
            throw new Error('网络响应错误');
          }
          // console.log("response ", response.text())
          return response.text();
        })
        .then((text) => {
          console.log("text ", text)
          setMarkdownText(text)
        })
        .catch((error) => console.error('获取文件时出错:', error));
    }
  }, [currentFile]);

  const handleFileSelect = (file: string) => {
    setCurrentFile(file);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar files={files} onSelect={handleFileSelect} />
      <MarkdownDisplay markdownText={markdownText} />
      <Directory currentFile={currentFile} />
    </div>
  );
};

export default DocsPageView;
