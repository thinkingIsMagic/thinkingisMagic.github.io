import React, { useEffect, useState } from 'react';
import Sidebar from '../../componet/Sidebar';
import MarkdownDisplay from '../../componet/MarkdownDisplay';
import Directory from '../../componet/Directory';
import { FetchedMarkdownFiles } from '../../model/MarkdownModel';

const styles = {
  container:{ 
    display: 'flex',
    borderTop: '2px solid #FFCCCC', 
  },
  sidebarOrigin: { 
    width: '20vw', 
    borderRight: '1px solid #ccc', 
    padding: '10px',
  },
  sidebar:{ 
    width: '250px', 
    padding: '15px', 
    backgroundColor: '#ffffff',
    height: '100vh',
    borderRight: '2px solid #FFCCCC', 
  },
  /**
   * question 如何让markdown内容滑动的时候，左侧目录不动？ 解：markdown view添加 overflowY: 'scroll', 
   */
  markdownDisplay: {
      width: '80vw',
      padding: '20px',
      overflowY: 'scroll', 
      height: '100vh',
  },
  markdownDisplayImage: { 
    maxWidth: '100%' 
  },
};

//TODO 待开发 自动读取markdown文件夹下的md
const DocsPageView = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [markdownText, setMarkdownText] = useState<string>('');

  useEffect(() => {
    // 模拟读取 Markdown 文件列表
    setFiles(FetchedMarkdownFiles);
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
    <div style={styles.container}>
      <Sidebar files={files} onSelect={handleFileSelect} style={styles.sidebar}/>
      <MarkdownDisplay markdownText={markdownText} style={styles.markdownDisplay} imgStyle={styles.markdownDisplayImage}/>
      <Directory markdownText={markdownText} />
    </div>
  );
};

export default DocsPageView;
