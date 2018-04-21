"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.broadcastBlock = exports.getNextBlock = exports.mineBlock = exports.getBlockDifficulty = exports.getReward = undefined;

var _crypto = require("crypto");

var _ = require("./");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseReward = 3;
const baseDifficultyDate = new Date(2015, 1, 1, 0, 0, 0, 0);

/**
 * Get reward amount for the block
 * @param {*} difficulty 
 */
const getReward = exports.getReward = () => {
    return baseReward + getBlockDifficulty();
};

/**
 * Get block difficulty by the index
 */
const getBlockDifficulty = exports.getBlockDifficulty = () => {
    const diff = _moment2.default.duration((0, _moment2.default)() - (0, _moment2.default)(baseDifficultyDate)).years();
    return 1 + diff;
};

/**
 * Find the next hash
 * @param {*} block 
 */
const mineBlock = exports.mineBlock = (wallet, block) => {
    let id = 0;
    const difficulty = getBlockDifficulty();
    while (true) {
        let nonce = id.toString(16);
        let hash = block.calculateHash(nonce);
        let offset = "";
        for (let i = 0; i < difficulty; i++) {
            offset += "0";
        }
        if (hash.slice(-difficulty) === offset) {
            block.nonce = id;
            block.minedBy = wallet.publicSignature;
            block.difficulty = difficulty;
            return hash;
        } else id++;
    }
};

/**
 * Get the next block in the blockchain
 * @param {*} block 
 */
const getNextBlock = exports.getNextBlock = block => {
    return new _.Block(block.index + 1, block.hash, [], {}, new Date().getTime());
};

/**
 * Broadcast a new block on the network
 * @param {*} block 
 */
const broadcastBlock = exports.broadcastBlock = block => {};