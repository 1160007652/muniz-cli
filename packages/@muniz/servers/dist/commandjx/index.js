'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var path = require('path');

var fs = require('fs-extra');

var parser = require('@babel/parser');

var traverse = require('@babel/traverse')["default"];

var types = require('@babel/types');

var parseJsDoc = function parseJsDoc(flag, comments) {
  if (!Array.isArray(comments)) {
    return '';
  }

  return comments.filter(function (comment) {
    return comment.value.includes('@muniz');
  }).map(function (comment) {
    return comment.value.match(new RegExp("@".concat(flag, "\\s{1,}(.*?)\\s"), 'i'))[1].trim();
  }).join(' ');
};

var parsePropType = function parsePropType(property) {
  var key = property.key.name;
  var description = parseJsDoc('description', property.leadingComments);
  var type = 'string';
  var isRequired = false;

  var walk = function walk(node) {
    if (types.isMemberExpression(node)) {
      if (types.isIdentifier(node.property)) {
        if (propTypes.includes(node.property.name)) {
          type = node.property.name;
        }

        if (node.property.name === 'isRequired') {
          isRequired = true;
        }
      } // Need to walk the whole node recursively to catch all types of `PropTypes.a.b.c` chain
      // like `isRequired`, e.g. `PropTypes.string.isRequired`


      walk(node.object);
    } // If child node of `PropTypes...` chain is a call expression, it must be a
    // prop type like `arrayOf`, e.g. `PropTypes.arrayOf(PropTypes.string)`


    if (types.isCallExpression(node)) {
      if (types.isMemberExpression(node.callee.object)) {
        walk(node.callee.object);
      }
    }
  };

  walk(property.value); // Rename `bool` type to `boolean` for yargs to correctly recognize the type

  if (type === 'bool') {
    type = 'boolean';
  }

  return {
    key: key,
    type: type,
    description: description,
    isRequired: isRequired
  };
};

var parsePropTypes = function parsePropTypes(node) {
  if (!types.isObjectExpression(node)) {
    return [];
  }

  var propTypes = [];

  var _iterator = _createForOfIteratorHelper(node.properties),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var property = _step.value;
      propTypes.push(parsePropType(property));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return propTypes;
};

var commandjx = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
    var content, ast, componentName, description;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('解析'); // 读取文件内容

            content = fs.readFileSync(path, 'utf-8');
            ast = parser.parse(content, {
              sourceType: 'module',
              plugins: ['typescript', 'jsx', 'classProperties']
            });
            componentName = '';
            description = '';
            traverse(ast, {
              ExportDefaultDeclaration: function ExportDefaultDeclaration(_ref2) {
                var node = _ref2.node;

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
              }
            });
            traverse(ast, {
              VariableDeclaration: function VariableDeclaration(_ref3) {
                var node = _ref3.node;

                if (node.declarations[0].id.name === componentName) {
                  description = parseJsDoc('description', node.leadingComments);
                }
              },
              // Support for named function components, e.g. function MyComponent {}
              FunctionDeclaration: function FunctionDeclaration(_ref4) {
                var node = _ref4.node;

                if (node.id.name === componentName) {
                  if (!description) {
                    description = parseJsDoc('description', node.leadingComments);
                  }
                }
              },
              // Support for class components, e.g. class MyComponent extends React.Component {}
              ClassDeclaration: function ClassDeclaration(_ref5) {
                var node = _ref5.node;

                if (node.id.name === componentName) {
                  if (!description) {
                    description = parseJsDoc('description', node.leadingComments);
                  }
                }
              },
              ClassProperty: function ClassProperty(_ref6) {
                var node = _ref6.node;
                console.log(node);

                if (node.key.name === 'propTypes') {
                  console.log(node.value); // args.push(...parsePropTypes(node.value));
                }

                if (node.key.name === 'defaultProps') {
                  console.log(node.value); // defaultProps = parseDefaultProps(node.value);
                }

                if (node.key.name === 'aliases') {
                  console.log(node.value); // mergeAliases(aliases, parseAliases(node.value));
                }

                if (node.key.name === 'shortFlags') {
                  console.log(node.value); // mergeAliases(aliases, parseAliases(node.value));
                }

                if (node.key.name === 'positionalArgs') {
                  console.log(node.value); // positionalArgs = parsePositionalArgs(node.value);
                }
              }
            });
            console.log('\n');
            console.log('命令:', componentName);
            console.log('命令描述:', description); // 打印信息

            console.log('\n');

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function commandjx(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = commandjx;
exports["default"] = _default;