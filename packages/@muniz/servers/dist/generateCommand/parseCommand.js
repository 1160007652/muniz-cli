'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCommand = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var path = require('path');

var fs = require('fs-extra');

var parser = require('@babel/parser');

var traverse = require('@babel/traverse')["default"];

var types = require('@babel/types');

var propTypes = ['array', 'bool', 'number', 'string']; // 只解析 jsDoc 中 包含 @muniz 标志的信息 目前包括(@description, @alias)

var parseJsDoc = function parseJsDoc(flag, comments) {
  if (!Array.isArray(comments)) {
    return '';
  }

  return comments.filter(function (comment) {
    return comment.value.includes('@muniz');
  }).map(function (comment) {
    var result = comment.value.match(new RegExp("@".concat(flag, "\\s{1,}(.*?)\\s"), 'i'));

    if (result && result.length > 1) {
      return result[1].trim();
    } else {
      return '';
    }
  }).join(' ');
}; // 解析属性 options - argv。options 详细信息 (长名称 key，短名称 alias，描述 description，类型 type，默认值 defaultValue)


var parsePropType = function parsePropType(property) {
  var key = property.key.name;
  var description = parseJsDoc('description', property.leadingComments);
  var alias = parseJsDoc('alias', property.leadingComments);
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
      } // 需要递归遍历整个节点以捕获所有类型的`PropTypes.a.b.c`链
      // 例如ʻisRequired`，例如 PropTypes.string.isRequired


      walk(node.object);
    } // 如果 `PropTypes ...` 链的子节点是调用表达式，则它必须是
    // prop类型，例如ʻarrayOf`，例如 PropTypes.arrayOf（PropTypes.string）


    if (types.isCallExpression(node)) {
      if (types.isMemberExpression(node.callee.object)) {
        walk(node.callee.object);
      }
    }
  };

  walk(property.value); // 将`bool`类型重命名为`boolean`以使yargs正确识别该类型

  if (type === 'bool') {
    type = 'boolean';
  }

  return {
    key: key,
    type: type,
    description: description,
    alias: alias,
    isRequired: isRequired
  };
}; // 提取 属性


var parsePropTypes = function parsePropTypes(node) {
  if (!types.isObjectExpression(node)) {
    return [];
  }

  var propTypes = [];
  node.properties.forEach(function (property) {
    propTypes.push(parsePropType(property));
  });
  return propTypes;
}; // 提取 默认值


var parseDefaultProps = function parseDefaultProps(node) {
  if (!types.isObjectExpression(node)) {
    return {};
  }

  var defaultProps = {};

  var _iterator = _createForOfIteratorHelper(node.properties),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var property = _step.value;

      if (types.isArrayExpression(property.value)) {
        var defaultValue = [];

        var _iterator2 = _createForOfIteratorHelper(property.value.elements),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var element = _step2.value;

            if (types.isLiteral(element)) {
              defaultValue.push(element.value);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        defaultProps[property.key.name] = defaultValue;
      }

      if (types.isLiteral(property.value)) {
        defaultProps[property.key.name] = property.value.value;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return defaultProps;
};

var parseCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filePath) {
    var content, ast, componentName, description, commandType, defaultProps, args, command;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 读取文件内容
            content = fs.readFileSync(filePath, 'utf-8');
            ast = parser.parse(content, {
              sourceType: 'module',
              plugins: ['typescript', 'jsx', 'classProperties']
            });
            componentName = '';
            description = '';
            commandType = ''; // 遍历命令（名称、描述）

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
            defaultProps = {};
            args = []; // 遍历命令 属性 options prop-types（名称、描述）

            traverse(ast, {
              // 支持箭头功能组件，例如 const MyComponent =（）=> {}
              VariableDeclaration: function VariableDeclaration(_ref3) {
                var node = _ref3.node;

                if (node.declarations[0].id.name === componentName) {
                  description = parseJsDoc('description', node.leadingComments);
                  commandType = parseJsDoc('type', node.leadingComments);
                }
              },
              // 支持命名功能组件，例如 函数MyComponent {}
              FunctionDeclaration: function FunctionDeclaration(_ref4) {
                var node = _ref4.node;

                if (node.id.name === componentName) {
                  if (!description) {
                    description = parseJsDoc('description', node.leadingComments);
                    commandType = parseJsDoc('type', node.leadingComments);
                  }
                }
              },
              // 支持类组件，例如 类MyComponent扩展了React.Component {}
              ClassDeclaration: function ClassDeclaration(_ref5) {
                var node = _ref5.node;

                if (node.id.name === componentName) {
                  if (!description) {
                    description = parseJsDoc('description', node.leadingComments);
                    commandType = parseJsDoc('type', node.leadingComments);
                  }
                }
              },
              // 支持静态类道具，例如 类MyComponent {静态propTypes = ...}
              ClassProperty: function ClassProperty(_ref6) {
                var node = _ref6.node;

                if (node.key.name === 'propTypes') {
                  args.push.apply(args, (0, _toConsumableArray2["default"])(parsePropTypes(node.value)));
                }

                if (node.key.name === 'defaultProps') {
                  defaultProps = parseDefaultProps(node.value);
                }
              },
              // 支持功能组件的静态道具，例如 MyComponent.propTypes = ...
              AssignmentExpression: function AssignmentExpression(_ref7) {
                var node = _ref7.node;

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
                  args.push.apply(args, (0, _toConsumableArray2["default"])(parsePropTypes(node.right)));
                }

                if (node.left.object.name === componentName) {
                  if (!description) {
                    description = parseJsDoc('alias', node.leadingComments);
                  }
                }

                if (node.left.property.name === 'defaultProps') {
                  defaultProps = parseDefaultProps(node.right);
                }
              }
            });
            command = {
              key: String(componentName).replace(/^(.)/i, function (_, c) {
                return String(c).toLocaleLowerCase();
              }),
              commandType: commandType || 'function',
              // 当不配置 @type 时默认执行 function 函数命令
              description: description,
              options: args.map(function (arg) {
                return _objectSpread(_objectSpread({}, arg), {}, {
                  "default": defaultProps[arg.key]
                });
              })
            };
            return _context.abrupt("return", command);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function parseCommand(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.parseCommand = parseCommand;