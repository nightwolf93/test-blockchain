"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sha = require("sha256");

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tx {
    constructor(block, from, to, amount, timestamp, metadata) {
        this.block = block;
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.timestamp = timestamp;
        this.metadata = metadata;
        this.hash = this.getHash();
    }

    /**
     * Get the hash of the transaction
     */
    getHash() {
        return (0, _sha2.default)(this.from + this.to + this.amount + this.timestamp);
    }

    /**
     * Serialize this transaction
     */
    serialize() {
        return JSON.stringify({
            blockHash: this.block.hash,
            from: this.from,
            to: this.to,
            amount: this.amount,
            timestamp: this.timestamp,
            metadata: this.metadata,
            hash: this.hash
        });
    }
}
exports.default = Tx;