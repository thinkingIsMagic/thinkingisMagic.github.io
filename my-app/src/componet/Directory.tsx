import React from 'react';
export interface DirectoryProps {
  currentFile: any;
}

/**
 * 悬浮显示当前 Markdown 文件的目录
 * @param props 
 * @returns 
 */
const Directory = (props: DirectoryProps) => {
  return (
    <div style={{
      position: 'fixed',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: '10px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ccc',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }}>
      <h4>当前文件</h4>
      <p>{props?.currentFile ? props?.currentFile.replace('.md', '') : '无文件选择'}</p>
    </div>
  );
};

export default Directory;
