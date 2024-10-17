## Github page个人博客开发

### 一、产品设计

#### 1、产品功能：

**（1）个人主页** 

**（2）文档分类浏览（左侧目录树、右侧对应的markDown）**

（3）搜索功能

（4）用户登陆、用户权限

（5）评论功能

（6）在线管理文档功能（新增、删除、修改，只有管理员有权限）

（7）私人笔记功能（只有管理员能访问）

**（8）数据记录功能：关键日志记录、数据统计（总访问量、每篇文档访问量）**





### 二、UI设计

#### 1、主页

![mianPage](/Users/wanghao40/Desktop/学习记录-思维导图/github-project/thinkingisMagic.github.io/markdown/mian_page.png)



#### 2、文档页

![docs_page](/Users/wanghao40/Desktop/学习记录-思维导图/github-project/thinkingisMagic.github.io/markdown/docs_page.png)





### 三、技术方案



#### 1、Gitpages使用

官方基础使用文档：https://docs.github.com/zh/pages/quickstart

第三方介绍：https://sspai.com/post/54608

部署react项目： https://github.com/gitname/react-gh-pages



2、view层级设计（react）

（1）主页page 

HomePageView

-rootContainer 根容器

  --backGroundContainer 背景容器

  --topViewContainer 顶部容器

   ---leftViewContainer 左对齐容器

​     ----itemView

   ---rightViewContainer 右对齐容器

​     ----itemView

  --middleViewContainer 中间容器

​    ---view1Container

​    ---view2Container

​    ...

  --bottomViewContainer 底部容器（待拓展）



（2）文档页

DocsPageView

-rootContainer 根容器

  --topViewContainer 顶部容器

   ---leftViewContainer 左对齐容器

​     ----itemView

   ---rightViewContainer 右对齐容器

​     ----itemView（搜索view）

  --mainViewContainer 内容区容器

​    ---directoryViewContainer 目录容器

​      ----listView 可滚动列表

​    ---contentViewContainer 内容容器

​      ----MarkDownView 显示markdown





### 四、上线以及推广
