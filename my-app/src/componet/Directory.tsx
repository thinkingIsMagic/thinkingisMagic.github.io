import React, { useRef } from 'react';

export interface DirectoryProps {
  markdownText: string; // 接收当前的 Markdown 内容
  style?: React.CSSProperties;
}

//TODO 待拓展功能，选中标题时，锚定到markdown内容区
/**
 * 悬浮显示当前 Markdown 文件的目录
 * 优化Directory 组件：
 *（1）接收 Markdown 内容：通过 props 传入当前 Markdown 内容。
 *（2）提取标题：使用正则表达式从 Markdown 内容中提取所有标题。
 *（3）渲染标题：以列表的形式渲染这些标题。
 * @param props 
 * @returns 
 */
const Directory = (props: DirectoryProps) => {
    const directoryRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (directoryRef.current) {
            const scrollTop = e.currentTarget.scrollTop;
            directoryRef.current.scrollTop = scrollTop;
        }
    };

    // 提取 Markdown 内容中的标题
    const extractHeadings = (content: string) => {
        const headingRegex = /^(#{1,6})\s*(.+)$/gm; // 匹配 h1 到 h6 标题
        const headings: { level: number; text: string }[] = [];
        let match: RegExpExecArray | null;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length; // 获取标题级别
            const text = match[2]; // 获取标题文本
            headings.push({ level, text });
        }

        return headings;
    };
    const headings = extractHeadings(props.markdownText);

    return (
        <div 
            ref={directoryRef} 
            onScroll={handleScroll}
            style={
                props?.style ?? 
                {
                    position: 'fixed',
                    maxHeight: '50vh', // 限制最大高度
                    maxWidth: '10vw',
                    right: '10px',
                    top: '10%',
                    // transform: 'translateY(-50%)',
                    padding: '20px',
                    paddingTop: '0px',
                    backgroundColor: '#f9f9f999',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    overflowY: 'scroll', // 允许内部滚动
                }
            }
        >
            <h4>当前文件目录</h4>
            <ul style={{ paddingLeft: '0', listStyleType: 'none' }}>
                {headings.map((heading, index) => (
                    <li key={index} style={{ margin: '5px 0', paddingLeft: `${heading.level * 10}px` }}>
                        {heading.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Directory;
