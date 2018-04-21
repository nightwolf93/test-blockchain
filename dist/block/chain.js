"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadBlockchain = exports.putBlockInChain = exports.getBlockhain = undefined;

var _ = require("./");

var _database = require("../database");

let blockchain = [];

/**
 * Get the blockchain
 */
const getBlockhain = exports.getBlockhain = () => {
    return blockchain;
};

/**
 * Add a block to the blockchain
 * @param {*} block 
 */
const putBlockInChain = exports.putBlockInChain = async block => {
    if (block.hash == "") {
        logger.error("The block " + block.index + " is not hashed yet, we can't accept it");
        return;
    }
    if (blockchain[block.index]) {
        logger.error(`Block ${block.index} already exist, so the new block will be ignored`);
        return false;
    }
    blockchain[block.index] = block;

    // Get or create the wallet for tracing the transaction

    //await rewardWallet(wallet, block);
    await (0, _database.saveBlock)(block);
};

/**
 * Load the blockchain from the database
 */
const loadBlockchain = exports.loadBlockchain = async () => {
    // Load all blocks from the database
    const blocks = (await (0, _database.getAllBlock)()).map(e => {
        const b = new _.Block(e.index, e.previousHash, [], e.metadata, e.timestamp);
        b.nonce = e.nonce;
        b.difficulty = e.difficulty;
        b.hash = e.hash;
        b.minedBy = e.minedBy;
        return b;
    }).sort((a, b) => {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;
        return 0;
    });

    // Assign the blockchain
    blockchain = blocks;
    logger.debug(`Loaded ${blockchain.length} block(s) already knowed`);
};