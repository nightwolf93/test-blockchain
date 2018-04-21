"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require("./http");

Object.keys(_http).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _http[key];
    }
  });
});

var _peers = require("./peers");

Object.keys(_peers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _peers[key];
    }
  });
});