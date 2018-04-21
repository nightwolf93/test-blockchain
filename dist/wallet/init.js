"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.importWallet = exports.createWallet = undefined;

var _nodeRsa = require("node-rsa");

var _nodeRsa2 = _interopRequireDefault(_nodeRsa);

var _ = require("./");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a peer of key for the wallet
 */
const createWallet = exports.createWallet = () => {
    const key = new _nodeRsa2.default({ b: 512 });
    const publicDer = key.exportKey('public');
    const privateDer = key.exportKey('private');
    const wallet = new _.Wallet(publicDer, privateDer);

    return wallet;
};

/**
 * Import a wallet from a file
 * @param {*} path 
 */
const importWallet = exports.importWallet = path => {
    const data = JSON.parse(_fs2.default.readFileSync(path));
    const wallet = new _.Wallet(data.publicKey, data.privateKey, data.creationTimestamp);
    return wallet;
};