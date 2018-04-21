import sha256 from "sha256";

export default class Tx {
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
        return sha256(this.from + this.to + this.amount + this.timestamp);
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