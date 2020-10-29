'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _react = _interopRequireDefault(require('react'));

var _inkUi = require('@muniz/ink-ui');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2['default'])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

var path = require('path');

/**
 * 执行 命令
 */
var runCommand = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(ctx, next) {
      var argv,
        astCommands,
        render,
        env,
        _astCommands,
        pluginConfig,
        commandModuleProps,
        commandModule,
        isPluginDev,
        _require,
        pluginCommand,
        _require2,
        _pluginCommand;

      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (argv = ctx.argv), (astCommands = ctx.astCommands), (render = ctx.render), (env = ctx.env);
              _astCommands = [];

              if (env.command === 'cli') {
                _astCommands = astCommands.filter(function (item) {
                  return item.key === argv.command[0];
                });
              } else {
                pluginConfig = require(path.join(ctx.pkgPath, '/dist/index.js'))['default'](1);

                if (argv.command.length < 2) {
                  if (
                    (pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand) &&
                    !['', 'function', 'undefined'].includes(
                      pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand,
                    )
                  ) {
                    _astCommands = astCommands.filter(function (item) {
                      return item.key === pluginConfig.defaultCommand;
                    });
                  }
                } else {
                  _astCommands = astCommands.filter(function (item) {
                    return item.key === argv.command[1];
                  });
                }
              }

              if (_astCommands.length === 0) {
                render(
                  /*#__PURE__*/ _react['default'].createElement(
                    _inkUi.NotCommand,
                    (0, _extends2['default'])({}, ctx, {
                      isExistPlugin: true,
                    }),
                  ),
                );
              } else {
                commandModuleProps = _objectSpread(
                  _objectSpread({}, argv.options),
                  {},
                  {
                    input: argv.input,
                  },
                );

                if (env.command === 'cli') {
                  commandModule = require(''.concat(ctx.pkgPath, '/dist/command/').concat(_astCommands[0].path))[
                    'default'
                  ];
                  render(/*#__PURE__*/ _react['default'].createElement(commandModule, commandModuleProps));
                } else {
                  isPluginDev = false;

                  if (isPluginDev) {
                    (_require = require(path.join(ctx.pkgPath, '/dist/index.js'))),
                      (pluginCommand = _require.pluginCommand);
                    pluginCommand({
                      commandPath: _astCommands[0].path,
                      data: commandModuleProps,
                    });
                  } else {
                    (_require2 = require(''.concat(ctx.pkgName))), (_pluginCommand = _require2.pluginCommand);

                    _pluginCommand({
                      commandPath: _astCommands[0].path,
                      data: commandModuleProps,
                    });
                  }
                }
              }

              next();

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function runCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _default = runCommand;
exports['default'] = _default;
