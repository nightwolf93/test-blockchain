"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.broadcastBlock = exports.rewardWallet = exports.getNextBlock = exports.mineBlock = exports.getBlockDifficulty = exports.getReward = exports.runMiningProcess = undefined;

var _crypto = require("crypto");

var _ = require("./");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseReward = 3;
const baseDifficultyDate = new Date(2014, 1, 1, 0, 0, 0, 0);

let isMining = false;

/**
 * Run a mining process
 */
const runMiningProcess = exports.runMiningProcess = async wallet => {
    if (isMining) return;
    isMining = true;
    let block = getNextBlock(null);
    while (true) {
        //block.addTx(new Tx(block, wallet.publicSignature, walletDestination.publicSignature, 0.001, new Date().getTime(), {}));
        block.hash = mineBlock(wallet, block);
        await (0, _.putBlockInChain)(block);
        await broadcastBlock(block);
        logger.info("(NEW_BLOCK) {" + block.hash + ":" + block.index + "} Mined after " + block.nonce + " with " + block.txs.length + " txs");

        block = getNextBlock(block);
    }
};

/**
 * Get reward amount for the block
 * @param {*} difficulty 
 */
const getReward = exports.getReward = difficulty => {
    return baseReward + difficulty;
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
    if (!block) {
        const blockchain = (0, _.getBlockhain)();
        if (blockchain.length == 0) return (0, _.getGenesisBlock)();
        const lastBlock = blockchain[blockchain.length - 1];
        return new _.Block(lastBlock.index + 1, lastBlock.hash, [], {}, new Date().getTime());
    } else {
        return new _.Block(block.index + 1, block.hash, [], {}, new Date().getTime());
    }
};

/**
 * Reward a wallet
 * @param {*} wallet 
 */
const rewardWallet = exports.rewardWallet = (wallet, block) => {
    const reward = getReward(block.difficulty);
    wallet.balance += reward;
    logger.info(`Wallet rewarded with ${reward} unit (balance: ${wallet.balance})`);
};

/**
 * Broadcast a new block on the network
 * @param {*} block 
 */
const broadcastBlock = exports.broadcastBlock = async block => {};