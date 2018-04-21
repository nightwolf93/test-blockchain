"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Block = undefined;

var _verify = require("./verify");

Object.keys(_verify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _verify[key];
    }
  });
});

var _genesis = require("./genesis");

Object.keys(_genesis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _genesis[key];
    }
  });
});

var _mining = require("./mining");

Object.keys(_mining).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mining[key];
    }
  });
});

var _block = require("./block");

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Block = _block2.default;