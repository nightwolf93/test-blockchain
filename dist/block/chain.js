"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const blockchain = [];

/**
 * Add a block to the blockchain
 * @param {*} block 
 */
const addBlockToChain = exports.addBlockToChain = block => {
    if (block.hash == "") {
        logger.error("The block " + block.index + " is not hashed yet, we can't accept it");
        return;
    }
    undefined.blockchain[block.index] = block;
};