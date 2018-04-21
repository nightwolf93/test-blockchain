import { createHash } from "crypto";
import sha256 from "sha256";

export default class Block {
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
        return sha256(this.index + this.previousHash + this.timestamp + nonce);
    }

    /**
     * Verify that the hash calculated is valid
     */
    verifyHash(hash) {
        return sha256(this.index + this.previousHash + this.timestamp + this.nonce) == hash;
    }

    /**
     * Add a transaction to the block
     * @param {*} tx 
     */
    addTx(tx) {
        logger.info("(TX) {" + tx.hash + "} " + tx.from + " -> (" + tx.amount + ") -> " + tx.to);
        this.txs.push(tx);
    }

    /**
     * Return a serialized format for this block
     */
    serialize() {
        return JSON.stringify({
            index: this.index, 
            previousHash: this.previousHash,
            txs: this.txs.map((e) => { return e.serialize(); }),
            metadata: this.metadata,
            timestamp: this.timestamp,
            nonce: this.nonce,
            difficulty: this.difficulty,
            hash: this.hash,
            minedBy: this.minedBy
        })
    }
}