"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGenesisBlock = undefined;

var _ = require("./");

const getGenesisBlock = exports.getGenesisBlock = () => {
    return new _.Block(0, "GENESIS_HASH", [], { genesis: true }, new Date(2014, 1, 1, 0, 0, 0, 0).getTime());
};