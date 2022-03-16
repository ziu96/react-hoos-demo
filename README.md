# react-hoos-demo
react hoos 版本代码练习
# react 类声明
### 声明

1. Html声明
   ```javascript
   import React from 'react';
   export default class HelloWorld extends React.Component {
     constructor(props) {
       super(props);
     }
   
     render() {
       return (
         <div>hello world</div>
       );
     }
   }
   ```
2. Class和Style声明
   ```javascript
   import React from 'react';
   export default class HelloWorld extends React.Component {
     constructor(props) {
       super(props);
       this.state = {
         styleData: { color: 'red', 'fontSize': "16px" },
         isHead: true,
         className: 'title'
       };
     }
   
     render() {
       return (
         <div
           className={`${this.state.className} ${this.state.isHead ? 'head' : ''}`}
           style={this.state.styleData}
         >
           hello world
         </div>
       );
     }
   }
   ```
### 组件使用
在Vue中使用组件需要对组件进行声明注册 在React中 不需要 注册组件直接引入就好

```javascript
import HelloWorld from './HelloWorld.js'

export default function Index(){
  return (
    <HelloWorld/>
  )
}
```

### 定义组件数据

在React中把内部数据称为**state**，把参数数据称为**props**

**state**

```javascript
this.state = {
  styleData: { color: 'red', 'fontSize': "16px" },
  isHead: true,
  className: 'title'
};
```

**props**

```javascript
import React from 'react';
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.title}</div>
    );
  }
}
HelloWorld.defaultProps = {
  title: 'hello world'
};
export default HelloWorld;

```

### React中如何向组件传递数据

（例子中只是为了展示传递数据 因此使用函数式展示和class展示是一样的）

传递动态数据

```javascript
import { useState } from 'react';
import HelloWorld from './HelloWorld.js';
export default function Index(){
  const [styleData] = useState({ color: 'red', 'fontSize': "16px" });
  const [isHead] = useState(true);
  const [className] = useState('title');
  return (
    <HelloWorld 
       styleData={styleData}  // 传递动态数据
       isHead={isHead}// 传递动态数据
       className={className} // 传递动态数据
    />
  )
}

```

传递静态数据

```javascript
<HelloWorld title="hello vue"></HelloWorld> //静态字符串
<HelloWorld num={1}></HelloWorld> //静态数字类型
<HelloWorld isHead={false}></HelloWorld> //静态布尔类型
<HelloWorld className={['title','head']}></HelloWorld> //静态数组类型
<HelloWorld styleData={{color:'red','fontSize':"16px"}}></HelloWorld> //静态对象类型
```

### React中如何监听DOM事件

- 监听DOM元素的DOM事件
  ```javascript
  import React from 'react';
  export default class HelloWorld extends React.Component {
    constructor(props) {
      super(props);
      // 为了在回调中使用 `this`，这个绑定是必不可少的
      // this.handleClick = this.handleClick.bind(this);
    }
    
     // handleClick() {
     // console.log('点击事件');
     // }
    
    // 也可以采用箭头函数的方式 就不需要使用bind从新指向this
    handleClick  = () => {
      console.log('点击事件');
    }
    render() {
      return (
        <div onClick={this.handleClick}>hello world</div>
      );
    }
  }
  
  ```

- React组件的DOM事件
  ```javascript
  // 子组件
  import React from 'react';
  export default class HelloWorld extends React.Component {
    constructor(props:any) {
      super(props);
      console.log(this.props)
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.props.onClick();
    }
  
    render() {
      return (
        <div onClick={this.handleClick}>hello world</div>
      );
    }
  }
  
  //父组件
  import React from 'react';
  import HelloWorld from './HelloWorld';
  export default class Grandfather extends React.Component {
    handleClick() {
      console.log('点击事件');
    }
    render() {
      return (
        <HelloWorld onClick={() => { this.handleClick() }}>
        </HelloWorld>
      )
    }
  }
  
  ```

<br/>

### 改变内部数据state

```javascript
import React from 'react';
export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'hello world',
      className: 'title'
    };
    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(state => ({
      title: 'hello react',
      className: 'title active'
    }));
  }

  render() {
    return (
      <div 
        className={className}
        onClick={this.handleClick}
      >{title}</div>
    );
  }
}

```

### React中父子组件如何通讯

```javascript
// 子组件
import React from 'react';
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeTitle=this.handleChangeTitle.bind(this);
  }
  handleChangeTitle(){
    this.props.changeTitle('hello React');
  }
  render() {
    return (
      <div>
        {this.props.title}
        <button 
          onClick={this.handleChangeTitle.bind(this)}>
          改变标题
        </button>
      </div>
    );
  }
}
export default HelloWorld;

// 父组件
import HelloWorld from './HelloWorld.js'
import React from 'react'
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      info:'hello world'
    };
    this.handleChangeTitle=this.handleChangeTitle.bind(this);
  }
  handleChangeTitle(data){
    this.setState(state =>{
      return {
        info:data
      }
    })
  }
  render() {
    return (
      <HelloWorld 
        title={this.state.info} 
        changeTitle={this.handleChangeTitle}>
      </HelloWorld>
    );
  }
}
export default Index;

```

### React中父组件如何调用子组件的方法

**ref**

1. 如果是HTML标签 直接返回DOM
2. 如果是子组件 直接返回js实例对象

```javascript
// 子组件
import React from 'react';
export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'hello World'
    };
  }
  handleChangeTitle(){
    this.setState({
      title:'hello React'
    });
  }
  render() {
    return (
      <div>
        {this.state.title}
      </div>
    );
  }
}
// 父组件

import React from 'react';
import HelloWorld from './HelloWorld.js';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.myCom = React.createRef();
    this.changeTitle = this.changeTitle.bind(this);
  }
  changeTitle() {
    this.myCom.current.handleChangeTitle();
  }
  render() {
    return (
      <div>
        <HelloWorld ref={this.myCom} />
        <button onClick={this.changeTitle}>改变标题</button>
      </div>
    )
  }
}
export default Index;
```

### 周期函数
    补充中
### 插槽
    补充中
# React-Hooks
## useState 数据存储，派发更新

**基本使用**：seState的参数可以是一个具体的值，也可以是一个函数用于判断复杂的逻辑，函数返回作为初始值

**回调**：usestate 返回一个数组，数组第一项用于读取此时的state值 ，第二项为派发数据更新，组件渲染的函数，函数的参数即是需要更新的值

```javascript
// 作为初始值 使用
const DemoState = (props) => {
   /* number为此时state读取值 ，setNumber为派发更新的函数 */
   let [number, setNumber] = useState(0) /* 0为初始值 */
   return (<div>
       <span>{ number }</span>
       <button onClick={ ()=> {
         setNumber(number+1)
         console.log(number) /* 这里的number是不能够及时改变的  */
       } } ></button>
   </div>
   
// 作为函数返回使用
const a =1 
const DemoState = (props) => {
   /*  useState 第一个参数如果是函数 则处理复杂的逻辑 ，返回值为初始值 */
   let [number, setNumber] = useState(()=>{
      // number
      return a===1 ? 1 : 2
   }) /* 1为初始值 */
   return (<div>
       <span>{ number }</span>
       <button onClick={ ()=>setNumber(number+1) } ></button>
   </div>)
}

```

**注意**：useState作为能够触发组件重新渲染的hooks,我们在使用useState的时候要特别注意的是，useState派发更新函数的执行，就会让整个function组件从头到尾执行一次，所以需要配合useMemo，usecallback等api配合使用，这就是为什么滥用hooks会带来负作用的原因之一了。

<br/>

## useEffect  组件更新副作用钩子

**基本使用**：如果你想在function组件中，当组件完成挂载，dom渲染完成，做一些操纵dom,请求数据，那么useEffect是一个不二选择，如果我们需要在组件初次渲染的时候请求数据，那么useEffect可以充当class组件中的 componentDidMoun

**执行顺序**：组件更新挂载完成 -> 浏览器dom 绘制完成 -> 执行useEffect回调 

**注意**：如果不给useEffect执行加入限定条件，只要更新一次state或者props都会触发useEffect执行 所以需要加入限制条件

```javascript
/* 模拟数据交互 */
function getUserInfo(a){
    return new Promise((resolve)=>{
        setTimeout(()=>{ 
           resolve({
               name:a,
               age:16,
           }) 
        },500)
    })
}

const Demo = ({ a }) => {
    const [ userMessage , setUserMessage ]= useState({})
    const div= useRef()
    const [number, setNumber] = useState(0)
    /* 模拟事件监听处理函数 */
    const handleResize =()=>{}
    /* useEffect使用 ，这里如果不加限制 ，会是函数重复执行，陷入死循环*/
    useEffect(()=>{
        /* 请求数据 */
       getUserInfo(a).then(res=>{
           setUserMessage(res)
       })
       /* 操作dom  */
       console.log(div.current) /* div */
       /* 事件监听等 */
        window.addEventListener('resize', handleResize)
    /* 只有当props->a和state->number改变的时候 ,useEffect副作用函数重新执行 ，
    如果此时数组为空[]，证明函数只有在初始化的时候执行一次相当于componentDidMount */
    },[ a ,number ])
    return (<div ref={div} >
        <span>{ userMessage.name }</span>
        <span>{ userMessage.age }</span>
        <div onClick={ ()=> setNumber(1) } >{ number }</div>
    </div>)
}


// 组件销毁阶段如果需要做一些取消dom监听，
// 清除定时器等操作那么我们可以在useEffect函数第一个参数，结尾返回一个函数，用于清除这些副作用

const Demo = ({ a }) => {
    /* 模拟事件监听处理函数 */
    const handleResize =()=>{}
    useEffect(()=>{
       /* 定时器 延时器等 */
       const timer = setInterval(()=>console.log(666),1000)
       /* 事件监听 */
       window.addEventListener('resize', handleResize)
       /* 此函数用于清除副作用 */
       return function(){
           clearInterval(timer) 
           window.removeEventListener('resize', handleResize)
       }
    },[ a ])
    return (<div  >
    </div>)
}

```

 useEffect是不能直接用 async await 语法糖的,可以使用立即执行函数 或者  可以对effect进行一层包装

```javascript
//在包装一次
const asyncEffect = (callback, deps)=>{
   useEffect(()=>{
       callback()
   },deps)
}
// 立即执行
useEffect(() => {
    (async () => {
      const data = await getList()
      console.log('data', data)
      setData(data)
    })()
  }, [query])
```

## useLayoutEffect 渲染更新之前的 useEffect

执行顺序：组件更新挂载完成 -> 执行useLayoutEffect回调-> 浏览器dom 绘制完成

例子

```javascript
const DemoUseLayoutEffect = () => {
    const target = useRef()
    useLayoutEffect(() => {
        /*我们需要在dom绘制之前，做一些操作*/

    }, []);
    return (
        <div >
            <span ref={ target } className="animate"></span>
        </div>
    )
}

```

## useRef 获取元素 ,缓存数据

基本使用：和传统的class组件ref一样，react-hooks 也提供获取元素方法 useRef,它有一个参数可以作为缓存数据的初始值，返回值可以被dom元素ref标记，可以获取被标记的元素节点.

```javascript
const DemoUseRef = ()=>{
    const dom= useRef(null)
    const handerSubmit = ()=>{
        /*  <div >表单组件</div>  dom 节点 */
        console.log(dom.current)
    }
    return <div>
        {/* ref 标记当前dom节点 */}
        <div ref={dom} >表单组件</div>
        <button onClick={()=>handerSubmit()} >提交</button> 
    </div>
}

```

高阶使用：缓存数据

暂时略

## useContext

理解：类似Vue中 祖先组件向下传值 孙子组件 获取传下的内容

```javascript
//上级组件 使用React.createContext创建初始值 在通过.Provider改变初始值
// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// 创建两个context
export const UserContext = React.createContext();
export const TokenContext = React.createContext();
ReactDOM.render(
  <UserContext.Provider value={{ id: 1, name: "chimmy", age: "20" }}>
    <TokenContext.Provider value="我是token">
      <App />
    </TokenContext.Provider>
  </UserContext.Provider>,
  document.getElementById("root")
);
// app.js
import React, { useContext } from "react";
import { UserContext, TokenContext } from "./index";

function Example() {
  let user = useContext(UserContext); // 使用useContext拿到祖先组件根据上下文传递下来的值
  let token = useContext(TokenContext);// 使用useContext拿到祖先组件根据上下文传递下来的值
  console.log("UserContext", user);
  console.log("TokenContext", token);
  return (
    <div>
      name:{user?.name},age:{user?.age}
    </div>
  );
}
export default Example;

```

## useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

基本使用：useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

```javascript
//useState 方式
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
// useReducer方式
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```

## useMemo

理解：相当于把父组件需要传递的参数做了一个标记，无论父组件其他状态更新任何值，都不会影响要传递给子组件的对象，子组件只会在标记的值上 执行重新渲染

```javascript
import React, { useEffect, useState, useMemo } from 'react'

function Child({ data }) {
  useEffect(() => {
    console.log('查询条件：', data)
  }, [data])

  return <div>子组件</div>
}


function App() {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [kw, setKw] = useState('')
 //使用前  除了 name 和 phone值改变 kw值改变也会重新渲染子组件 
  const data = {
    name,
    phone
  }
  // 使用useMemo 将 data 包装一下，告诉 data 它需要监听的值 只有在name 和 phone值改变 才会重新渲染子组件
  const data = useMemo(() => ({
    name,
    phone
  }), [name, phone])

  return (
    <div className="App">
      <input onChange={(e) => setName(e.target.value)} type="text" placeholder='请输入姓名' />
      <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder='请输入电话' />
      <input onChange={(e) => setKw(e.target.value)} type="text" placeholder='请输入关键词' />
      <Child data={data} />
    </div>
  )
}

export default App
```

## useCallback

理解：react 官网解释useCallback中 有一项这样的解释** useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。**

那么修改上面例子代码

```javascript
import React, { useEffect, useState, useCallback } from 'react'

function Child({ callback }) {
  useEffect(() => {
    callback()
  }, [callback])

  return <div>子组件</div>
}


function App() {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [kw, setKw] = useState('')

  const callback = useCallback(() => { // 只会在初始化的时候执行一次 后面name,phone,kw在改变都不会重新渲染子组件
      console.log('我是callback')
  }, [])

  return (
    <div className="App">
      <input onChange={(e) => setName(e.target.value)} type="text" placeholder='请输入姓名' />
      <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder='请输入电话' />
      <input onChange={(e) => setKw(e.target.value)} type="text" placeholder='请输入关键词' />
      <Child callback={callback} />
    </div>
  )
}

export default App
```

# React-router
## React Router 库中几个不同的 npm 依赖包

- `react-router`: 实现了路由的核心功能，用作下面几个包的运行时依赖项(peer dependency)。
- `react-router-dom`: 用于 React WEB 应用的路由依赖. 基于 react-router，加入了在浏览器运行环境下的一些功能，例如：BrowserRouter 和 HashRouter 组件，前者使用 pushState 和 popState 事件构建路由;后者使用 window.location.hash 和 hashchange 事件构建路由
- react-router-native: 用于 React Native 应用的路由依赖。基于 react-router，加入了 react-native 运行环境下的一些功能
- react-router-config: 用于配置静态路由的工具库

基于浏览器环境的开发，只需要安装 react-router-dom; 基于 react-native 环境的开发，只需要安装 react-router-native;

## react-router-dom（基于浏览器开发）

```javascript
// 安装
yarn add react-router-dom
```

### BrowserRouter

```javascript
//App.js文件
import React, { Fragment } from "react";
import "./index.css";
import { BrowserRouter as Router  } from "react-router-dom"; // 导入BrowserRouter 并且启用别名
export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </main>
    </Router>
  );
}
```

### Route 

```javascript
import React, { Fragment } from "react";
import "./index.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <Route path="/" render={() => <h1>Welcome!</h1>} />
      </main>
    </Router>
  );
}

```

现在我们添加了一条路由`<Route path="/" render={() => <h1>Welcome!</h1>} />`

Route组件有很多属性，在代码中，我们使用了 path, render属性

- path:页面的路径.在上面的代码中，我们定义了/路径用于导航到首页
- render: path 对应的页面渲染的是什么.在代码中，我们渲染了一个h1标题

渲染React组件

```javascript
import React, { Fragment } from "react";
import "./index.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>

        <Route path="/" component={Home} />
      </main>
    </Router>
  );
}

const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <FakeText />
  </Fragment>
);
```

我们把 **render**属性替换为 **component**就可以渲染我们的Home组件了

### Link

```javascript
// ...上述代码
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// ....

// 主要看代码中的 Link标签
<nav>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
  </ul>
</nav>
// ....
// ....
```

导入 **Link**之后，我们还需要修改导航菜单部分的代码-使用Link及其to替换a及其href ,这样就可以实现界面之间的跳转功能，并且界面不会重新刷新

### Switch

在 React Router 中，如果定义的path属性以/开头，那么每次都会匹配到Home组件，那么每次都会渲染Home 和当前组件，如果要做到 只渲染对应组件 只需要

- 给Home 路由加上exact,这样只有path的值被完全匹配时才会渲染对应的组件
- 或者通过使用**Switch**包裹路由来告诉 React Router 一次仅加载一条路由。

```javascript
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

<Switch>
  <Route path="/" exact component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>;
```

### 路由传参

```javascript
import React, { Fragment } from "react";
import "./index.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default function App() {
  const name = "John Doe";
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/about/${name}`}>About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about/:name" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </main>
    </Router>
  );
}

const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <FakeText />
  </Fragment>
);

const About = ({
  match: {
    params: { name },
  },
}) => (
  // 通过props.match.params.name接受到路由传递过来的参数
  <Fragment>
    <h1>About {name}</h1>
    <FakeText />
  </Fragment>
);

const Contact = () => (
  <Fragment>
    <h1>Contact</h1>
    <FakeText />
  </Fragment>
);

```

### 使用 JS 代码实现页面跳转

通过Route作为顶层组件包裹其他组件后,页面组件就可以接收到一些路由相关的东西，比如props.history

```javascript
const Contact = ({ history }) => (
  <Fragment>
    <h1>Contact</h1>
    <button onClick={() => history.push("/")}>Go to home</button>
    <FakeText />
  </Fragment>
);
```

### Redirect（重定向）

```javascript
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";

const About = ({
  match: {
    params: { name },
  },
}) => (
  // props.match.params.name
  <Fragment>
    {name !== "tom" ? <Redirect to="/" /> : null} // name不等于tom重定向到首页
    <h1>About {name}</h1>
    <FakeText />
  </Fragment>
);

```

props.history.push("/")和Redirect区别

- Redirect组件将替换当前页面，因此用户无法返回上一页;
- 使用 push 方法，用户是可以返回上一页的。

### 配置404

```javascript
import React, { Fragment } from "react";
import "./index.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default function App() {
  const name = "John Doe";

  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/about/${name}`}>About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about/:name" component={About} />
          <Route path="/contact" component={Contact} />
          {/*404 page*/}
          <Route render={() => <h1>404: page not found</h1>} /> // 也可以使用component引入404组件
        </Switch>
      </main>
    </Router>
  );
}

```

### 路由守卫

```javascript
import React, { Fragment } from "react";
import "./index.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default function App() {
  const name = "John Doe";
  const isAuthenticated = false;
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/about/${name}`}>About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          {isAuthenticated ? (
            <>
              <Route path="/about/:name" component={About} />
              <Route path="/contact" component={Contact} />
            </>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </main>
    </Router>
  );
}

```

正如你所看到的，我们声明了一个模仿身份验证的变量isAuthenticated。 然后，检查用户是否已通过身份验证。 如果通过验证，则渲染受保护的页面。 否则，将重定向到主页。

##	Router Hooks

Router hooks 可以让我们更加容易地访问到 history,location,路由参数 等等

<br/>

### useHistory

```javascript
import { useHistory } from "react-router-dom"; //useHistory可以直接访问到history,而不再需要通过 props 访问

const Contact = () => {
  const history = useHistory();
  return (
    <Fragment>
      <h1>Contact</h1>
      <button onClick={() => history.push("/")}>Go to home</button>
    </Fragment>
  );
};

```

### useParams

useParams 帮助我们直接访问到路由参数,而不再需要通过 props 访问

```javascript
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
} from "react-router-dom";

export default function App() {
  const name = "John Doe";
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/about/${name}`}>About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about/:name" component={About} />
        </Switch>
      </main>
    </Router>
  );
}

const About = () => {
  const { name } = useParams();
  return (
    // props.match.params.name
    <Fragment>
      {name !== "John Doe" ? <Redirect to="/" /> : null}
      <h1>About {name}</h1>
      <Route component={Contact} />
    </Fragment>
  );
};

```

### useLocation

useLocation 会返回当前 URL 的 location 对象

```javascript
import { useLocation } from "react-router-dom";

const Contact = () => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <h1>Contact</h1>
      <p>Current URL: {pathname}</p>
    </Fragment>
  );
};

```