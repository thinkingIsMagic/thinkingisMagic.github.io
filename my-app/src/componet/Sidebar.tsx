import React from 'react';

export interface SidebarProps {
  files: string[];
  onSelect: (file: string) => void;
  style?: React.CSSProperties;
}

/**
 * 显示 Markdown 文件目录
 * @param param0 
 * @returns 
 */
const Sidebar = (props: SidebarProps) => {

  return (
    <div style={
        { 
            width: '250px', 
            borderRight: '1px solid #ccc', 
            padding: '15px', 
            backgroundColor: '#f8f8ff',
            height: '100vh',
            overflowY: 'auto',
            ...props?.style,
        }
    }>
      <h3 style={{ marginBottom: '15px', fontSize: '1.5em', color: '#333' }}>目录</h3>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {props?.files.map((file, index) => (
          <li key={index} 
              onClick={() => props?.onSelect(file)} 
              style={{ 
                padding: '10px', 
                // 改变鼠标光标为手型，指示该项可点击。
                cursor: 'pointer', 
                // 为背景颜色变化添加平滑过渡效果，持续时间为 0.3 秒
                transition: 'background-color 0.3s', 
                borderRadius: '4px' 
              }}
              // 鼠标停留回调
              // e.currentTarget指向事件触发的元素，即<li>元素
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFCCCC')}
              // 鼠标离开回调
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {file.replace('.md', '')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
