# React 和 Hooks 原理

## useState 原理

### 为什么引入了 Hooks？

#### 原因
1. **局部变量无法在多次渲染中持久保存**
2. **更改局部变量不会触发渲染**

#### 解决方案
1. **保留渲染之间的数据**
2. **触发 React 使用新数据渲染组件（重新渲染）**

### useState 使用

```javascript
const [index, setIndex] = useState(0);
```

1. **State 变量** 用于保存渲染间的数据
2. **Setter 函数** 更新变量并触发 React 再次渲染组件

### 使用规范
1. **只能在组件或自定义 Hook 的最顶层调用**（保证顺序，因为调用 useState() 时，实际上是在 hooks 数组上追加数据）
2. **不能在条件语句、循环语句或其他嵌套函数内调用 Hook**  
   React 最终选择将 Hooks 设计为顺序结构，这也是 Hooks 不能条件调用的原因。

## 搭建 React 页面开发思路
1. 将 UI 拆解为组件层级结构
2. 使用 React 构建一个静态版本
3. 找出哪些变量应该用 state 存储
4. 找出 state 应该放置在哪里（状态提升）
   1. 找出所有使用 state 的组件
   2. 找到它们的公共父组件
   3. 在公共父组件中定义 state，并通过 prop 方式向下传递给使用 state 的组件
5. 添加反向数据流  
   实际上就是把 setter 方法通过 prop 的方式传递给子组件。

## React 渲染过程
1. **触发**  
   2 个行为会触发渲染：
   1. 初次渲染
   2. 状态更新（setter 函数）
   
2. **渲染**
   1. 初次渲染时，直接调用 root 节点
   2. 后续渲染时，只调用更新状态变化了的节点
   
3. **提交**  
   React 把更改提交到 DOM 上：
   1. 初次渲染时，React 会使用 `appendChild()` DOM API 将其创建的所有 DOM 节点放在屏幕上
   2. 重渲染时，React 将应用最少的必要操作（这里应该指的是 diff 算法），更新最新 DOM。  
      Diff 算法引入了虚拟 DOM 技术，通过比较新旧虚拟 DOM 来计算差异。

## useState 实现
1. **模拟实现**
   1. Hook 由 state（状态）和 setter（更新状态的函数）组成
   2. state 按顺序记录在 memoizedState 数组中，cursor 记录下一个 state 索引
   3. setter 函数是 useEffect 的内部函数，通过闭包方式来保存 state 和对应的 cursor
   4. 执行 setter 函数时，实际上完成了两个行为：
      - `memoizedState[_cursor] = newValue`（更新当前 setter 函数对应的 state，state 具体是通过闭包存储）
      - `updateDom`（重新渲染）
   
2. **实际实现**  
   与模拟实现不同，真实的 Hooks 是一个单链表的结构，React 按 Hooks 的执行顺序依次将 Hook 节点添加到链表中。

## 原理
1. **state 是一张快照**
   - 快照：某个对象或系统在某个时间点的状态和数据的副本。
   
   **举例**：
   ```javascript
   <>
       <h1>{number}</h1>
       <button onClick={() => {
           setNumber(number + 1);
           setNumber(number + 1);
           setNumber(number + 1);
       }}>+3</button>
   </>
   ```

   点击按钮后，number 显示 +1，而不是 +3。
   
   **原因**：
   1. number 这个 state 是一个快照，可以看作成一个常数，因此 number + 1 后是一个固定值。
   2. 单次事件中（比如点击事件），虽然有三次 setter 函数执行，但渲染只会发生一次（批量更新）。

2. **如何在下次渲染前多次更新同一个 state**
   
   **举例**：
   ```javascript
   <>
       <h1>{number}</h1>
       <button onClick={() => {
           setNumber(n => n + 1);
           setNumber(n => n + 1);
           setNumber(n => n + 1);
       }}>+3</button>
   </>
   ```

   点击按钮后，number 会显示 +3。

   **原因**：
   当 setter 传入一个函数时，此时这个函数被称为更新函数，React 会做两件事情：
   1. React 会将此函数加入队列
   2. 在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state。

   **举例**：
   ```javascript
   <>
       <h1>{number}</h1>
       <button onClick={() => {
           setNumber(number + 5);
           setNumber(n => n + 1);
           setNumber(42);
       }}>增加数字</button>
   </>
   ```

   点击按钮后，number 会显示 42。

## 状态管理

### 1. state 的一些使用规范
1. **合并关联的 state**
   ```javascript
   const [x, setX] = useState(0);
   const [y, setY] = useState(0);
   // 代替为：
   const [position, setPosition] = useState({ x: 0, y: 0 });
   ```

2. **避免矛盾的 state**（用状态枚举来定义状态）
   ```javascript
   const [isSending, setIsSending] = useState(false);
   const [isSent, setIsSent] = useState(false);
   // 代替为：
   const [status, setStatus] = useState('typing');
   ```

### 2. 受控组件和非受控组件
- **受控组件**：由 prop 驱动（父组件）
- **非受控组件**：由 state 驱动（自身的）

### 3. 官方状态管理方案：Reducer 和 Context

#### Reducer
- **作用**：把 setter 函数统一维护
- **使用流程**：
  1. 定义 action，所有状态更新通过 dispatch 触发
  2. 封装 reducer 函数（可以放到组件外单独一个文件中）
  3. `useReducer` 代替 `useState`
  ```javascript
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  ```
  4. 用 dispatch 代替 setter 函数来更新状态。

#### Context
- **作用**：把 state（状态）中心化维护
  - 可以解决组件层级过深时，state 需要层层传递的不便。
  
- **使用流程**：
  1. 创建 Context
  ```javascript
  import { createContext } from 'react';
  export const Context = createContext(0);
  ```
  2. 提供 Context
  ```javascript
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  
  <Context.Provider value={imageSize}>
      <List />
  </Context.Provider>
  ```
  3. 使用 Context
  ```javascript
  const imageSize = useContext(Context);
  ```

#### Reducer 和 Context 结合
- **作用**：解决 dispatch 需要层层传递的问题。
- **使用流程**：
  1. 创建 Context（包括状态和 action）
  ```javascript
  export const TasksContext = createContext(null);
  export const TasksDispatchContext = createContext(null);
  ```
  2. 提供 Context
  ```javascript
  <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
          ...
      </TasksDispatchContext.Provider>
  </TasksContext.Provider>
  ```
  3. 使用 Context
  ```javascript
  const tasks = useContext(TasksContext);
  ```

## 其他 Hook

### 1. useRef
- **作用**：希望组件在渲染前后“记住”某些信息，但又不想触发新的渲染，可以使用 ref。
  
- **实现**：
```javascript
const ref = useRef(0);
// React 内部
function useRef(initialValue) {
    const [ref, unused] = useState({ current: initialValue });
    return ref;
}
```

- **用处**：
  1. 不想触发渲染的数据
  2. 记录 timeout ID
  3. 操作 DOM

- **使用**：
  1. 声明 ref
  ```javascript
  const myRef = useRef(null);


  ```
  2. 把 ref 输入到 JSX 标签中对应组件（浏览器内置组件）的 ref 属性
  ```javascript
  <div ref={myRef}></div>
  ```
  3. 操作 DOM
  ```javascript
  myRef.current.focus(); // 聚焦
  myRef.current.scrollIntoView(); // 滚动到视口
  ```

### 2. useEffect
- **使用规范**：
  - **依赖数组**：
    - `useEffect(() => {});` // 每次渲染后运行
    - `useEffect(() => {}, []);` // 组件挂载时运行
    - `useEffect(() => {}, [a, b]);` // 当 a 或 b 变化时运行
  
  - **清理函数**：
    - `return () => {}` // 断开连接、清理计时器、重置动画状态...

- **如何理解 useEffect 的实现**：
  每一轮渲染都有其自己的 Effect，可以将 useEffect 理解为“附加”一段行为到渲染输出中。

### 3. 自定义 Hook
- **定义**：
  1. 用于组件间共享逻辑，且逻辑中包含 Hook 函数
  2. Hook 的名称必须永远以 use 开头
  3. 需要是纯函数

- **举例**：获取并显示当前网络状态

**未自定义 Hook 实现**：
```javascript
import { useState, useEffect } from 'react';

export default function StatusBar() {
    const [isOnline, setIsOnline] = useState(true);

    function handleOnline() {
        setIsOnline(true);
    }
    function handleOffline() {
        setIsOnline(false);
    }

    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```

**自定义 Hook 实现**：
```javascript
function StatusBar() {
    const isOnline = useOnlineStatus();
    return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

// useOnlineStatus.js（自定义 Hook）
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }
        function handleOffline() {
            setIsOnline(false);
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return isOnline;
}
```

## Redux 原理
- **TODO**: 需补充内容

## React 原理
- **TODO**: 需补充内容
```

您可以根据需要进行进一步的修改或补充！