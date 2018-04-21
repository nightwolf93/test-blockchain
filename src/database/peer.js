import { getRedisDatabase } from "./";

/**
 * Save all peers discovered into the database
 * @param {*} peers 
 */
export const savePeersList = async (peers) => {
    await getRedisDatabase().setAsync("/peer/list", JSON.stringify(peers));
}

/**
 * Get all peers already discovered
 */
export const getPeersList = async() => {
    return JSON.parse(await getRedisDatabase().getAsync("/peer/list"));
}