import React, { CSSProperties, useEffect, useState } from 'react';
import Sidebar from '../../componet/Sidebar';
import MarkdownDisplay from '../../componet/MarkdownDisplay';
import Directory from '../../componet/Directory';
import { FetchedMarkdownFiles } from '../../model/MarkdownModel';
import useSearch from '../../util/useSearch';

const styles: { [key: string]: CSSProperties } = {
  rootContainer:{
    display: 'flex',
    flexDirection: 'column',
  },
  docsContainer:{ 
    display: 'flex',
    // borderTop: '2px solid #FFCCCC', 
  },
  sidebar:{ 
    width: '250px', 
    padding: '15px', 
    backgroundColor: '#ffffff',
    height: '100vh',
    borderRight: '1px solid #FFCCCC', 
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
  topViewContainer:{
    width: "100%",
    height: "10vh",
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.5))",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex'
  },
  topViewLeftContainer:{
    width: "50vw",
  },
  topViewRightContainer:{
    width: "50vw",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000000', 
  },
  searchBarContainer:{
    width: "20vw",
    border: '2px solid #000000', 
  },
  searchInput: {
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  resultsList: {
    listStyleType: 'none',
    padding: 0,
  },
  resultItem: {
    cursor: 'pointer',
    padding: '5px',
  }
};

//TODO 待开发 自动读取markdown文件夹下的md
const DocsPageView = () => {
  // 所有markdown文件
  const [files, setFiles] = useState<string[]>([]);
  // 当前markdown文件
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  // markdown内容
  const [markdownText, setMarkdownText] = useState<string>('');
  // 搜索
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleResultSelect = (file: string) => {
    setCurrentFile(file);
    setSearchQuery('');
  };

  const searchResults = useSearch(files, searchQuery);

  return (
    <div style={styles.rootContainer}>
      <div style={styles.topViewContainer}>
        <div style={styles.topViewLeftContainer}>
          {/* 待拓展 */}
        </div>
        <div style={styles.topViewRightContainer}>
          <div style={styles.searchBarContainer}>
            <input 
              type="text" 
              placeholder="搜索..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              style={styles.searchInput}
            />
            <ul style={styles.resultsList}>
              {searchResults.map((file) => (
                <li key={file} onClick={() => handleResultSelect(file)} style={styles.resultItem}>
                  {file}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div style={styles.docsContainer}>
        <Sidebar files={files} onSelect={handleFileSelect} style={styles.sidebar}/>
        <MarkdownDisplay markdownText={markdownText} style={styles.markdownDisplay} imgStyle={styles.markdownDisplayImage}/>
        <Directory markdownText={markdownText} />
      </div>
    </div>
  );
};

export default DocsPageView;
