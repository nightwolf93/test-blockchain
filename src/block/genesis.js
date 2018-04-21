import { Block } from "./";

export const getGenesisBlock = () => {
    return new Block(0, "GENESIS_HASH", [], {genesis: true}, new Date(2014, 1, 1, 0, 0, 0, 0).getTime());
};