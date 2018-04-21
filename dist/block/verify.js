"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyMessage = undefined;

var _nodeRsa = require("node-rsa");

var _nodeRsa2 = _interopRequireDefault(_nodeRsa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check that the message is encrypted by the correct peer
 * @param {*} msg 
 * @param {*} publicKey 
 */
const verifyMessage = exports.verifyMessage = (msg, publicKey) => {
    try {
        const crypto = new _nodeRsa2.default(publicKey);
        const decrypted = crypto.decryptPublic(msg);
        return decrypted;
    } catch (ex) {
        return null;
    }
};