'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

function debounce(func, delay) {
  var timer;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      func.apply(_this, args);
    }, delay);
  };
}

var _default = debounce;
exports['default'] = _default;
