import React from 'react';
import ReactMarkdown from 'react-markdown';
export interface MarkdownDisplayProps{
    markdownText: any;
}

/**
 * 显示 Markdown 内容
 * @param param0 
 * @returns 
 */
const MarkdownDisplay = (props: MarkdownDisplayProps) => {
  return (
    <div style={{ padding: '20px' }}>
      <ReactMarkdown>{props?.markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
