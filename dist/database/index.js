"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRedisDatabase = exports.connectToDatabase = undefined;

var _block = require("./block");

Object.keys(_block).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
            return _block[key];
        }
    });
});

var _peer = require("./peer");

Object.keys(_peer).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
            return _peer[key];
        }
    });
});

var _redis = require("redis");

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype);
_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

let redisClient = null;

/**
 * Connect to the redis database
 */
const connectToDatabase = exports.connectToDatabase = async () => {
    redisClient = _redis2.default.createClient({
        host: "localhost",
        port: 6379
    });
};

/**
 * Get the redis database
 */
const getRedisDatabase = exports.getRedisDatabase = () => {
    return redisClient;
};