import { savePeersList, getPeersList } from "../database";

let peers = {};

/**
 * Add know peer
 * @param {*} host 
 */
export const addPeer = (host, port) => {
    peers[host] = { host, port };
    storePeers();
    logger.debug(`Peer discovered ${host}:${port}`)
};

/**
 * Get all peers discovered
 */
export const getPeers = () => {
    return peers;
}

/**
 * Store peers for persistency discovery
 */
export const storePeers = async () => {
    await savePeersList(peers);
}

/**
 * Reload all peers already discovered
 */
export const loadPeers = async() => {
    peers = await getPeersList();
    logger.debug(`Loaded ${Object.keys(peers).length} peer(s) already discovered`);
}