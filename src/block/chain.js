import { rewardWallet, Block } from "./";
import { saveBlock, getAllBlock } from "../database";

let blockchain = [];

/**
 * Get the blockchain
 */
export const getBlockhain = () => {
    return blockchain;
}

/**
 * Add a block to the blockchain
 * @param {*} block 
 */
export const putBlockInChain = async (block) => {
    if(block.hash == "") {
        logger.error("The block " + block.index + " is not hashed yet, we can't accept it")
        return;
    }
    if(blockchain[block.index]) {
        logger.error(`Block ${block.index} already exist, so the new block will be ignored`);
        return false;
    }
    blockchain[block.index] = block;

    // Get or create the wallet for tracing the transaction

    //await rewardWallet(wallet, block);
    await saveBlock(block);
}

/**
 * Load the blockchain from the database
 */
export const loadBlockchain = async() => {
    // Load all blocks from the database
    const blocks = (await getAllBlock()).map
        ((e) => { 
            const b = new Block(e.index, e.previousHash, [], e.metadata, e.timestamp);
            b.nonce = e.nonce;
            b.difficulty = e.difficulty;
            b.hash = e.hash;
            b.minedBy = e.minedBy;
            return b; 
        }).sort((a, b) => {
            if (a.index < b.index)
                return -1;
            if (a.index > b.index)
                return 1;
            return 0;
        });

    // Assign the blockchain
    blockchain = blocks;
    logger.debug(`Loaded ${blockchain.length} block(s) already knowed`);
}