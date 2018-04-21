"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _nodeRsa = require("node-rsa");

var _nodeRsa2 = _interopRequireDefault(_nodeRsa);

var _md = require("md5");

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const currentWalletVersion = 1;

class Wallet {
    constructor(publicKey, privateKey, creationTimestamp, version) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.crypto = new _nodeRsa2.default(this.privateKey);
        this.creationTimestamp = creationTimestamp ? creationTimestamp : new Date().getTime();
        this.balance = 0.0;
        this.version = version;
        this.publicSignature = (0, _md2.default)(this.publicKey);
    }

    /**
     * Save the wallet to a file
     * @param {*} path 
     */
    save(path) {
        const data = {
            version: this.version,
            publicKey: this.publicKey,
            privateKey: this.privateKey,
            creationTimestamp: this.creationTimestamp,
            balance: this.balance
        };

        // Export keys to a file
        _fs2.default.writeFileSync(path + "/" + (0, _md2.default)(this.publicKey) + ".wallet", JSON.stringify(data));
    }

    /**
     * Sign a message with the wallet, require the private key
     * @param {*} message 
     */
    sign(message) {
        const buffer = this.crypto.encryptPrivate(new Buffer(message));
        return buffer;
    }

    /**
     * Calculate the balance of this wallet from the blockchain
     */
    calculateBalanceFromBlockchain() {}
}
exports.default = Wallet;