import fs from "fs";
import NodeRSA from "node-rsa";
import md5 from "md5";

const currentWalletVersion = 1;

export default class Wallet {
    constructor(publicKey, privateKey, creationTimestamp, version) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.crypto = new NodeRSA(this.privateKey);
        this.creationTimestamp = creationTimestamp ? creationTimestamp : new Date().getTime();
        this.balance = 0.0;
        this.version = version;
        this.publicSignature = md5(this.publicKey);
    }

    /**
     * Save the wallet to a file
     * @param {*} path 
     */
    export(path) {
        const data = {
            version: this.version,
            publicKey: this.publicKey,
            privateKey: this.privateKey,
            creationTimestamp: this.creationTimestamp,
            balance: this.balance
        };

        // Export keys to a file
        fs.writeFileSync(path + "/" + md5(this.publicKey) + ".wallet", JSON.stringify(data));
    }

    /**
     * Save the wallet into the database
     */
    save() {
        
    }

    /**
     * Sign a message with the wallet, require the private key
     * @param {*} message 
     */
    sign(message) {
        const buffer = this.crypto.encryptPrivate(new Buffer(message));
        return buffer;
    }

    /**
     * Calculate the balance of this wallet from the blockchain
     */
    calculateBalanceFromBlockchain() {

    }
}