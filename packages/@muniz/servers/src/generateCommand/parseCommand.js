'use strict';

const path = require('path');
const fs = require('fs-extra');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');

const propTypes = ['array', 'bool', 'number', 'string'];

// 只解析 jsDoc 中 包含 @muniz 标志的信息 目前包括(@description, @alias)
const parseJsDoc = (flag, comments) => {
  if (!Array.isArray(comments)) {
    return '';
  }
  return comments
    .filter((comment) => comment.value.includes('@muniz'))
    .map((comment) => {
      const result = comment.value.match(new RegExp(`@${flag}\\s\{1,\}(.*?)\\s`, 'i'));
      if (result && result.length > 1) {
        return result[1].trim();
      } else {
        return '';
      }
    })
    .join(' ');
};

// 解析属性 options - argv。options 详细信息 (长名称 key，短名称 alias，描述 description，类型 type，默认值 defaultValue)
const parsePropType = (property) => {
  const key = property.key.name;
  const description = parseJsDoc('description', property.leadingComments);
  const alias = parseJsDoc('alias', property.leadingComments);

  let type = 'string';
  let isRequired = false;

  const walk = (node) => {
    if (types.isMemberExpression(node)) {
      if (types.isIdentifier(node.property)) {
        if (propTypes.includes(node.property.name)) {
          type = node.property.name;
        }

        if (node.property.name === 'isRequired') {
          isRequired = true;
        }
      }

      // 需要递归遍历整个节点以捕获所有类型的`PropTypes.a.b.c`链
      // 例如ʻisRequired`，例如 PropTypes.string.isRequired
      walk(node.object);
    }

    // 如果 `PropTypes ...` 链的子节点是调用表达式，则它必须是
    // prop类型，例如ʻarrayOf`，例如 PropTypes.arrayOf（PropTypes.string）
    if (types.isCallExpression(node)) {
      if (types.isMemberExpression(node.callee.object)) {
        walk(node.callee.object);
      }
    }
  };

  walk(property.value);

  // 将`bool`类型重命名为`boolean`以使yargs正确识别该类型
  if (type === 'bool') {
    type = 'boolean';
  }

  return { key, type, description, alias, isRequired };
};

// 提取 属性
const parsePropTypes = (node) => {
  if (!types.isObjectExpression(node)) {
    return [];
  }
  const propTypes = [];

  node.properties.forEach((property) => {
    propTypes.push(parsePropType(property));
  });
  return propTypes;
};

// 提取 默认值
const parseDefaultProps = (node) => {
  if (!types.isObjectExpression(node)) {
    return {};
  }

  const defaultProps = {};

  for (const property of node.properties) {
    if (types.isArrayExpression(property.value)) {
      const defaultValue = [];

      for (const element of property.value.elements) {
        if (types.isLiteral(element)) {
          defaultValue.push(element.value);
        }
      }

      defaultProps[property.key.name] = defaultValue;
    }

    if (types.isLiteral(property.value)) {
      defaultProps[property.key.name] = property.value.value;
    }
  }

  return defaultProps;
};

const parseCommand = async (filePath) => {
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf-8');

  const ast = parser.parse(content, { sourceType: 'module', plugins: ['typescript', 'jsx', 'classProperties'] });

  let componentName = '';
  let description = '';
  let commandType = '';

  // 遍历命令（名称、描述）
  traverse(ast, {
    ExportDefaultDeclaration({ node }) {
      if (types.isClassDeclaration(node.declaration)) {
        description = parseJsDoc('description', node.leadingComments);
        componentName = node.declaration.id.name;
        return;
      }

      if (types.isFunctionDeclaration(node.declaration)) {
        description = parseJsDoc('description', node.leadingComments);
        componentName = node.declaration.id.name;
        return;
      }

      if (types.isArrowFunctionExpression(node.declaration)) {
        description = parseJsDoc('description', node.leadingComments);

        return;
      }

      componentName = node.declaration.loc.identifierName;
    },
  });

  let defaultProps = {};
  const args = [];

  // 遍历命令 属性 options prop-types（名称、描述）
  traverse(ast, {
    // 支持箭头功能组件，例如 const MyComponent =（）=> {}
    VariableDeclaration({ node }) {
      if (node.declarations[0].id.name === componentName) {
        description = parseJsDoc('description', node.leadingComments);
        commandType = parseJsDoc('type', node.leadingComments);
      }
    },
    // 支持命名功能组件，例如 函数MyComponent {}
    FunctionDeclaration({ node }) {
      if (node.id.name === componentName) {
        if (!description) {
          description = parseJsDoc('description', node.leadingComments);
          commandType = parseJsDoc('type', node.leadingComments);
        }
      }
    },
    // 支持类组件，例如 类MyComponent扩展了React.Component {}
    ClassDeclaration({ node }) {
      if (node.id.name === componentName) {
        if (!description) {
          description = parseJsDoc('description', node.leadingComments);
          commandType = parseJsDoc('type', node.leadingComments);
        }
      }
    },
    // 支持静态类道具，例如 类MyComponent {静态propTypes = ...}
    ClassProperty({ node }) {
      if (node.key.name === 'propTypes') {
        args.push(...parsePropTypes(node.value));
      }

      if (node.key.name === 'defaultProps') {
        defaultProps = parseDefaultProps(node.value);
      }
    },
    // 支持功能组件的静态道具，例如 MyComponent.propTypes = ...
    AssignmentExpression({ node }) {
      if (node.operator !== '=') {
        return;
      }

      if (!node.left.object || !node.left.object.name) {
        return;
      }

      if (node.left.object.name !== componentName) {
        return;
      }

      if (node.left.property.name === 'propTypes') {
        args.push(...parsePropTypes(node.right));
      }

      if (node.left.object.name === componentName) {
        if (!description) {
          description = parseJsDoc('alias', node.leadingComments);
        }
      }

      if (node.left.property.name === 'defaultProps') {
        defaultProps = parseDefaultProps(node.right);
      }
    },
  });

  const command = {
    key: String(componentName).replace(/^(.)/i, (_, c) => String(c).toLocaleLowerCase()),
    commandType: commandType || 'react',
    description,
    options: args.map((arg) => {
      return {
        ...arg,
        default: defaultProps[arg.key],
      };
    }),
  };

  return command;
};

export { parseCommand };
