"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sha = require("sha256");

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tx {
    constructor(from, to, amount, metadata) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.metadata = metadata;
        this.hash = this.getHash();
    }

    getHash() {
        return (0, _sha2.default)(this.from + this.to + this.amount);
    }

    toSerialize() {}
}
exports.default = Tx;