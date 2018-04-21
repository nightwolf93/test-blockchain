"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPeers = exports.storePeers = exports.getPeers = exports.addPeer = undefined;

var _database = require("../database");

let peers = {};

/**
 * Add know peer
 * @param {*} host 
 */
const addPeer = exports.addPeer = (host, port) => {
  peers[host] = { host, port };
  storePeers();
  logger.debug(`Peer discovered ${host}:${port}`);
};

/**
 * Get all peers discovered
 */
const getPeers = exports.getPeers = () => {
  return peers;
};

/**
 * Store peers for persistency discovery
 */
const storePeers = exports.storePeers = async () => {
  await (0, _database.savePeersList)(peers);
};

/**
 * Reload all peers already discovered
 */
const loadPeers = exports.loadPeers = async () => {
  peers = await (0, _database.getPeersList)();
  logger.debug(`Loaded ${Object.keys(peers).length} peer(s) already discovered`);
};