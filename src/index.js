import winston from "winston"; 
import fs from "fs";
import { createWallet, importWallet } from "./wallet";
import { verifyMessage, mineBlock, getNextBlock, getGenesisBlock,
     broadcastBlock, runMiningProcess, loadBlockchain } from "./block";
import { Tx } from "./tx";
import { connectToDatabase, saveBlock } from "./database";
import { serveHttp, loadPeers } from "./p2p";
import commandLineArgs from "command-line-args";

// Initialize the logger
(async() => {
    const options = commandLineArgs([
        { name: 'port', alias: 'p', type: Number }
    ]);

    global.logger =  winston.createLogger({
        level: "debug",
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.simple()
        ),
        transports: [new winston.transports.Console()]
    });
    
    // Open the database
    await connectToDatabase();

    // Load the blockchain
    await loadBlockchain();
    
    // Serve http peer api server
    await loadPeers();
    await serveHttp(options.port);
    
    let wallet = importWallet("./wallets/849e2a00042ca342260e5d2529db43ab.wallet");

    // Start mining
    runMiningProcess(wallet);
})();
