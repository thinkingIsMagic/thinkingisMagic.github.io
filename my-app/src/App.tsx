import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ButtonWithHover } from './componet/MyButton';

function App() {

  function handleClick() {
    alert('嘿嘿嘿！');
  };

  return (
    /**
     * 背景图可以直接在容器的css设置
     */
    <div className="backGroundView">
      <div className='App'>
        <div className="topViewContainer">
          <div className='leftViewContainer'>
            <p className='leftTitle'>ThinkIsMagic</p>
          </div>
          <div className='rightViewContainer'>
            <div className='topRightItemView'>test1</div>
            <div className='topRightItemView'>test2</div>
            <div className='topRightItemView'>项目</div>
            <div className='topRightItemView'>笔记</div>
            <div className='topRightItemView'>搜索框占位</div>
          </div>
        </div>
        <div className="middleViewContainer">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Coding Learning Record
          </h2>
          <ButtonWithHover 
            text='点击进入'
            handleClick={handleClick}
            buttonStyle={{marginTop: "1vh"}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
