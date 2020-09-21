"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config"));

var _create = _interopRequireDefault(require("./lib/create"));

var _default = {
  config: _config["default"],
  create: _create["default"],
  "default": 'create'
};
exports["default"] = _default;