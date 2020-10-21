'use strict';

const path = require('path');
const fs = require('fs-extra');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');

const parseJsDoc = (flag, comments) => {
  if (!Array.isArray(comments)) {
    return '';
  }

  return comments
    .filter((comment) => comment.value.includes('@muniz'))
    .map((comment) => comment.value.match(new RegExp(`@${flag}\\s\{1,\}(.*?)\\s`, 'i'))[1].trim())
    .join(' ');
};

const parsePropType = (property) => {
  const key = property.key.name;
  const description = parseJsDoc('description', property.leadingComments);
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

      // Need to walk the whole node recursively to catch all types of `PropTypes.a.b.c` chain
      // like `isRequired`, e.g. `PropTypes.string.isRequired`
      walk(node.object);
    }

    // If child node of `PropTypes...` chain is a call expression, it must be a
    // prop type like `arrayOf`, e.g. `PropTypes.arrayOf(PropTypes.string)`
    if (types.isCallExpression(node)) {
      if (types.isMemberExpression(node.callee.object)) {
        walk(node.callee.object);
      }
    }
  };

  walk(property.value);

  // Rename `bool` type to `boolean` for yargs to correctly recognize the type
  if (type === 'bool') {
    type = 'boolean';
  }

  return { key, type, description, isRequired };
};

const parsePropTypes = (node) => {
  if (!types.isObjectExpression(node)) {
    return [];
  }

  const propTypes = [];

  for (const property of node.properties) {
    propTypes.push(parsePropType(property));
  }

  return propTypes;
};

const commandjx = async (path) => {
  console.log('解析');

  // 读取文件内容
  const content = fs.readFileSync(path, 'utf-8');

  const ast = parser.parse(content, { sourceType: 'module', plugins: ['typescript', 'jsx', 'classProperties'] });

  let componentName = '';
  let description = '';
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

  traverse(ast, {
    VariableDeclaration({ node }) {
      if (node.declarations[0].id.name === componentName) {
        description = parseJsDoc('description', node.leadingComments);
      }
    },
    // Support for named function components, e.g. function MyComponent {}
    FunctionDeclaration({ node }) {
      if (node.id.name === componentName) {
        if (!description) {
          description = parseJsDoc('description', node.leadingComments);
        }
      }
    },
    // Support for class components, e.g. class MyComponent extends React.Component {}
    ClassDeclaration({ node }) {
      if (node.id.name === componentName) {
        if (!description) {
          description = parseJsDoc('description', node.leadingComments);
        }
      }
    },
    ClassProperty({ node }) {
      console.log(node);
      if (node.key.name === 'propTypes') {
        console.log(node.value);
        // args.push(...parsePropTypes(node.value));
      }

      if (node.key.name === 'defaultProps') {
        console.log(node.value);
        // defaultProps = parseDefaultProps(node.value);
      }

      if (node.key.name === 'aliases') {
        console.log(node.value);
        // mergeAliases(aliases, parseAliases(node.value));
      }

      if (node.key.name === 'shortFlags') {
        console.log(node.value);
        // mergeAliases(aliases, parseAliases(node.value));
      }

      if (node.key.name === 'positionalArgs') {
        console.log(node.value);
        // positionalArgs = parsePositionalArgs(node.value);
      }
    },
  });

  console.log('\n');

  console.log('命令:', componentName);
  console.log('命令描述:', description);

  // 打印信息
  console.log('\n');
};

export default commandjx;
