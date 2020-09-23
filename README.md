## @muniz/cli

Muniz 脚手架, 是一个基于插件机制模型设计的, 由多个插件组合而成。

### 项目框架

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

#### meow

- 命令行解释器

### 开发

#### 开发环境

- 初始化开发环境

> 作用： 在新的环境中，初始化开发环境。

```js
yarn install /* 安装依赖库 */

cd packages/@muniz/cli  /* 进入cli 目录 */

yarn link /* 执行link 功能, 挂载到 bin 执行环境中 */
```

- 运行命令

> 作用：通过执行以下命令，内部调用 nodemon 监听文件变化 实时转换代码。

```js
yarn start /* 在 lerna 工程根目录运行 */
```

### 测试

### 提交

### 发布

### 文档
