import { createHash } from "crypto";
import { Block, putBlockInChain, getGenesisBlock, getBlockhain } from "./";
import moment from "moment";

const baseReward = 3;
const baseDifficultyDate = new Date(2014, 1, 1, 0, 0, 0, 0);

let isMining = false;

/**
 * Run a mining process
 */
export const runMiningProcess = async (wallet) => {
    if(isMining) return;
    isMining = true;
    let block = getNextBlock(null);
    while(true) {  
        //block.addTx(new Tx(block, wallet.publicSignature, walletDestination.publicSignature, 0.001, new Date().getTime(), {}));
        block.hash = mineBlock(wallet, block);
        await putBlockInChain(block);
        await broadcastBlock(block);
        logger.info("(NEW_BLOCK) {" + block.hash + ":" + block.index + "} Mined after " + block.nonce + " with " + block.txs.length + " txs");
    
        block = getNextBlock(block);
    }
};

/**
 * Get reward amount for the block
 * @param {*} difficulty 
 */
export const getReward = (difficulty) => {
    return baseReward + difficulty;
}

/**
 * Get block difficulty by the index
 */
export const getBlockDifficulty = () => {
    const diff = moment.duration(moment() - moment(baseDifficultyDate)).years();
    return 1 + diff;
}

/**
 * Find the next hash
 * @param {*} block 
 */
export const mineBlock = (wallet, block) => {
    let id = 0;
    const difficulty = getBlockDifficulty();
    while (true) {
        let nonce = id.toString(16);
        let hash = block.calculateHash(nonce);
        let offset = "";
        for(let i = 0; i < difficulty; i++) {
            offset += "0";
        }
        if (hash.slice(-difficulty) === offset) {
            block.nonce = id;
            block.minedBy = wallet.publicSignature;
            block.difficulty = difficulty;
            return hash;
        }
        else id++;
    }
};

/**
 * Get the next block in the blockchain
 * @param {*} block 
 */
export const getNextBlock = (block) => {
    if(!block) {
        const blockchain = getBlockhain();
        if(blockchain.length == 0) return getGenesisBlock();
        const lastBlock = blockchain[blockchain.length - 1];
        return new Block(lastBlock.index + 1, lastBlock.hash, [], {}, new Date().getTime());
    }
    else {
        return new Block(block.index + 1, block.hash, [], {}, new Date().getTime());
    }
};

/**
 * Reward a wallet
 * @param {*} wallet 
 */
export const rewardWallet = (wallet, block) => {
    const reward = getReward(block.difficulty);
    wallet.balance += reward;
    logger.info(`Wallet rewarded with ${reward} unit (balance: ${wallet.balance})`);
}

/**
 * Broadcast a new block on the network
 * @param {*} block 
 */
export const broadcastBlock = async (block) => {

};