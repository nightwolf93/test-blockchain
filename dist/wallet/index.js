"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wallet = undefined;

var _init = require("./init");

Object.keys(_init).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _init[key];
    }
  });
});

var _wallet = require("./wallet");

var _wallet2 = _interopRequireDefault(_wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Wallet = _wallet2.default;