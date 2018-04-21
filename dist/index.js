"use strict";

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _wallet = require("./wallet");

var _block = require("./block");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize the logger
global.logger = _winston2.default.createLogger({
    level: "debug",
    format: _winston2.default.format.combine(_winston2.default.format.colorize({ all: true }), _winston2.default.format.simple()),
    transports: [new _winston2.default.transports.Console()]
});

let wallet = (0, _wallet.importWallet)("./wallets/849e2a00042ca342260e5d2529db43ab.wallet");
const encryptedData = wallet.sign("test");

let block = (0, _block.getGenesisBlock)();
while (true) {
    block.hash = (0, _block.mineBlock)(wallet, block);
    console.log(block.hash + " - mined after " + block.nonce);

    block = (0, _block.getNextBlock)(block);
}