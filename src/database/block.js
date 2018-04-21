import { getRedisDatabase } from "./";

/**
 * Save the block into the blockchaindb
 * @param {*} block 
 */
export const saveBlock = async (block) => {
    await getRedisDatabase().setAsync(`/block/${block.index}/${block.hash}`, block.serialize());
};

/**
 * Get all blocks from the database
 */
export const getAllBlock = async() => {
    const multi = getRedisDatabase().multi();
    const scan = await getRedisDatabase().keysAsync("/block/*");
    scan.map((e) => multi.get(e));
    const results = await multi.execAsync();
    return results.map((e) => { return JSON.parse(e) });
}