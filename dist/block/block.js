"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require("crypto");

var _sha = require("sha256");

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Block {
    constructor(index, previousHash, txs, metadata, timestamp) {
        this.index = index;
        this.previousHash = previousHash;
        this.txs = txs;
        this.metadata = metadata;
        this.timestamp = timestamp;
        this.nonce = 0;
        this.difficulty = -1;
        this.hash = "";
        this.minedBy = "";
    }

    /**
     * Calculate the hash with a nonce
     * @param {*} nonce 
     */
    calculateHash(nonce) {
        return (0, _sha2.default)(this.index + this.previousHash + this.timestamp + nonce);
    }

    /**
     * Verify that the hash calculated is valid
     */
    verifyHash() {
        return (0, _sha2.default)(this.index + this.previousHash + this.timestamp + nonce) == hash;
    }

    /**
     * Add a transaction to the block
     * @param {*} tx 
     */
    addTx(tx) {
        this.txs.push(tx);
    }
}
exports.default = Block;