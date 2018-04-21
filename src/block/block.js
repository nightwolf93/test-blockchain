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
    verifyHash() {
        return sha256(this.index + this.previousHash + this.timestamp + nonce) == hash;
    }

    /**
     * Add a transaction to the block
     * @param {*} tx 
     */
    addTx(tx) {
        this.txs.push(tx);
    }
}