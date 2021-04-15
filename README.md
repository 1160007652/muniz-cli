## @muniz/cli

Muniz 脚手架, 是一个基于插件机制模型设计的, 由多个插件组合而成。

### 一、项目框架

#### Lerna

- 采用 workspace 模型
- 结合 yarn - workspace 管理 node_modules

#### Eslint

- 使用 Eslint 进行代码规范校验
- 继承 于 airbnb 规范

#### Prettierrc

- 使用 Prettierrc 进行代码本地、提交时的格式校验
- 与 Eslint 冲突的解决

#### Babel

- 使用 Babel 解析, 使其 ES6、新特性 在 Node - cli 端生效.

#### Commitlint

- 进行 Github 代码提交 Commit 校验
- husky 、 lint-staged

#### ink

- React 开发命令行库

#### 相关依赖库

- didyoumean , 相近单词匹配，用于命令输错提示

### 二、开发

#### 安装依赖

```js
yarn install /* 安装依赖库 */
```

#### 添加命令到全局

```js
cd packages/@muniz/cli  /* 进入cli 目录 */

yarn link /* 执行link 功能, 挂载到 bin 执行环境中 */
```

#### 开发环境运行

通过执行以下命令，将项目提交到 npm、git 仓库。

```js
yarn muniz /* 运行脚手架 */
```

#### 打包 生产环境

通过执行以下命令，内部调用 nodemon 监听文件变化 实时转换代码。

```js
yarn build /* 打包 */
```

### 三、调试

在 **VsCode - IDE** 中，选择调试菜单项。 选择 **`Debug Muniz`** 进行断点调试项目

### 四、发布

将项目提交到 npm、git 仓库。

```js
yarn publish /* 提交 */
```

### 五、文档
