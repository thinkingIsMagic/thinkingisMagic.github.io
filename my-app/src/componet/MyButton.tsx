import React from 'react';

export interface ButtonWithHoverProps {
  // 按钮文本
  buttonStyle?: any;
  text: string;
  handleClick?: () => void;
}

// 按钮样式
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '18px',
  fontWeight: '800',
  color: 'white',
  backgroundColor: '#000000',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

// 鼠标悬停样式
const hoverStyle = {
  backgroundColor: '#00ffff',
};

// 使用状态管理来处理悬停效果
export const ButtonWithHover = (props: ButtonWithHoverProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={props?.handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...buttonStyle,
        backgroundColor: isHovered ? hoverStyle.backgroundColor : buttonStyle.backgroundColor,
        ...props?.buttonStyle
      }}
    >
      {props?.text || "点击我"}
    </button>
  );
};

export default ButtonWithHover;
