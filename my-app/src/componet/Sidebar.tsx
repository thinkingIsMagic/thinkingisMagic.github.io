import React from 'react';

export interface SidebarProps {
  files: string[];
  onSelect: (file: string) => void;
}
/**
 * 显示 Markdown 文件目录
 * @param param0 
 * @returns 
 */
const Sidebar = (props: SidebarProps) => {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h3>目录</h3>
      <ul>
        {props?.files.map((file, index) => (
          <li key={index} onClick={() => props?.onSelect(file)}>
            {file.replace('.md', '')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
