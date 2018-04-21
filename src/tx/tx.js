import sha256 from "sha256";

export default class Tx {
    constructor(from, to, amount, metadata) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.metadata = metadata;
        this.hash = this.getHash();
    }

    getHash() {
        return sha256(this.from + this.to + this.amount);
    }

    toSerialize() {

    }
}