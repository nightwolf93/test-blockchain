import NodeRSA from "node-rsa";

/**
 * Check that the message is encrypted by the correct peer
 * @param {*} msg 
 * @param {*} publicKey 
 */
export const verifyMessage = (msg, publicKey) => {
    try {
        const crypto = new NodeRSA(publicKey);
        const decrypted = crypto.decryptPublic(msg);
        return decrypted;
    }
    catch(ex) {
        return null;
    }
};