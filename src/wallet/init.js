import NodeRSA from "node-rsa";
import { Wallet } from "./";
import fs from "fs";

/**
 * Create a peer of key for the wallet
 */
export const createWallet = () => {
    const key = new NodeRSA({b: 512});
    const publicDer = key.exportKey('public');
    const privateDer = key.exportKey('private');
    const wallet = new Wallet(publicDer, privateDer);
    
    return wallet;
};

/**
 * Import a wallet from a file
 * @param {*} path 
 */
export const importWallet = (path) => {
    const data = JSON.parse(fs.readFileSync(path));
    const wallet = new Wallet(data.publicKey, data.privateKey, data.creationTimestamp);
    return wallet;
}