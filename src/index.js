import winston from "winston";
import fs from "fs";
import { createWallet, importWallet } from "./wallet";
import { verifyMessage, mineBlock, getNextBlock, getGenesisBlock } from "./block";

// Initialize the logger
global.logger =  winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    transports: [new winston.transports.Console()]
});

let wallet = importWallet("./wallets/849e2a00042ca342260e5d2529db43ab.wallet");
const encryptedData = wallet.sign("test");

let block = getGenesisBlock();
while(true) {
    block.hash = mineBlock(wallet, block);
    console.log(block.hash + " - mined after " + block.nonce);

    block = getNextBlock(block);
}

