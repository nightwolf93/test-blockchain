"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllBlock = exports.saveBlock = undefined;

var _ = require("./");

/**
 * Save the block into the blockchaindb
 * @param {*} block 
 */
const saveBlock = exports.saveBlock = async block => {
    await (0, _.getRedisDatabase)().setAsync(`/block/${block.index}/${block.hash}`, block.serialize());
};

/**
 * Get all blocks from the database
 */
const getAllBlock = exports.getAllBlock = async () => {
    const multi = (0, _.getRedisDatabase)().multi();
    const scan = await (0, _.getRedisDatabase)().keysAsync("/block/*");
    scan.map(e => multi.get(e));
    const results = await multi.execAsync();
    return results.map(e => {
        return JSON.parse(e);
    });
};