"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPeersList = exports.savePeersList = undefined;

var _ = require("./");

/**
 * Save all peers discovered into the database
 * @param {*} peers 
 */
const savePeersList = exports.savePeersList = async peers => {
  await (0, _.getRedisDatabase)().setAsync("/peer/list", JSON.stringify(peers));
};

/**
 * Get all peers already discovered
 */
const getPeersList = exports.getPeersList = async () => {
  return JSON.parse((await (0, _.getRedisDatabase)().getAsync("/peer/list")));
};