import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface MarkdownDisplayProps {
    markdownText: string;
    style?: any;
    imgStyle?: any;
}

const markdownPath = "/markdown/"

//TODO code标签显示太丑，需要特殊处理下
/**
 * 显示 Markdown 内容（支持图片）
 * @param param0
 * @returns
 */
const MarkdownDisplay = (props: MarkdownDisplayProps) => {
    console.log("path ", `${process.env.PUBLIC_URL}/markdown/resource/mian_page.png`)
    return (
        <div style={props?.style ?? { padding: '20px' }}>
            {/* question 图片路径错误问题，把require去掉就可以了 */}
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                components={{
                    img: ({ src, alt }) => (
                        <img src={`${process.env.PUBLIC_URL}${markdownPath}${src}`} alt={alt} style={props?.imgStyle ?? { maxWidth: '100%' }} />
                    )
                }}
            >
                {props.markdownText}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownDisplay;
