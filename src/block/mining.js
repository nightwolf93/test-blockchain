import { createHash } from "crypto";
import { Block } from "./";
import moment from "moment";

const baseReward = 3;
const baseDifficultyDate = new Date(2015, 1, 1, 0, 0, 0, 0);

/**
 * Get reward amount for the block
 * @param {*} difficulty 
 */
export const getReward = () => {
    return baseReward + getBlockDifficulty();
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
    return new Block(block.index + 1, block.hash, [], {}, new Date().getTime());
};

/**
 * Broadcast a new block on the network
 * @param {*} block 
 */
export const broadcastBlock = (block) => {

};